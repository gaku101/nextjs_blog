import { parseISO, format } from "date-fns"

type Props = {
  dateString: string
  className?: string
}

export const Date: React.VFC<Props> = ({ dateString, className }) => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      <div className={`${className} flex text-gray-600`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 xl:h-5 xl:w-5 self-center'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <p className='text-sm xl:text-lg'>{format(date, "yyyy/MM/dd")}</p>
      </div>
    </time>
  )
}
