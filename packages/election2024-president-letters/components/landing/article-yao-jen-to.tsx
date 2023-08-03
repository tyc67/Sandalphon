import ArticleCover from './article-cover'
import ArticleContent from '../shared/article-content'
import { content } from '../../constants/article/yao-jen-to'

export default function ArticleYaoJeoTo() {
  return (
    <article>
      <ArticleCover></ArticleCover>
      <ArticleContent content={content} name="姚人多" id=""></ArticleContent>
    </article>
  )
}
