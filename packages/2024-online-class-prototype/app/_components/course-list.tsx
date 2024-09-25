import { z } from 'zod'
import { courseObject } from '../page'
import CourseItem from './course-item'

type Props = {
  courses: z.infer<typeof courseObject>[]
}

export default function CourseList({ courses }: Props) {
  return (
    <div className="flex w-full flex-col items-center px-6 md:px-0">
      <h2 id="course-list" className="section-title text-black">
        課程總覽
      </h2>
      <div className="flex w-full flex-col gap-y-8 md:gap-y-10 lg:max-w-none lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-16">
        {courses.map((course) => (
          <CourseItem {...course} key={course.ID} />
        ))}
      </div>
    </div>
  )
}
