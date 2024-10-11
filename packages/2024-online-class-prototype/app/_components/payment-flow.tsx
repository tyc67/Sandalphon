import { z } from 'zod'
import { dataSchema } from './schema'
import CustomImage from '@/components/custom-image'

type Props = {
  images: z.infer<typeof dataSchema>['flowImage']
}

export default function PaymentFlow({ images }: Props) {
  return (
    <div className="flex w-full flex-col items-center px-6 md:px-5 lg:px-0">
      <h2 id="payment-flow" className="section-title text-black">
        訂購流程
      </h2>
      {images.map((image, index) => (
        <CustomImage
          key={index}
          images={{
            w480: image.mobile,
            w800: image.tablet,
            w1200: image.desktop,
          }}
          alt="訂購流程"
          objectFit="contain"
          className="bg-[#D9D9D9]"
        />
      ))}
    </div>
  )
}
