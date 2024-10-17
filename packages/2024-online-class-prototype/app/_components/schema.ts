import { z } from 'zod'
import { optionalDate, imageObject, publicAccess } from '@/utils/schema'

export const courseObject = z.object({
  ID: z.string(),
  CourseName: z.string(),
  heroImage: imageObject,
  StartDate: optionalDate,
  SpecialPrice: z.string(),
  SpecialPriceDescriptionInHomepage: z.string(),
  Lecturer: z.string(),
  AllowPublicAccess: publicAccess,
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
