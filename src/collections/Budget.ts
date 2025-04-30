import { relationship } from 'node_modules/payload/dist/fields/validations'
import type { CollectionConfig } from 'payload'

export const Bugdet: CollectionConfig = {
  slug: 'budget',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },

    {
      type: 'array',
      name: 'categories',
      fields: [
        { name: 'amountToSpend', type: 'number' },
        { type: 'relationship', name: 'category', relationTo: 'budgetCategory', },
      ],
    },
  ],
}
