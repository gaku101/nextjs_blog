import Link from "next/link"

export const Header: React.VFC = () => {
  return (
    <>
      <div className='py-12'>
        <Link href='/' passHref>
          <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-cyan-800'>
            gaku&apos;s blog
          </h1>
        </Link>
      </div>
    </>
  )
}
