import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { z } from 'zod'
import config from '@payload-config'
import dayjs from 'dayjs'

export const transactionSchema = z.object({
  name: z.string(),
  timestamps: z.string(),
  amount: z.number(),
  category: z.string(),
  account: z.string(),
  paymentMethod: z.string(),
})
export async function POST(request: NextRequest) {
  const body = await request.json()
  log(body)
  const { account, amount, category, paymentMethod, timestamps, name } =
    transactionSchema.parse(body)

  const payload = await getPayload({ config })
  payload.create({
    collection: 'transactions',
    data: {
      amount,
      category,
      date: dayjs().toString(),
      description: 'fsdf',
      name,
      account,
      paymentMethod,
      type: 'expense',
    },
  })

  return new NextResponse('POST request received', { status: 200 })
}
