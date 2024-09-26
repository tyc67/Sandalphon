import { z } from 'zod'
import { dataSchema } from './schema'

type Props = {
  list: z.infer<typeof dataSchema>['OrderReminder']
}

export default function OrderReminder({ list }: Props) {
  return (
    <div className="flex w-full flex-col items-center px-6 text-[#727272] md:px-5 lg:px-0">
      <h2 id="course-list" className="section-title">
        訂購須知
      </h2>
      <div className="flex w-full flex-col gap-y-[28.8px] text-base font-normal leading-[1.8]">
        {list.map((message, index) => (
          <pre key={index} className="whitespace-pre-wrap">
            {index + 1}、{message}
          </pre>
        ))}
      </div>
    </div>
  )
}
