'use client'
import React, { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
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
interface Props {
  trigger: ReactNode
}

const TransactionForm = ({ trigger }: Props) => {
  const [date, setDate] = useState<Date>(dayjs().toDate())
  const [time, setTime] = useState<string>(dayjs().format('HH:mm'))
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const formSchema = z.object({ title: z.string() })
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
            <Select>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionForm
