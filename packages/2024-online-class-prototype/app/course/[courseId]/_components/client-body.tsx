'use client'

import { usePathname } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import { z } from 'zod'
import { courseObject } from './schema'
import { fetchCourseData } from './util'
import LoadingLayout from '@/components/loading-layout'

const MAX_RETRY_TIMES = 3

export default function ClientBody() {
  const pathname = usePathname()
  const courseId = pathname.split('/')[2]
  const fetchTimes = useRef(0)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<z.infer<typeof courseObject> | null>(null)

  useEffect(() => {
    const initialize = async () => {
      try {
        fetchTimes.current += 1

        const result = await fetchCourseData()
        const matchedData = result.find((course) => course.ID === courseId)

        if (matchedData) {
          setData(matchedData)
        }

        setIsLoading(false)
      } catch (error) {
        console.error(
          '// Encountered error during initialization in course page'
        )
        console.error(error)

        if (fetchTimes.current < MAX_RETRY_TIMES) initialize()
        else setIsLoading(false)
      }
    }

    initialize()
  }, [courseId])

  return <LoadingLayout isLoading={isLoading}>{data && <></>}</LoadingLayout>
}
