import Link from "next/link"
import { PER_PAGE } from "../libs/pagination"

type Props = {
  totalCount: number
  currentPage: number
  url: string
}

export const Pagination: React.VFC<Props> = ({
  totalCount,
  currentPage,
  url,
}) => {
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const currentPageStyle = (i: number) => {
    return i === currentPage ? "text-white bg-cyan-700" : "text-cyan-700"
  }

  return totalCount > 0 ? (
    <div className='flex justify-center'>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <Link href={`${url}/${number}`} key={index}>
          <a
            className={`px-4 py-2 m-2 rounded-md border border-cyan-700 ${currentPageStyle(
              number
            )}`}
          >
            {number}
          </a>
        </Link>
      ))}
    </div>
  ) : (
    <></>
  )
}
