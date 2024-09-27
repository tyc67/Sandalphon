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
        className="aspect-[320/214] bg-[#FFF85B] md:aspect-[720/479] lg:aspect-[520/346] lg:!w-[520px]"
      />
      <div className="mt-3 w-full lg:ml-10 lg:mt-0 lg:flex lg:flex-col">
        <h1 className="text-[22px] font-bold leading-normal md:text-[28px] md:leading-[1.8]">
          {CourseName}
        </h1>
        <div className="mt-[50px] px-4 md:mt-[6px] md:px-0 lg:flex lg:grow lg:flex-col">
          <p className="text-base font-medium leading-[1.8] lg:grow">
            日期 {StartDate}
            <br />
            講師：{Lecturer}
          </p>
          <div className="mt-3 h-px bg-black lg:hidden" />
          <div className="my-4 flex w-full lg:relative lg:mb-6 lg:mt-0 lg:shrink-0 lg:flex-col">
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
    </div>
  )
}
