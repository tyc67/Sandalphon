import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useClickOutside from '~/hooks/useClickOutside'

// @ts-ignore
import MirrorMediaLogo from '~/public/wide-article/mirror-media-logo.svg'
// @ts-ignore
import ReadrLogo from '~/public/wide-article/readr-logo.svg'
import HamburgerButton from '~/components/wide-article/shared/hamburger-button'
import CloseButton from '~/components/wide-article/shared/close-button'
import NavSubtitleNavigator from '~/components/wide-article/shared/nav-subtitle-navigator'
import ButtonSocialNetworkShare from '~/components/wide-article/shared/button-social-network-share'
import ButtonCopyLink from '~/components/wide-article/shared/button-copy-link'
import { READR_URL, SITE_URL } from '~/config'

/**
 * @typedef {import('~/type/theme').Theme} Theme
 */

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: ${
    /**
     * @param {Object} props
     * @param {Theme} [props.theme]
     */
    ({ theme }) => theme.color.brandColor.white
  };
`

const HeaderWrapper = styled.header`
  position: fixed;
  pointer-events: none;
  z-index: 499;
  width: 100%;
  padding: 12px 12px 0 12px;
  margin: 0 auto;
  top: 0;
  left: 0;
  background-color: transparent;
  display: flex;
  justify-content: space-between;

  > * {
    pointer-events: initial;
  }
`
const SocialMedia = styled.li`
  display: flex;
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  a {
    margin-right: 10px;
  }
`
const SideBarModal = styled.section`
  position: fixed;
  top: 0;

  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 14px;
  line-height: 1.5;
  z-index: 539;
  overflow-y: auto;
  right: 0;
  ${
    /**
     * @param {{shouldShowSidebar: Boolean}} props
     */
    ({ shouldShowSidebar }) =>
      shouldShowSidebar
        ? 'transform: translateX(0%)'
        : 'transform: translateX(100%)'
  };
  overflow-x: hidden;
  transition: transform 0.5s ease-in-out;

  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`

const SideBar = styled.section`
  width: 100%;
  height: 100%;
  background-color: #3e3e3e;
  margin-left: auto;
  ${({ theme }) => theme.breakpoint.md} {
    width: 320px;
  }
`

export default function Header({ h2AndH3Block = [] }) {
  const sideBarRef = useRef(null)
  const [shouldOpenSideBar, setShouldOpenSideBar] = useState(false)
  useClickOutside(sideBarRef, () => {
    setShouldOpenSideBar(false)
  })
  // While the sidebar is open, disable body scroll.
  useEffect(() => {
    const sideBar = sideBarRef.current
    if (!sideBar) {
      return
    }
    if (shouldOpenSideBar) {
      disableBodyScroll(sideBar)
      return () => enableBodyScroll(sideBar)
    } else {
      return undefined
    }
  }, [shouldOpenSideBar])

  return (
    <HeaderWrapper>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <LogoWrapper>
        <a href={SITE_URL}>
          <MirrorMediaLogo />
        </a>
        x
        <a href={READR_URL}>
          <ReadrLogo />
        </a>
      </LogoWrapper>
      <HamburgerButton
        color="white"
        handleOnClick={() => setShouldOpenSideBar((val) => !val)}
      />
      <SideBarModal shouldShowSidebar={shouldOpenSideBar}>
        <SideBar ref={sideBarRef}>
          <CloseButton
            handleOnClick={() => setShouldOpenSideBar((val) => !val)}
          />
          <NavSubtitleNavigator
            h2AndH3Block={h2AndH3Block}
            componentStyle="side-bar"
            handleCloseSideBar={() => setShouldOpenSideBar(false)}
          />
          <SocialMedia>
            <ButtonSocialNetworkShare type="facebook" width={28} height={28} />
            <ButtonSocialNetworkShare type="line" width={28} height={28} />
            <ButtonCopyLink width={28} height={28} />
          </SocialMedia>
        </SideBar>
      </SideBarModal>
    </HeaderWrapper>
  )
}
