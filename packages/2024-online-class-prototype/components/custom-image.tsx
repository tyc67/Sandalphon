'use client'
import Image from '@readr-media/react-image'
import type { ReactElement } from 'react'

type Props = Parameters<typeof Image>[0]

export default function CustomImage(props: Props): ReactElement {
  const { alt = '', defaultImage = '' } = props

  return (
    <Image
      {...props}
      alt={alt}
      defaultImage={defaultImage}
      breakpoint={{
        mobile: '767px',
        tablet: '1199px',
      }}
    />
  )
}
