import { ArticleContent } from '../types'

const getOGDescription = (content: ArticleContent): string => {
  const firstItemValue = content[0].value
  if (Array.isArray(firstItemValue)) {
    return firstItemValue.join(' ')
  }
  return firstItemValue
}

const getTitleForHead = (title: string[]): string => {
  return title.join(' ')
}
export { getOGDescription, getTitleForHead }
