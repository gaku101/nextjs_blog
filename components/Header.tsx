import Link from "next/link"

export const Header: React.VFC = () => {
  return (
    <>
      <div className='py-12 px-8 md:px-24 lg:px-30 xl:px-36'>
        <Link href='/' passHref>
          <a href='/'>
            <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold'>
              Next.js Blog.
            </h1>
          </a>
        </Link>
      </div>
    </>
  )
}
