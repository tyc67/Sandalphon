import { DEFAULT_METADATA, SITE_URL } from '@/constants/config'
import ClientBody from './_components/client-body'
import { fetchCourseData } from './_components/util'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const courses = await fetchCourseData()

  return courses.map((course) => ({ courseId: course.ID }))
}

export async function generateMetadata({
  params,
}: {
  params: { courseId: string }
}) {
  const courseId = params.courseId

  if (!courseId) return DEFAULT_METADATA

  const metadata: Metadata = Object.assign(DEFAULT_METADATA, {
    openGraph: {
      url: `${SITE_URL}/course/${courseId}`,
    },
  })

  return metadata
}

export default function Page() {
  return <ClientBody />
}
