import { Icon } from '@iconify/react'
import { IColor, getColor } from '../util/color'
import { random } from '../util/random'
import { COMPANIES } from '../util/constants'
import { ProgressBar } from './ProgressBar'

interface IExpensesTableProps {
  color: IColor
}

export const ExpensesTable = ({ color }: IExpensesTableProps) => {
  const currentMonthName = new Date().toLocaleString('default', {
    month: 'long'
  })

  const expenses = []
  for (let e = 0; e < 31; e++) {
    const valueCents = random(99).toString().padStart(2, '0')
    const value = `$${random(999)}.${valueCents}`
    const timeHours = random(23).toString().padStart(2, '0')
    const timeMinutes = random(59).toString().padStart(2, '0')
    const time = `${timeHours}:${timeMinutes}`
    const company = COMPANIES[random(COMPANIES.length - 1)]
    const budget = random(100)

    expenses.push({
      company,
      time,
      value,
      budget
    })
  }

  return (
    <div className='rounded-xl border overflow-auto h-full sm:max-h-[40vh]'>
      <div className='bg-white rounded-t-xl px-6 py-4 flex flex-row items-center justify-between font-bold text-lg sticky top-0'>
        <div className='flex flex-row items-center gap-2'>
          {currentMonthName}
          <div
            className='rounded-xl text-xs px-2 py-0.5 font-medium'
            style={{
              backgroundColor: color.light,
              color: color.dark
            }}
          >
            31 payments
          </div>
        </div>
        <div
          className='w-10 h-10 rounded-xl inline-flex items-center justify-center text-2xl flex-shrink-0 cursor-pointer'
          style={{ backgroundColor: color.light, color: color.dark }}
        >
          <Icon icon='ic:round-file-download' />
        </div>
      </div>
      <table className='w-full overflow-auto max-h-[720px]'>
        <thead>
          <tr className='bg-gray-50 sticky top-[72px]'>
            <th className='text-left px-6 py-3 text-slate-600 font-semibold text-xs'>
              Payment
            </th>
            <th className='px-6 py-3 text-slate-600 font-semibold text-xs hidden lg:table-cell'>
              Amount
            </th>
            <th className='px-6 py-3 text-slate-600 font-semibold text-xs hidden lg:table-cell'>
              Category
            </th>
            <th className='px-6 py-3 text-slate-600 font-semibold text-xs'>
              Budget
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const categoryColor = getColor(expense.company.category.color)

            return (
              <tr key={index}>
                <td className='px-6 py-4'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 w-10 h-10'>
                      <img
                        className='w-full h-full rounded-full'
                        src={expense.company.logo}
                        alt={expense.company.name}
                      />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-slate-900'>
                        {expense.company.name}
                      </div>
                      <div className='text-sm text-slate-500'>
                        {expense.time}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 text-center hidden lg:table-cell'>
                  <div className='text-sm text-slate-900'>{expense.value}</div>
                </td>
                <td className='px-6 py-4 text-center hidden lg:table-cell'>
                  <div
                    className='rounded-xl text-xs px-2 py-0.5 font-medium inline-block'
                    style={{
                      backgroundColor: categoryColor.light,
                      color: categoryColor.dark
                    }}
                  >
                    {expense.company.category.name}
                  </div>
                </td>
                <td className='px-6 py-4 text-center'>
                  <ProgressBar value={expense.budget} color={color} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
