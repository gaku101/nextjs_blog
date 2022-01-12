import Link from "next/link"
import { Header } from "./Header"
import { SideNav } from "./SideNav"

type Props = {
  children: React.ReactNode
  tags: Tag[]
  searchedBy?: string
}
export const Layout: React.VFC<Props> = ({ children, tags, searchedBy }) => {
  return (
    <div className='pb-4 px-8 md:px-10 lg:px-30 xl:px-40'>
      <Header />
      {searchedBy && (
        <div className='text-2xl mb-4'>
          <Link href='/' passHref>
            <span className='text-cyan-700'>記事一覧</span>
          </Link>
          &nbsp;&gt;&nbsp;{searchedBy}&nbsp;
        </div>
      )}

      <div className='grid grid-cols-7 gap-4'>
        <div className='col-span-7 lg:col-span-5'>{children}</div>
        <SideNav className='hidden lg:block lg:col-span-2' tags={tags} />
      </div>
    </div>
  )
}
