import type { CollectionConfig } from 'payload'

export const BudgetItem: CollectionConfig = {
  slug: 'budgetItem',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'color',
      type: 'text',
      required: true,
    },
  ],
  
}
