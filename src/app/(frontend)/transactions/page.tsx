import { DataTable } from '@/components/data-table'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

async function page() {
  const payload = await getPayload({ config })
  const data = await payload.find({
    depth: 2,
    collection: 'transactions',
  })
  console.log(data.docs)

  return (
    <div>
      {' '}
      <DataTable data={data.docs} />
    </div>
  )
}

export default page
