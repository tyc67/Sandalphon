'use client'

import { z } from 'zod'
import { imageObject } from '@/utils/schema'
import CustomImage from '@/components/custom-image'

type Image = z.infer<typeof imageObject>
type Props = {
  isActive: boolean
  altText: string
  images: Image[]
}

export default function ImageList({ images, altText, isActive }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-[520px] flex-col gap-y-8 md:gap-y-10 ${isActive ? 'flex' : 'hidden'}`}
    >
      {images.map((obj, index) => (
        <CustomImage
          key={index}
          images={{
            w480: obj.mobile,
            w800: obj.tablet,
            w1200: obj.desktop,
          }}
          objectFit="contain"
          alt={`${altText}#${index}`}
        />
      ))}
    </div>
  )
}
