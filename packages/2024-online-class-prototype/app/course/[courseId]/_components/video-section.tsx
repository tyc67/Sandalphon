'use client'

import { z } from 'zod'
import { courseObject } from './schema'
import CourseVideo from './course-video'
import type { Props as CourseVideoProps } from './course-video'
import { useAppSelector } from '@/redux/hooks'
import { selectIsLogined } from '@/redux/features/user/selector'
import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { ORIGIN_STORAGE_KEY } from '@/constants/config'

const getVideoList = (data: Props['outline']): CourseVideoProps[] => {
  const result: CourseVideoProps[] = []

  data.forEach((item) => {
    if (
      'children' in item &&
      Array.isArray(item.children) &&
      item.children.length > 0
    ) {
      result.push(...getVideoList(item.children))
    } else {
      result.push(item)
    }
  })

  return result
}

type Props = Pick<
  z.infer<typeof courseObject>,
  'outline' | 'IntroductionVideoURL' | 'StartDate' | 'PaymentURL'
> & {
  isPurchased: boolean
}

export default function VideoSection({
  outline,
  IntroductionVideoURL,
  isPurchased,
  StartDate,
  PaymentURL,
}: Props) {
  const videoList: CourseVideoProps[] = getVideoList(outline)
  const isLogined = useAppSelector(selectIsLogined)
  const [now, setNow] = useState(Date.now())
  const hasStarted = Date.parse(StartDate) <= now
  const shouldShowMask = useMemo(
    () => !isLogined || !isPurchased || !hasStarted,
    [isLogined, isPurchased, hasStarted]
  )
  const [, setOrignPath] = useLocalStorage(ORIGIN_STORAGE_KEY, '')

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="mx-auto flex w-full max-w-[520px] flex-col items-center lg:max-w-[624px]">
      <h2
        id="video-list"
        className="mb-5 text-xl font-bold leading-[1.8] md:mb-10 md:text-[26px] lg:text-[32px]"
      >
        上課影片
      </h2>
      {Boolean(IntroductionVideoURL) && (
        <CourseVideo
          ID=""
          Title="0-0"
          Description="課前導讀"
          VideoURL={IntroductionVideoURL}
          MaterialURL=""
          initalShowed={true}
        />
      )}
      <div className="relative mt-6 flex min-h-[320px] w-full flex-col gap-y-3 md:min-h-[560px] lg:mt-12">
        {videoList.map((item) => {
          if (item.VideoURL) {
            return <CourseVideo {...item} key={item.ID} />
          } else {
            return null
          }
        })}
        {shouldShowMask && (
          <div className="absolute inset-0 flex flex-col items-center bg-login-mask">
            <div className="my-auto flex flex-col items-center gap-y-5 text-xl leading-[1.8]">
              {!isLogined && (
                <>
                  <p className="font-medium">看完整課程內容</p>
                  <a
                    className="mask-button"
                    href="/login"
                    onClick={() => setOrignPath(window.location.pathname)}
                  >
                    登入
                  </a>
                </>
              )}
              {!isPurchased && (
                <>
                  <p className="font-medium">還沒購買？</p>
                  <a className="mask-button" href={PaymentURL} target="_blank">
                    購買課程
                  </a>
                </>
              )}
              {isLogined && isPurchased && !hasStarted && (
                <p className="text-center font-medium">
                  課程尚未開始
                  <br />
                  敬請期待
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
