import React from 'react'
import axios from 'axios'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { SectionCards } from '@/components/section-cards'
import { DataTable } from '@/components/data-table'
import data from './data.json'

async function page() {
  return (
    <div>
      {' '}
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  )
}

export default page
