type ItemType = 'text' | 'second-text' | 'image' | 'intro' | 'subtitle'

type SubtitleValue = string[]
type OtherValue = string
type ImageOption = {
  isFullSizeImage: boolean
  maxWidth?: string
}
export type ArticleContentItem =
  | { type: 'subtitle'; value: SubtitleValue }
  | { type: 'intro'; value: SubtitleValue }
  | { type: 'image'; value: OtherValue; imageOption?: ImageOption }
  | { type: Exclude<ItemType, 'subtitle' | 'image'>; value: OtherValue }
export type ArticleContent = ArticleContentItem[]
