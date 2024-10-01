'use client'

import { z } from 'zod'
import { courseObject } from './schema'
import { useEffect, useState } from 'react'
import Selector from './selector'
import ImageList from './image-list'
import { imageObject } from '@/utils/schema'

enum TAB {
  Course = 'course-intro',
  Lecturer = 'lecturer-intro',
}

type Props = Pick<z.infer<typeof courseObject>, 'relateds'>

const transformToImageObject = ({
  MobileURL,
  TabletURL,
  DesktopURL,
}: Props['relateds'][0]): z.infer<typeof imageObject> => ({
  mobile: MobileURL,
  tablet: TabletURL,
  desktop: DesktopURL,
})

export default function Introduction({ relateds }: Props) {
  const course = relateds
    .filter((image) => image.Type === 'Course')
    .map(transformToImageObject)
  const lecturer = relateds
    .filter((image) => image.Type === 'Lecturer')
    .map(transformToImageObject)
  const [activeTab, setActiveTab] = useState<TAB>(TAB.Course)

  const updateTab = (url: string) => {
    const hash = url.split('#')[1]

    if (hash === TAB.Course || hash === TAB.Lecturer) {
      setActiveTab(hash)
    }
  }

  useEffect(() => {
    const onHashChange = (e: HashChangeEvent) => {
      const newUrl = e.newURL
      updateTab(newUrl)
    }

    updateTab(window.location.href)

    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return (
    <div className="mt-[60px] flex w-full flex-col gap-y-8 md:gap-y-10 lg:mt-[120px]">
      <div className="mx-auto flex gap-x-[18px]">
        <Selector
          id="course-intro"
          isActive={activeTab === TAB.Course}
          onClick={() => setActiveTab(TAB.Course)}
        >
          課程介紹
        </Selector>
        <Selector
          id="lecturer-intro"
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
