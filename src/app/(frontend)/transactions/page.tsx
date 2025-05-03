import { DataTable } from '@/components/data-table'
import React from 'react'
import { getPayload } from 'payload'
import { payload } from 'devHelpers'

async function page() {
  const data = await payload.find({
    depth: 2,
    collection: 'transactions',
  })

  return (
    <div>
      {' '}
      <DataTable data={data.docs} />
    </div>
  )
}

export default page
