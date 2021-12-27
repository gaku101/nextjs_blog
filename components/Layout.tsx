import { Header } from "./Header"

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='py-4 sm:py-12 px-8 md:px-24 lg:px-36'>{children}</div>
    </>
  )
}
