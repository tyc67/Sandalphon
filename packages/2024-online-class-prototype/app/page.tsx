'use client'
import { useEffect, useRef, useState } from 'react'
import { BASE_JSON_URL } from '@/constants/config'
import { z } from 'zod'
import { dataSchema } from './_components/schema'
import Loading from '@/components/loading'
import CourseList from './_components/course-list'
import Divider from './_components/divider'
import PaymentFlow from './_components/payment-flow'
import QAList from './_components/qa-list'
import OrderReminder from './_components/order-reminder'

const MAX_RETRY_TIMES = 3

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
        <div className="my-auto *:size-12 *:text-main">
          <Loading />
        </div>
      ) : (
        data && (
          <div className="mb-20 mt-10 w-full md:mb-[140px] lg:mb-[120px] lg:mt-[60px] lg:max-w-homepage">
            <CourseList courses={data.CourseList} />
            <Divider />
            <PaymentFlow images={data.flowImage} />
            <Divider />
            <QAList list={data.qaList} />
            <Divider />
            <OrderReminder list={data.OrderReminder} />
          </div>
        )
      )}
    </>
  )
}
