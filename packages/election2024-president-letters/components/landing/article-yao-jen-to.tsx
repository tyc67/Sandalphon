import ArticleCover from './article-cover'
import ArticleContent from '../shared/article-content'
import { content } from '../../constants/article/yao-jen-to'
import styled from 'styled-components'
const Article = styled.article`
  overflow: auto;
  scroll-snap-align: start;
  width: 100vw;
  height: 100vh;
  scroll-snap-type: y mandatory;
`
export default function ArticleYaoJeoTo() {
  return (
    <Article>
      <ArticleCover></ArticleCover>
      <ArticleContent content={content} name="姚人多" id=""></ArticleContent>
    </Article>
  )
}
