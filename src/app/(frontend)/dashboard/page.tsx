import React from 'react'
import axios from 'axios'
import { getPayload } from 'payload'
import config from '@payload-config'
async function page() {





  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'budgetCategory',
  })

  res.docs.forEach((item) => {
    console.log(item.name)
  })




  
  return <div>page</div>
}

export default page
