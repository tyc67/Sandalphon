// import Layout from '../../components/shared/layout'
import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { KO_WEN_JE_LETTER } from '../../constants/index'
import { content } from '../../constants/article/ko-wen-je'
const KO_WEN_JE__COVER_IMAGE = {
  desktop: '/images/article/ko-wen-je/1-desktop.jpeg',
  tablet: '/images/article/ko-wen-je/1-tablet.jpeg',
  mobile: '/images/article/ko-wen-je/1-mobile.jpeg',
  desktopWebP: '/images/article/ko-wen-je/1-desktop.webp',
  tabletWebP: '/images/article/ko-wen-je/1-tablet.webp',
  mobileWebP: '/images/article/ko-wen-je/1-mobile.webp',
}
export default function ArticleKoWenJe() {
  return (
    <main>
      <article>
        <ArticleCover
          name={KO_WEN_JE_LETTER.name}
          id={KO_WEN_JE_LETTER.id}
          title={KO_WEN_JE_LETTER.letterDescription}
          imagesSrc={KO_WEN_JE__COVER_IMAGE}
        />
        <ArticleContent
          content={content}
          name={KO_WEN_JE_LETTER.name}
          id={KO_WEN_JE_LETTER.id}
        ></ArticleContent>
      </article>
    </main>
  )
}
