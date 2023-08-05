// import Header from './header'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: DefaultLayoutProps) {
  return (
    <>
      {/* <Header /> */}
      {children}
    </>
  )
}
