import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import MenuIcon from '~/public/icon/menu-icon.svg'
import { zIndex, breakpoint } from '~/styles/theme'
import MediaIcons from '~/components/sidebar/media-icons'
import { staticFileDestination } from '~/config'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import Link from 'next/link'

const SideMenuWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(11, 25, 48, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  visibility: ${(prop) => (prop.show ? 'visible' : 'hidden')};
  transform: ${(prop) => (prop.show ? 'translateY(0px)' : 'translateX(375px)')};
  transition: 0.4s cubic-bezier(0.8, 0, 0.2, 1);
  z-index: ${zIndex.top};

  @media (min-width: 375px) {
    transform: ${(prop) =>
      prop.show ? 'translateY(0px)' : 'translateX(767px)'};
  }

  ${breakpoint.md} {
    display: none;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 88px 0px 80px;
  gap: 25px;
`

const MenuList = styled.li`
  color: rgba(182, 242, 255, 1);
  font-family: 'Noto Serif TC', serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: 1px;
  text-align: center;
  list-style: none;

  &:hover {
    color: #ffffff;
    text-decoration-line: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 1px;
    transition: all 0.2s ease;
  }
`

const ToggleButton = styled.div<{ show: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: fixed;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: calc(${zIndex.top} + 10);

  svg {
    max-width: 28px;
    transform: ${(prop) => (prop.show ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition-duration: 0.3s;
  }

  ${breakpoint.md} {
    display: none;
  }
`

export default function SideMenu() {
  const [show, setShow] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [href, setHref] = useState('')

  useEffect(() => {
    setHref(() => window.location.href)
  }, [])

  const sideMenuRef = useRef(null)

  useEffect(() => {
    if (sideMenuRef && sideMenuRef.current) {
      const lightBox = sideMenuRef.current
      if (show) {
        disableBodyScroll(lightBox)
      } else {
        enableBodyScroll(lightBox)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [show])

  const navLists = [
    { title: '論壇簡介', href: `${staticFileDestination}#introduction` },
    { title: '活動影音', href: `${staticFileDestination}#video` },
    { title: '與會陣容', href: `${staticFileDestination}#speakers` },
    { title: '論壇議程', href: `${staticFileDestination}#schedule` },
    { title: '相關報導', href: `${staticFileDestination}#related-post` },
    { title: '報名資訊', href: `${staticFileDestination}#registration` },
    { title: '共同推動', href: `${staticFileDestination}#partners` },
  ]

  const contentLists = navLists.map((list, index) => {
    return (
      <Link
        key={index}
        href={list.href}
        scroll={false}
        onClick={() => {
          setShow(!show)
        }}
      >
        <MenuList>{list.title}</MenuList>
      </Link>
    )
  })

  // TODO: 展開時禁止下方滑動
  return (
    <>
      <ToggleButton
        onClick={() => {
          setShow(!show)
        }}
        show={show}
      >
        <MenuIcon />
      </ToggleButton>

      <SideMenuWrapper
        show={show}
        onClick={() => {
          setShow(!show)
        }}
      >
        <ContentWrapper ref={sideMenuRef}>{contentLists}</ContentWrapper>
        <MediaIcons />
      </SideMenuWrapper>
    </>
  )
}
