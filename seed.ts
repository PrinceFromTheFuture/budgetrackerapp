interface Category {
  name: string
  color: string
  icon: string
}

interface Budget {
  startDate: string
  endDate: string
  categories: ({ amount: number } & Category)[]
}

const budget: Budget = { categories: [{}], endDate: '', startDate: '' }
