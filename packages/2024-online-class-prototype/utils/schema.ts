import { z } from 'zod'

export const optionalUrl = z.union([z.string().url(), z.literal('')])
export const optionalDate = z.union([z.string().date(), z.literal('')])
export const imageObject = z.object({
  mobile: optionalUrl,
  tablet: optionalUrl,
  desktop: optionalUrl,
})
export const publicAccess = z.union([z.literal('TRUE'), z.literal('FALSE')])
