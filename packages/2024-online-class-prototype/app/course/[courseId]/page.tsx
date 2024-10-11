import ClientBody from './_components/client-body'
import { fetchCourseData } from './_components/util'

export async function generateStaticParams() {
  const courses = await fetchCourseData()

  return courses.map((course) => ({ courseId: course.ID }))
}

export default function Page() {
  return <ClientBody />
}
