import Link from "next/link"

type Props = {
  tag: Tag
  className: string
}

export const Tag: React.VFC<Props> = ({ tag, className }) => {
  return (
    <>
      <Link href={`/tag/${tag.id}/page/${1}`} passHref>
        <div className={`flex self-center hover:cursor-pointer hover:opacity-50 ${className}`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 xl:h-5 xl:w-5 self-center mr-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
            />
          </svg>
          <div className='text-sm xl:text-base'>{tag.name}</div>
        </div>
      </Link>
    </>
  )
}
