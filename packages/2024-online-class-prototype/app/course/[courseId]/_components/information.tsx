import { z } from 'zod'
import { courseObject } from './schema'
import CustomImage from '@/components/custom-image'
import { moneyStringToNumber } from '@/utils'

type Course = z.infer<typeof courseObject>
type Props = Pick<
  Course,
  | 'heroImage'
  | 'CourseName'
  | 'StartDateInCoursePage'
  | 'MoreStartDateDescriptionInCoursePage'
  | 'Lecturer'
  | 'BasePrice'
  | 'SpecialPrice'
  | 'SpecialPriceDescription'
  | 'PaymentURL'
> & {
  isPurchased: boolean
}

export default function Information({
  heroImage,
  CourseName,
  StartDateInCoursePage,
  MoreStartDateDescriptionInCoursePage,
  Lecturer,
  BasePrice,
  SpecialPrice,
  SpecialPriceDescription,
  PaymentURL,
  isPurchased,
}: Props) {
  const noDiscount = SpecialPrice === '' || BasePrice === SpecialPrice

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col lg:mx-0 lg:max-w-none lg:flex-row">
      <CustomImage
        images={{
          w480: heroImage.mobile,
          w800: heroImage.tablet,
          w1200: heroImage.desktop,
        }}
        alt={CourseName}
        objectFit="contain"
        className="aspect-[720/479] shrink-0 bg-course-image lg:max-w-[520px]"
      />
      <div className="mt-3 flex w-full flex-col px-3 md:px-0 lg:ml-10 lg:mt-0">
        <div className="flex w-full flex-col lg:grow">
          <h1 className="break-all text-[22px] font-bold leading-normal md:text-[28px] md:leading-[1.8]">
            {CourseName}
          </h1>
          <p className="mt-2 break-all text-base font-medium leading-[1.8] md:mt-[6px]">
            開課日期：{StartDateInCoursePage}
            {Boolean(MoreStartDateDescriptionInCoursePage) && (
              <>
                <br />
                <span className="text-main">
                  {MoreStartDateDescriptionInCoursePage}
                </span>
              </>
            )}
          </p>
          <p className="mt-1 text-base font-medium leading-[1.8] md:mt-[6px]">
            講師：{Lecturer}
          </p>
          <div className="mt-3 h-[2px] bg-black lg:hidden" />
        </div>
        <div className="my-4 flex w-full md:flex-wrap lg:relative lg:mb-6 lg:mt-0 lg:shrink-0 lg:flex-col">
          {noDiscount ? (
            <>
              <p className="mb-1 ml-auto mr-[5px] text-[38px] font-bold leading-[1.8] text-black md:m-0 md:text-[40px]">
                ${moneyStringToNumber(BasePrice)}
              </p>
            </>
          ) : (
            <>
              <span className="mt-1 grow font-medium md:mt-3 md:w-full md:text-xl lg:mt-0 lg:text-xl">
                <p className="text-2xl leading-[1.8] text-[#F04545] line-through md:hidden">
                  原價 ${moneyStringToNumber(BasePrice)}
                </p>
                <p className="break-words text-base leading-normal tracking-[-0.45px] text-orange">
                  {SpecialPriceDescription || '超值優惠價'}
                </p>
              </span>
              <span className="mb-1 mr-1 shrink-0 text-[38px] font-bold leading-[1.8] text-orange md:m-0 md:text-[40px] lg:m-0">
                ${moneyStringToNumber(SpecialPrice)}
              </span>
              <span className="hidden text-[32px] font-medium leading-[1.8] text-[#F04545] line-through md:ml-[30px] md:mt-[30px] md:inline lg:absolute lg:bottom-1 lg:left-[152px]">
                原價 ${moneyStringToNumber(BasePrice)}
              </span>
            </>
          )}
        </div>
        {!isPurchased && (
          <a
            target="_blank"
            href={PaymentURL}
            className="block w-full rounded bg-orange py-[2px] text-center text-lg font-bold leading-[1.8] text-white"
          >
            立即購買
          </a>
        )}
      </div>
    </div>
  )
}
