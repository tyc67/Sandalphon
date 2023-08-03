type ItemType = 'text' | 'second-text' | 'image' | 'intro' | 'subtitle'

type SubtitleValue = string[]
type OtherValue = string

export type ArticleContentItem =
  | { type: 'subtitle'; value: SubtitleValue }
  | { type: Exclude<ItemType, 'subtitle'>; value: OtherValue }
export type ArticleContent = ArticleContentItem[]
