import { z } from 'zod'
import { courseObject } from './schema'
import CustomImage from '@/components/custom-image'
import { moneyStringToNumber } from '@/utils'

type Course = z.infer<typeof courseObject>
type Props = Pick<
  Course,
  | 'heroImage'
  | 'CourseName'
  | 'StartDate'
  | 'Lecturer'
  | 'BasePrice'
  | 'SpecialPrice'
  | 'PaymentURL'
> & {
  isPurchased: boolean
}

export default function Information({
  heroImage,
  CourseName,
  StartDate,
  Lecturer,
  BasePrice,
  SpecialPrice,
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
        objectFit="cover"
        className="aspect-[320/214] shrink-0 bg-[#FFF85B] md:aspect-[720/479] lg:aspect-[520/346] lg:!w-[520px]"
      />
      <div className="mt-3 flex w-full flex-col px-4 md:px-0 lg:ml-10 lg:mt-0">
        <div className="flex w-full flex-col lg:grow">
          <h1 className="break-all text-[22px] font-bold leading-normal md:text-[28px] md:leading-[1.8]">
            {CourseName}
          </h1>
          <p className="mt-2 text-base font-medium leading-[1.8] md:mt-[6px]">
            日期 {StartDate}
          </p>
          <p className="mt-1 text-base font-medium leading-[1.8] md:mt-[6px]">
            講師：{Lecturer}
          </p>
          <div className="mt-3 h-[2px] bg-black lg:hidden" />
        </div>
        <div className="my-4 flex w-full lg:relative lg:mb-6 lg:mt-0 lg:shrink-0 lg:flex-col">
          {noDiscount ? (
            <>
              <p className="mb-1 ml-auto mr-[5px] text-[38px] font-bold leading-[1.8] text-black md:m-0 md:text-[40px]">
                ${moneyStringToNumber(BasePrice)}
              </p>
            </>
          ) : (
            <>
              <span className="mt-1 grow text-base font-medium leading-[1.8] md:mt-6 md:grow-0 md:text-xl lg:mt-0 lg:text-xl">
                <p className="text-black line-through md:hidden">
                  原價 ${moneyStringToNumber(BasePrice)}
                </p>
                <p className="text-orange">超值優惠價</p>
              </span>
              <span className="mb-1 mr-1 shrink-0 text-[38px] font-bold leading-[1.8] text-orange md:m-0 md:ml-7 md:text-[40px] lg:m-0">
                ${moneyStringToNumber(SpecialPrice)}
              </span>
              <span className="hidden text-base font-medium leading-[1.8] text-black line-through md:ml-[30px] md:mt-[30px] md:inline lg:absolute lg:bottom-1 lg:left-[152px]">
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
