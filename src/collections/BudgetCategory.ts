import type { CollectionConfig } from 'payload'

export const BudgetCategory: CollectionConfig = {
  slug: 'budgetCategory',
  admin: { useAsTitle: 'name' },
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
      name: 'color',
      type: 'text',
      required: true,
    },
    { name: 'iconUrl', type: 'upload', relationTo: 'media' },
  ],
}
