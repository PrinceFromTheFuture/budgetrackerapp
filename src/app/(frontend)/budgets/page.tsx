import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import dayjs from 'dayjs'
import { payload } from 'devHelpers'
import React from 'react'

async function page() {
  const budgets = await payload.find({ collection: 'budgets' })
  console.log(budgets.docs[0].categories[0].amount)
  return (
    <div>
      {budgets.docs.map((budget) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>{budget.name}</CardTitle>
              <CardDescription>
                {dayjs(budget.startDate).format('DD.MM YYYY')} -
                {dayjs(budget.endDate).format('DD.MM YYYY')}
              </CardDescription>
              <CardContent></CardContent>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}

export default page
