interface ICategory {
  name: string
  color: string
}

interface ICompany {
  name: string
  logo: string
  category: ICategory
}

export const COMPANIES: ICompany[] = [
  {
    name: 'Grocery Max',
    logo: '/companies/logo1.png',
    category: {
      name: 'Grocery',
      color: '#027A48'
    }
  },
  {
    name: 'Speed Up Metro',
    logo: '/companies/logo2.png',
    category: {
      name: 'Transportation',
      color: '#344054'
    }
  },
  {
    name: 'Happy House',
    logo: '/companies/logo3.png',
    category: {
      name: 'Housing',
      color: '#026AA2'
    }
  },
  {
    name: 'Sunset & Sunrise',
    logo: '/companies/logo4.png',
    category: {
      name: 'Entertainment',
      color: '#C01048'
    }
  },
  {
    name: 'Pizza by Layers',
    logo: '/companies/logo5.png',
    category: {
      name: 'Food & Drinks',
      color: '#C4320A'
    }
  },
  {
    name: 'Qeducation',
    logo: '/companies/logo6.png',
    category: {
      name: 'Uncategorized',
      color: '#344054'
    }
  },
  {
    name: 'FashionMania',
    logo: '/companies/logo7.png',
    category: {
      name: 'Shopping',
      color: '#C11574'
    }
  }
]
