import { Option } from '@readr-media/react-feedback/dist/typedef'

type ItemType = 'text' | 'second-text' | 'image' | 'intro' | 'subtitle'

type SubtitleValue = string[]
type OtherValue = string
export type ImageOption = {
  isFullSizeImage: boolean
  imageCaption?: string
  shouldRespectImageWightAndHeight?: boolean
}
export type ArticleContentItem =
  | { type: 'subtitle'; value: SubtitleValue }
  | { type: 'intro'; value: SubtitleValue }
  | { type: 'text'; value: OtherValue; id?: string }
  | { type: 'image'; value: OtherValue; imageOption: ImageOption }
  | { type: 'text'; value: OtherValue; id: string }
  | {
    type: Exclude<ItemType, 'subtitle' | 'image' | 'intro' | 'text'>
    value: OtherValue
  }
export type ArticleContent = ArticleContentItem[]

export type ExtendedOption = Option & { sortOrder: number }
