import Link from 'next/link'
import Image from 'next/image'
import useSharedUrl from '~/hooks/useSharedUrl'
import { staticFileDestination } from '~/config'

const FACEBOOK_SHARED_URL = 'https://www.facebook.com/share.php?u='
const LINE_SHARED_URL = 'https://social-plugins.line.me/lineit/share?url='

/**
 * @callback HandleGetShareUrl
 * @param {string} [url]
 * @return {string}
 */

/**
 *
 * @param {Object} props
 * @param {'facebook' | 'line'} props.type - What kind of social network platform
 * @param {number} [props.width] - width of image. optional, default is 35
 * @param {number} [props.height] - height of image. optional, default is 35
 * @param {HandleGetShareUrl} [props.handleGetShareUrl] - Function to get url need to be shared. Optional, default is custom hook `useSharedUrl`
 * @returns {JSX.Element}
 */
export default function ButtonSocialNetworkShare({
  type,
  width = 35,
  height = 35,
  handleGetShareUrl = useSharedUrl,
}) {
  const sharedUrl = handleGetShareUrl()
  const getSocialNetWorkInfo = (type) => {
    switch (type) {
      case 'facebook':
        return {
          imageSrc: `${staticFileDestination}/wide-article/fb-logo.svg`,
          imageAlt: 'facebook-share',
          link: `${FACEBOOK_SHARED_URL}${sharedUrl}`,
        }
      case 'line':
        return {
          imageSrc: `${staticFileDestination}/wide-article/line-logo.svg`,
          imageAlt: 'line-share',
          link: `${LINE_SHARED_URL}${sharedUrl}`,
        }

      default:
        return {
          imageSrc: `${staticFileDestination}/wide-article/line-logo.svg`,
          imageAlt: 'line-share',
          link: `${FACEBOOK_SHARED_URL}${sharedUrl}`,
        }
    }
  }
  const imageInfo = getSocialNetWorkInfo(type)
  return (
    <Link href={imageInfo.link} target="_blank" aria-label={imageInfo.imageAlt}>
      <Image
        src={imageInfo.imageSrc}
        width={width}
        height={height}
        alt={imageInfo.imageAlt}
      />
    </Link>
  )
}
