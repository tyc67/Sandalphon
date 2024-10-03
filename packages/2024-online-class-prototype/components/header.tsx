import NextLink from 'next/link'
import NextImage from 'next/image'
import LogoMobile from '@/public/images/logo-mobile.png'
import LogoDesktop from '@/public/images/logo-desktop.png'
import NavList from './nav-list'
import SocialShare from './social-share'

export default function Header() {
  return (
    <header className="z-header fixed top-0 flex max-w-screen-lg flex-col items-center bg-white md:w-screen md:flex-row md:flex-wrap md:shadow-gap lg:shadow-gap-lg">
      <NextLink
        href="/"
        className="flex w-screen justify-center shadow-gap md:ml-6 md:mt-2 md:w-auto md:shadow-none lg:my-5 lg:ml-3"
      >
        <NextImage
          src={LogoMobile}
          width={200}
          height={50}
          alt="logo"
          className="lg:hidden"
        />
        <NextImage
          src={LogoDesktop}
          width={320}
          height={80}
          alt="logo"
          className="hidden lg:flex"
        />
      </NextLink>
      <NavList />
      <SocialShare />
    </header>
  )
}
