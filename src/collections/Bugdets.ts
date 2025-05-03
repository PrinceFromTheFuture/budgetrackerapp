import { relationship } from 'node_modules/payload/dist/fields/validations'
import type { CollectionConfig } from 'payload'

export const Bugdets: CollectionConfig = {
  slug: 'budgets',
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
        { name: 'amount', type: 'number' ,required:true},
        {
          name: 'type',
          type: 'select',
          
          options: [
            { label: 'income', value: 'income' },
            { label: 'expense', value: 'expense' },
          ],
          required:true
        },
        { type: 'relationship', name: 'category', relationTo: 'budgetCategories',required:true },
      ],
    },
  ],
}
