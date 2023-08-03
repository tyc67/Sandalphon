import ArticleImage from './article-image'

import styled, { css } from 'styled-components'
import { font, color } from '../../styles/theme'
const { background, text } = color
const { body } = font
import {
  ArticleContent as ArticleContentType,
  ArticleContentItem,
} from '../../types/index'

const defaultPadding = css`
  padding-left: 20px;
  padding-right: 20px;
`
const defaultMargin = css`
  margin-bottom: 24px;
`

const bodyFont = css`
  font-size: ${body.size};
  line-height: ${body.lineHeight};
  font-weight: ${body.weight};
`

const Wrapper = styled.section`
  background-color: ${background.gray};
  padding-top: 20px;
  padding-bottom: 20px;
  *:last-child {
    margin-bottom: 0px;
  }
`

const Text = styled.p`
  ${bodyFont};
  ${defaultMargin};
  ${defaultPadding};
`
const MainText = styled(Text)`
  color: ${text.important};
`
const SecondText = styled(Text)`
  color: ${text.secondary};
`
const formatImagePath = (value: string): any => {
  const device = {
    mobile: 'mobile',
    tablet: 'tablet',
    desktop: 'desktop',
  }

  const arr = Object.entries(device)
  const arrWebP = Object.entries(device).map((item) => {
    item[0] = `${item[0]}WebP`
    return item
  })
  const arrayWithWebP = arr.concat(arrWebP)
  arrayWithWebP.map((item) => {
    const isWebP = item[0].includes('WebP')
    item[1] = `/images/article/${value}-${item[1]}.${isWebP ? 'webp' : 'jpeg'}`

    return item
  })

  const imageSrc = arrayWithWebP.reduce((item, [key, value]) => {
    item[key] = value
    return item
  }, {} as Record<string, string>)
  return imageSrc
}
const parseArticleContent = (content: ArticleContentType, name: string) => {
  const renderItem = (item: ArticleContentItem) => {
    switch (item.type) {
      case 'text':
        return <MainText>{item.value}</MainText>
      case 'second-text':
        return <SecondText>{item.value}</SecondText>
      case 'image':
        const imagesSrc = formatImagePath(item.value)
        return (
          <ArticleImage
            name={name}
            type="content"
            imagesSrc={imagesSrc}
          ></ArticleImage>
        )
      default:
        return null
    }
  }
  return content.map((contentItem) => renderItem(contentItem))
}

type ArticleContentProps = {
  content: ArticleContentType
  name: string
}

export default function ArticleContent({
  content,
  name = '',
}: ArticleContentProps): JSX.Element {
  const contentJsx = parseArticleContent(content, name)
  return <Wrapper>{contentJsx}</Wrapper>
}
