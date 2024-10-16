import NextLink from 'next/link'
import CustomImage from '@/components/custom-image'
import { z } from 'zod'
import { courseObject } from './schema'
import { moneyStringToNumber } from '@/utils'

type Props = z.infer<typeof courseObject>

export default function CourseItem({
  ID,
  CourseName,
  heroImage,
  StartDate,
  SpecialPrice,
  SpecialPriceDescriptionInHomepage,
  Lecturer,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-[420px] lg:mx-0">
      <div className="flex w-full flex-col rounded-[2.642px] border-2 border-solid border-black">
        <figure>
          <CustomImage
            images={{
              w480: heroImage.mobile,
              w800: heroImage.tablet,
              w1200: heroImage.desktop,
            }}
            alt={CourseName}
            objectFit="contain"
            className="aspect-[720/479] bg-course-image"
          />
          <figcaption className="break-all bg-main py-1 text-center text-base font-bold leading-[1.8] text-white md:text-[26px]">
            {CourseName}
          </figcaption>
        </figure>
        <div className="my-[10px] flex flex-col items-center gap-y-[10px] leading-none">
          <p className="text-base font-bold md:text-2xl">{Lecturer}</p>
          <p className="text-sm font-medium md:text-base">
            開課日期 {StartDate}
          </p>
          <p className="break-all text-center text-xl font-black text-orange md:text-4xl">
            {SpecialPriceDescriptionInHomepage
              ? SpecialPriceDescriptionInHomepage
              : `${moneyStringToNumber(SpecialPrice)}`}
          </p>
        </div>
      </div>
      <NextLink
        href={`/course/${ID}`}
        className="mt-4 block w-full rounded bg-orange py-[2px] text-center text-lg font-bold leading-[1.8] text-white md:mt-6 md:py-[6px] md:text-xl"
      >
        查看詳情
      </NextLink>
    </div>
  )
}
