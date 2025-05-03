import type { CollectionConfig } from 'payload'

export const Transactions: CollectionConfig = {
  slug: 'transactions',
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
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'income', value: 'income' },
        { label: 'expense', value: 'expense' },
        { label: 'transfer', value: 'transfer' },
      ],
      defaultValue: 'expense',
    },
    { name: 'date', type: 'date', required: true },
    { name: 'paymentMethod', type: 'relationship', relationTo: 'paymentMethods' },
    { name: 'account', type: 'relationship', relationTo: 'accounts' },
    { name: 'amount', type: 'number', required: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'budgetCategories',
      required: true,
    },
  ],
}
