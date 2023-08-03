export type ArticleContentItem = {
  type: 'text' | 'second-text' | 'image'
  value: string
}
export type ArticleContent = ArticleContentItem[]
