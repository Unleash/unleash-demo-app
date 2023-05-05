import { IColor } from '../util/color'

interface IProgressBarProps {
  value: number
  color: IColor
}

export const ProgressBar = ({ value, color }: IProgressBarProps) => (
  <div className='h-2 flex rounded' style={{ backgroundColor: color.light }}>
    <div
      className='rounded animate-expandHorizontal'
      style={{ width: `${value}%`, backgroundColor: color.dark }}
    ></div>
  </div>
)
