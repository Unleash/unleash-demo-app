import { IColor } from '../util/color'
import { random } from '../util/random'

interface IExpensesChartProps {
  color: IColor
}

export const ExpensesChart = ({ color }: IExpensesChartProps) => {
  const currentMonth = new Date().getMonth()

  const months = []
  for (let m = 0; m < 12; m++) {
    const month = new Date(2023, m, 1).toLocaleString('default', {
      month: 'short'
    })
    const value = random(72, 10)

    months.push({
      label: month,
      value
    })
  }

  return (
    <div
      className='rounded-xl border pb-3 px-6 flex flex-row items-end gap-2 animate-fadeIn h-24 min-h-[96px] sm:h-32 sm:min-h-[128px]'
      style={{ borderColor: color.dark }}
    >
      {months.map((month, index) => {
        const backgroundColor =
          index === currentMonth
            ? color.dark
            : index < currentMonth
            ? color.main
            : color.light
        return (
          <div className='flex-1 text-center' key={index}>
            <div
              className='rounded-md animate-expand'
              style={{ height: `${month.value}px`, backgroundColor }}
            ></div>
            <span className='hidden sm:block text-xs mt-1 text-slate-600'>
              {month.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
