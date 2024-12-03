'use client'
import { z } from 'zod'
import { courseObject } from './schema'
import ReactPlayer from 'react-player/lazy'
import { joinText } from './util'
import { useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

export type Props = Pick<
  z.infer<typeof courseObject>['outline'][0],
  'ID' | 'Title' | 'Description' | 'VideoURL' | 'MaterialURL'
> & {
  initalShowed?: boolean
}

export default function CourseVideo({
  Title,
  Description,
  VideoURL,
  MaterialURL,
  initalShowed,
}: Props) {
  const [isCollapse, setIsCollapse] = useState(!initalShowed)
  const [shouldShowError, setShouldShowError] = useState(false)

  const handleToggle = useDebounceCallback(() => {
    if (!isCollapse) {
      setShouldShowError(false)
    }

    setIsCollapse(!isCollapse)
  }, 500)

  return (
    <div className="flex w-full flex-col">
      <div className="peer flex w-full items-center bg-main px-[18px] py-1 md:py-2 md:pl-9 md:pr-3">
        <p className="grow break-all text-base font-bold leading-[1.8] text-white lg:text-xl">
          {joinText(Title, Description)}
        </p>
        <button
          className={`h-6 w-5 shrink-0 origin-center cursor-pointer appearance-none bg-[url('/images/video-toggle.svg')] bg-center bg-no-repeat ${isCollapse ? '' : 'rotate-180'}`}
          onClick={handleToggle}
        />
      </div>
      {!isCollapse && (
        <div className="flex flex-col">
          {shouldShowError ? (
            <div className="flex aspect-[16/9] flex-col items-center bg-black text-white">
              <p className="my-auto">影片載入失敗</p>
            </div>
          ) : (
            <ReactPlayer
              className="custom-video"
              url={VideoURL}
              width="100%"
              height="auto"
              controls={true}
              onError={(error) => {
                console.error(error)
                setShouldShowError(true)
              }}
            />
          )}
          {Boolean(MaterialURL) && (
            <a
              href={MaterialURL}
              target="_blank"
              className="my-4 inline-block self-center rounded-[3px] bg-orange px-[25px] text-base font-medium leading-[1.8] text-white md:self-end lg:px-11 lg:py-[3.5px]"
            >
              課程講義
            </a>
          )}
        </div>
      )}
    </div>
  )
}
