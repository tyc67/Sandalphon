'use client'
import NextImage from 'next/image'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import IconProfileBlue from '@/public/images/profile-blue.png'
import IconProfileBlack from '@/public/images/profile-black.png'
import { useAppSelector } from '@/redux/hooks'
import { selectIsLogined } from '@/redux/features/user/selector'
import { getAuth, signOut } from 'firebase/auth'
import { firebaseApp } from '@/utils/firebase'

type HashTag = `#${string}`

type NavItem = {
  title: string
  target: HashTag
}

const HomeNavItems: NavItem[] = [
  {
    title: '課程總覽',
    target: '#course-list',
  },
  {
    title: '訂購流程',
    target: '#payment-flow',
  },
  {
    title: '常見問題',
    target: '#qa-list',
  },
  {
    title: '訂購須知',
    target: '#order-reminder',
  },
]

const CourseNavItems: NavItem[] = [
  {
    title: '課程介紹',
    target: '#course-intro',
  },
  {
    title: '講師介紹',
    target: '#lecture-intro',
  },
  {
    title: '課前導讀',
    target: '#preview',
  },
  {
    title: '課程大綱',
    target: '#outline',
  },
  {
    title: '開始上課',
    target: '#video-list',
  },
]

export default function NavList() {
  const pathname = usePathname()
  const [hash, setHash] = useState<HashTag>('#')
  const isLogined = useAppSelector(selectIsLogined)

  const onHashChange = (e: HashChangeEvent) => {
    const newUrl = e.newURL

    setHash(`#${newUrl.split('#')[1]}`)
  }

  useEffect(() => {
    setHash(`#${window.location.href.split('#')[1]}`)

    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  let listJsx: ReactNode

  switch (true) {
    case /\/course\//.test(pathname):
      listJsx = (
        <ul className="nav-list gap-x-[10px] md:gap-x-5 lg:gap-x-2">
          {!isLogined && (
            <li className="inline-block bg-main md:hidden">
              <a
                href="/login"
                className="inline-block px-[26px] py-px text-white"
              >
                登入
              </a>
            </li>
          )}
          {CourseNavItems.map((item) => (
            <li
              key={item.target}
              className={`inline-block px-1 ${
                hash === item.target
                  ? 'border-b-2 border-solid border-main font-bold text-main'
                  : 'text-[#727272]'
              } md:rounded-[4px] md:border-none md:bg-main md:px-[16.5px] md:py-[0.5px] md:text-white lg:px-[10px]`}
            >
              <a href={item.target}>{item.title}</a>
            </li>
          ))}
          <li className="hidden md:inline-block">
            {isLogined ? (
              <span
                className="cursor-pointer"
                onClick={() => {
                  signOut(getAuth(firebaseApp))
                }}
              >
                <NextImage
                  className="hidden md:flex lg:hidden"
                  src={IconProfileBlue}
                  width={32}
                  height={32}
                  alt="profile"
                />
                <NextImage
                  className="hidden lg:flex"
                  src={IconProfileBlack}
                  width={32}
                  height={32}
                  alt="profile"
                />
              </span>
            ) : (
              <a
                href="/login"
                className="inline-block rounded-[4px] border border-solid border-black px-[15px] text-black lg:px-3"
              >
                登入
              </a>
            )}
          </li>
        </ul>
      )
      break
    case /\/login/.test(pathname):
      listJsx = null
      break
    case /\//.test(pathname):
      listJsx = (
        <ul className="nav-list gap-x-[10px] md:gap-x-[34px] lg:gap-x-2">
          {HomeNavItems.map((item) => (
            <li
              key={item.target}
              className={`inline-block px-1 ${
                hash === item.target
                  ? 'border-b-2 border-solid border-main font-bold text-main'
                  : 'text-[#727272]'
              } md:rounded-[4px] md:border-none md:bg-main md:px-[16.5px] md:py-[0.5px] md:text-white lg:px-[10px]`}
            >
              <a href={item.target}>{item.title}</a>
            </li>
          ))}
        </ul>
      )
      break
    default:
      listJsx = null
      break
  }

  return (
    <nav className="order-3 flex w-screen overflow-x-auto py-1 md:py-0 lg:order-2 lg:ml-auto lg:w-auto">
      {listJsx}
    </nav>
  )
}
