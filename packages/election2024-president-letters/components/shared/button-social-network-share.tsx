//REMINDER: DO NOT REMOVE className which has prefix `GTM-`, since it is used for collecting data of Google Analytics event.

// import Link from 'next/link'
import useSharedUrl from '../../hooks/use-shared-url'
const FACEBOOK_SHARED_URL = 'https://www.facebook.com/share.php?u='
const LINE_SHARED_URL = 'https://social-plugins.line.me/lineit/share?url='
import styled from 'styled-components'
import FBLogo from '../../public/icon/fb-logo.svg'
import LineLogo from '../../public/icon/line-logo.svg'
const Link = styled.a`
  margin-right: 16px;
`
type SocialShareProps = {
  type: 'facebook' | 'line'
  width?: number
  height?: number
  url?: string
}
export default function ButtonSocialNetworkShare({
  type,
  url = '',
}: SocialShareProps) {
  const sharedUrl = useSharedUrl(url)
  const getSocialNetWorkInfo = (type: 'facebook' | 'line') => {
    switch (type) {
      case 'facebook':
        return {
          link: `${FACEBOOK_SHARED_URL}${sharedUrl}`,
          gtmClassName: 'GTM-share-facebook',
        }
      case 'line':
        return {
          link: `${LINE_SHARED_URL}${sharedUrl}`,
          gtmClassName: 'GTM-share-line',
        }

      default:
        return {
          link: `${FACEBOOK_SHARED_URL}${sharedUrl}`,
          gtmClassName: 'GTM-share-line',
        }
    }
  }
  const imageInfo = getSocialNetWorkInfo(type)
  return (
    <Link
      href={imageInfo.link}
      target="_blank"
      className={imageInfo.gtmClassName}
    >
      {type === 'facebook' ? <FBLogo></FBLogo> : <LineLogo></LineLogo>}
    </Link>
  )
}
