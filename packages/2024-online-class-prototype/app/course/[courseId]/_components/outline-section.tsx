import { z } from 'zod'
import { courseObject } from './schema'
import Outline from './outline'

type Props = Pick<z.infer<typeof courseObject>, 'Description' | 'outline'>

export default function OutlineSection({ Description, outline }: Props) {
  return (
    <section className="mx-auto mt-[60px] flex w-full max-w-[750px] flex-col items-center">
      <h2
        id="outline"
        className="text-xl font-bold leading-[1.8] md:text-[26px] lg:text-[32px]"
      >
        課程大綱
      </h2>
      <p className="mb-10 mt-[10px] break-all px-6 text-center text-base font-normal leading-[1.8] md:px-0 md:text-lg lg:mb-[60px]">
        {Description}
      </p>
      <Outline outline={outline} />
    </section>
  )
}
