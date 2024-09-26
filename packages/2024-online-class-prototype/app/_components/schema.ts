import { z } from 'zod'

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
