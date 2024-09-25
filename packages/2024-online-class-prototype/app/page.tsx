'use client'

import { useEffect, useRef, useState } from 'react'
import { BASE_JSON_URL } from '@/constants/config'
import { z } from 'zod'
import Loading from '@/components/loading'
import CourseList from './_components/course-list'
import Divider from './_components/divider'
import PaymentFlow from './_components/payment-flow'

const MAX_RETRY_TIMES = 3

const optionalUrl = z.union([z.string().url(), z.literal('')])
const optionalDate = z.union([z.string().date(), z.literal('')])
const imageObject = z.object({
  mobile: optionalUrl,
  tablet: optionalUrl,
  desktop: optionalUrl,
})

export const courseObject = z.object({
  ID: z.string(),
  CourseName: z.string(),
  heroImage: imageObject,
  StartDate: optionalDate,
  SpecialPrice: z.string(),
  Lecturer: z.string(),
})

export const dataSchema = z.object({
  flowImage: z.array(imageObject),
  qaList: z.array(
    z.object({
      Question: z.string(),
      Answer: z.string(),
    })
  ),
  OrderReminder: z.array(z.string()),
  CourseList: z.array(courseObject),
})

export default function Home() {
  const fetchTimes = useRef(0)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<z.infer<typeof dataSchema> | null>(null)

  useEffect(() => {
    const initialize = async () => {
      try {
        fetchTimes.current += 1

        const resp = await fetch(BASE_JSON_URL)
        const result = await z.promise(dataSchema).parse(resp.json())

        setData(result)
        setIsLoading(false)
      } catch (error) {
        console.error('// Encountered error during initialization in homepage')
        console.error(error)

        if (fetchTimes.current < MAX_RETRY_TIMES) initialize()
        else setIsLoading(false)
      }
    }

    initialize()
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="my-auto *:text-main">
          <Loading />
        </div>
      ) : (
        data && (
          <div className="lg:max-w-homepage mt-10 w-full lg:mt-[60px]">
            <CourseList courses={data.CourseList} />
            <Divider />
            <PaymentFlow images={data.flowImage} />
            <Divider />
          </div>
        )
      )}
    </>
  )
}
