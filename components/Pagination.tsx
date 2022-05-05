import Router from "next/router"
import Link from "next/link"

type Props = {
  totalCount: number
}

export const Pagination: React.VFC<Props> = ({ totalCount }) => {
  const PER_PAGE = 1

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <div className='flex justify-center'>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <Link href={`/blog/page/${number}`} key={index}>
          <a className='px-4 py-2 m-2 rounded-md border border-cyan-700 text-cyan-700'>{number}</a>
        </Link>
      ))}
    </div>
  )
}
