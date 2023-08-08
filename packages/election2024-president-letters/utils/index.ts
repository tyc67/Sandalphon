import { ArticleContent } from '../types'

const getOGDescription = (content: ArticleContent): string => {
  const firstItemValue = content[0].value
  if (Array.isArray(firstItemValue)) {
    return firstItemValue.join(' ')
  }
  return firstItemValue
}

const getTitleForHead = (title: string[], candidateName: string): string => {
  const defaultTitle = '給年輕人的一封信'
  return `【${candidateName}全文】${defaultTitle}　${title.join('　')}`
}
export { getOGDescription, getTitleForHead }
