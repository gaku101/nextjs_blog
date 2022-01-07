import { Header } from "./Header"

type Props = {
  children: React.ReactNode
}
export const Layout: React.VFC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='px-8 md:px-24 lg:px-30 xl:px-36'>{children}</div>
    </>
  )
}
