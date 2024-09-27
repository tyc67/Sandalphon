'use client'

import { z } from 'zod'
import { imageObject } from '@/utils/schema'
import { useState } from 'react'
import Selector from './selector'
import ImageList from './image-list'

type Image = z.infer<typeof imageObject>
enum TAB {
  Course = 'course',
  Lecturer = 'lecturer',
}

// TODO: get lectuere image from data source
const lecturer: Image[] = [
  {
    mobile: 'https://picsum.photos/id/1/600/400',
    tablet: 'https://picsum.photos/id/1/960/640',
    desktop: 'https://picsum.photos/id/1/1200/800',
  },
  {
    mobile: 'https://picsum.photos/id/2/600/400',
    tablet: 'https://picsum.photos/id/2/960/640',
    desktop: 'https://picsum.photos/id/2/1200/800',
  },
]

// TODO: get lectuere image from data source
const course: Image[] = [
  {
    mobile: 'https://picsum.photos/id/3/600/400',
    tablet: 'https://picsum.photos/id/3/960/640',
    desktop: 'https://picsum.photos/id/3/1200/800',
  },
  {
    mobile: 'https://picsum.photos/id/4/600/400',
    tablet: 'https://picsum.photos/id/4/960/640',
    desktop: 'https://picsum.photos/id/4/1200/800',
  },
]

export default function Introduction() {
  const [activeTab, setActiveTab] = useState<TAB>(TAB.Course)

  return (
    <div className="mt-[60px] flex w-full flex-col gap-y-8 md:gap-y-10 lg:mt-[120px]">
      <div className="mx-auto flex gap-x-[18px]">
        <Selector
          isActive={activeTab === TAB.Course}
          onClick={() => setActiveTab(TAB.Course)}
        >
          課程介紹
        </Selector>
        <Selector
          isActive={activeTab === TAB.Lecturer}
          onClick={() => setActiveTab(TAB.Lecturer)}
        >
          講師介紹
        </Selector>
      </div>
      <ImageList
        isActive={activeTab === TAB.Course}
        images={course}
        altText="課程介紹"
      />
      <ImageList
        isActive={activeTab === TAB.Lecturer}
        images={lecturer}
        altText="講師介紹"
      />
    </div>
  )
}
