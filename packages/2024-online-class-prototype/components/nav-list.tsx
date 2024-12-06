'use client'

import { usePathname } from 'next/navigation'
import type { PropsWithChildren, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { selectIsLogined } from '@/redux/features/user/selector'
import { useLocalStorage } from 'usehooks-ts'
import { ORIGIN_STORAGE_KEY } from '@/constants/config'

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
    target: '#lecturer-intro',
  },
  {
    title: '課程預告',
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

const WithLogin = ({ children }: PropsWithChildren) => {
  const isLogined = useAppSelector(selectIsLogined)
  const [, setOrignPath, removeOriginPath] = useLocalStorage(
    ORIGIN_STORAGE_KEY,
    ''
  )

  const signInHandler = () => {
    setOrignPath(window.location.pathname)
  }

  const signOutHandler = async () => {
    removeOriginPath()
    const { auth, signOut } = await import('@/utils/firebase/auth')
    signOut(auth)
  }

  return (
    <>
      <li className="inline-block shrink-0 md:hidden">
        {isLogined ? (
          <button
            className="px-[26px] font-normal text-[#727272] underline underline-offset-4"
            onClick={signOutHandler}
          >
            登出
          </button>
        ) : (
          <a
            href="/login"
            className="inline-block bg-main px-[26px] py-px text-white"
            onClick={signInHandler}
          >
            登入
          </a>
        )}
      </li>
      {children}
      <li className="hidden text-black md:inline-block">
        {isLogined ? (
          <button
            className="rounded bg-[#E7E7E7] px-[15px] lg:px-3"
            onClick={signOutHandler}
          >
            登出
          </button>
        ) : (
          <a
            href="/login"
            className="inline-block rounded border border-solid border-black px-[15px] lg:px-3"
            onClick={signInHandler}
          >
            登入
          </a>
        )}
      </li>
    </>
  )
}

export default function NavList() {
  const pathname = usePathname()
  const [hash, setHash] = useState<HashTag>('#')

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
          <WithLogin>
            {CourseNavItems.map((item) => (
              <li
                key={item.target}
                className={`inline-block px-1 [&:nth-last-child(2)]:hidden md:[&:nth-last-child(2)]:inline-block ${
                  hash === item.target
                    ? 'border-b-2 border-solid border-main font-bold text-main'
                    : 'text-[#727272]'
                } md:rounded-[4px] md:border-none md:bg-main md:px-[16.5px] md:py-[0.5px] md:text-white lg:px-[10px]`}
              >
                <a href={item.target}>{item.title}</a>
              </li>
            ))}
          </WithLogin>
        </ul>
      )
      break
    case /\/login/.test(pathname):
    case /\/email-login/.test(pathname):
      listJsx = null
      break
    case /\//.test(pathname):
      listJsx = (
        <ul className="nav-list gap-x-[10px] md:gap-x-[34px] lg:gap-x-2">
          <WithLogin>
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
          </WithLogin>
        </ul>
      )
      break
    default:
      listJsx = null
      break
  }

  return (
    <nav className="order-3 flex w-screen overflow-x-auto overflow-y-hidden py-1 md:py-2 lg:order-2 lg:ml-auto lg:w-auto lg:py-0">
      {listJsx}
    </nav>
  )
}
