'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { CalendarIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import axios from 'axios'
import { Collection } from 'payload'
import { Account, BudgetCategory, PaymentMethod } from '@/payload-types'
import { transactionSchema } from '@/app/api/transactions/route'
interface Props {
  trigger: ReactNode
}

const TransactionForm = ({ trigger }: Props) => {
  const [date, setDate] = useState<Date>(dayjs().toDate())
  const [time, setTime] = useState<string>(dayjs().format('HH:mm'))
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [selectFileds, setSelectFields] = useState<[Account[], PaymentMethod[], BudgetCategory[]]>([
    [],
    [],
    [],
  ])

  const formSchema = z.object({ title: z.string() })
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })

  // 2. Define a submit handler.

  useEffect(() => {
    const getDate = async () => {
      const accounts: { data: { docs: Account[] } } = await axios.get('/api/accounts', {})
      const paymentMethods: { data: { docs: PaymentMethod[] } } = await axios.get(
        '/api/paymentMethods',
        {},
      )
      const budgetCategories: { data: { docs: BudgetCategory[] } } = await axios.get(
        '/api/budgetCategories',
        {},
      )

      setSelectFields([accounts.data.docs, paymentMethods.data.docs, budgetCategories.data.docs])
    }
    getDate()
  }, [])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post('/api/transactions', {
      name: values.title,
      timestamps: dayjs(date).format('YYYY-MM-DD') + ' ' + time,
      amount: 0,
      category: selectFileds[2][0].id,
      account: selectFileds[0][0].id,
      paymentMethod: selectFileds[1][0].id,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="">
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" flex justify-between gap-2 items-start">
              <Popover open={isCalendarOpen}>
                <PopoverTrigger className=" text-black flex-col flex w-3/4" asChild>
                  <div>
                    <FormLabel className="mb-2">Username</FormLabel>

                    <Button
                      onClick={() => {
                        setIsCalendarOpen(true)
                      }}
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? dayjs(date).format('ddd, MMM D YYYY') : <span>Pick a date</span>}
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      if (date) {
                        setIsCalendarOpen(false)
                        setDate(date)
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-2/4">
                    <FormLabel className="mb-0">Username</FormLabel>
                    <FormControl>
                      <label htmlFor="test1">
                        <Input
                          onChange={(event) => {
                            const time = event.target.value
                            if (time.length > 5) {
                              return
                            }
                            setTime(time)
                          }}
                          className="  text-black  "
                          value={time}
                        />
                      </label>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {selectFileds.map((selectField, index) => {

              return (
                <Select key={index}>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectField.map((field) => {
                  

                      return (
                        <SelectItem key={field.id} value={field.id}>
                          {field.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )
            })}
            <DialogClose asChild>
              <Button type="submit" className=" cursor-pointer">
                Submit
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionForm
