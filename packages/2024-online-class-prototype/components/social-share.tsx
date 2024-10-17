'use client'

import NextImage from 'next/image'
import { useShareHandler } from '@/hooks/use-share-handler'
import { useEffect, useState } from 'react'
import IconFacebook from '@/public/images/facebook.png'
import IconLine from '@/public/images/line.png'
import IconLink from '@/public/images/link.png'

export default function SocialShare() {
  const shareHandler = useShareHandler()
  const [url, setUrl] = useState('')
  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  return (
    <div className="order-2 hidden gap-x-2 md:ml-auto md:mr-5 md:mt-5 md:flex lg:order-3 lg:ml-4 lg:mr-7 lg:mt-0">
      <a target="_blank" href={`https://www.facebook.com/share.php?u=${url}`}>
        <NextImage
          src={IconFacebook}
          width={28}
          height={28}
          alt="Facebook 分享"
        />
      </a>
      <a
        target="_blank"
        href={`https://social-plugins.line.me/lineit/share?url=${url}`}
      >
        <NextImage src={IconLine} width={28} height={28} alt="Line 分享" />
      </a>
      <button
        onClick={() => {
          shareHandler({
            url,
          })
        }}
      >
        <NextImage src={IconLink} width={28} height={28} alt="分享連結" />
      </button>
    </div>
  )
}
