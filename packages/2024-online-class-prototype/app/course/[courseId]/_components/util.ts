import { z } from 'zod'
import { COURSE_JSON_URL } from '@/constants/config'
import { dataSchema } from './schema'

export const fetchCourseData = async () => {
  try {
    const resp = await fetch(COURSE_JSON_URL)
    const result = await z.promise(dataSchema).parse(resp.json())

    return result.courses
  } catch (error) {
    console.error('// Encountered error while fetching course data')
    console.error(error)

    return []
  }
}
