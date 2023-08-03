import ArticleImage from './article-image'

import styled, { css } from 'styled-components'
import { font, color } from '../../styles/theme'
const { background, text, border, candidates } = color
const { body, h3, h5 } = font

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
const MaxWidth = css`
  max-width: 640px; //todo: after implement like/dislike, should adjust this value
  margin-left: auto;
  margin-right: auto;
`

const Wrapper = styled.section`
  background-color: ${background.gray};
  padding-top: 20px;
  padding-bottom: 20px;
  *:last-child {
    margin-bottom: 0px;
  }
  overflow-x: hidden;
`

const Text = styled.p`
  ${bodyFont};
  ${defaultMargin};
  ${defaultPadding};
  ${MaxWidth}
`

const Intro = styled.section`
  ${defaultMargin};
  ${defaultPadding};
  ${MaxWidth};
  padding-top: 8px;
  padding-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: white;
  border: 1px solid ${border};
  border-radius: 12px;
  font-size: ${h5.size};
  line-height: ${h5.lineHeight};
  font-weight: ${h5.weight};
  color: ${text.secondary};
  p {
    margin-top: 12px;
    background: linear-gradient(
      0deg,
      ${border} 1px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0) 100%
    );
    background-size: ${`100% calc(${h5.size} * ${h5.lineHeight})`};
  }
`

const MainText = styled(Text)`
  color: ${text.important};
`
const SecondText = styled(Text)`
  color: ${text.secondary};
`
const Subtitle = styled.h2<{ candidateId: string }>`
  ${defaultPadding};
  ${MaxWidth}
  font-size: ${h3.size};
  line-height: ${h3.lineHeight};
  font-weight: ${h3.weight};
  margin-bottom: 20px;
  margin-top: 40px;
  color: ${(props) =>
    candidates[props.candidateId as keyof typeof candidates].text};
  span {
    display: block;
  }
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

const parseArticleContent = (
  content: ArticleContentType,
  name: string,
  id: string
) => {
  const renderItem = (item: ArticleContentItem) => {
    switch (item.type) {
      case 'intro':
        return (
          <Intro>
            {item.value.map((i, index) => (
              <p key={index}>{i}</p>
            ))}
          </Intro>
        )
      case 'subtitle':
        return (
          <Subtitle candidateId={id}>
            {item.value.map((i, index) => (
              <span key={index}>{i}</span>
            ))}
          </Subtitle>
        )
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
            imageCaption={item.imageOption?.imageCaption}
            isFullSizeImage={item.imageOption.isFullSizeImage}
            shouldRespectImageWightAndHeight={
              item.imageOption?.shouldRespectImageWightAndHeight
            }
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
  id: string
}

export default function ArticleContent({
  content,
  name = '',
  id,
}: ArticleContentProps): JSX.Element {
  const contentJsx = parseArticleContent(content, name, id)
  return <Wrapper>{contentJsx}</Wrapper>
}
