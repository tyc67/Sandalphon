import { z } from 'zod'
import { dataSchema } from '../page'

type Props = {
  list: z.infer<typeof dataSchema>['qaList']
}

export default function QAList({ list }: Props) {
  return (
    <div className="flex w-full flex-col items-center px-6 md:px-5 lg:px-0">
      <h2 id="course-list" className="section-title text-black">
        常見問題
      </h2>
      <div className="flex w-full flex-col gap-y-[28.8px]">
        {list.map(({ Question, Answer }, index) => (
          <div key={index} className="text-base leading-[1.8]">
            <p className="font-black text-main">{Question}</p>
            <p className="font-normal text-black">{Answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
