import { z } from 'zod'
import { optionalUrl, optionalDate, imageObject } from '@/utils/schema'

const relatedImage = z.object({
  Type: z.union([
    z.literal('Course'),
    z.literal('Lecturer'),
    z.literal('Book'),
  ]),
  image: imageObject,
})

const baseOutlineObject = z.object({
  ID: z.string(),
  Type: z.union([z.literal('Chapter'), z.literal('Section')]),
  Title: z.string(),
  Description: z.string(),
  VideoURL: optionalUrl,
  MaterialURL: optionalUrl,
})

type Outline = z.infer<typeof baseOutlineObject> & {
  children?: Outline[]
}

const outlineObject: z.ZodType<Outline> = baseOutlineObject.extend({
  children: z.lazy(() => outlineObject.array().optional()),
})

export const courseObject = z.object({
  ID: z.string(),
  CourseName: z.string(),
  Description: z.string(),
  heroImage: imageObject,
  StartDate: optionalDate,
  StartDateInCoursePage: z.string(),
  MoreStartDateDescriptionInCoursePage: z.string(),
  BasePrice: z.string(),
  SpecialPrice: z.string(),
  SpecialPriceDescription: z.string(),
  Lecturer: z.string(),
  PreviewVideoURL: optionalUrl,
  PreviewVideoImage: optionalUrl,
  IntroductionVideoURL: optionalUrl,
  PaymentURL: optionalUrl,
  relateds: z.array(relatedImage),
  outline: z.array(outlineObject),
})

export const dataSchema = z.object({
  courses: z.array(courseObject),
})
