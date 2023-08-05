// import Layout from '../../components/shared/layout'
import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { KO_WEN_JE_LETTER } from '../../constants/index'
import { content } from '../../constants/article/ko-wen-je'
import ArticleWrapper from '../../components/article/article-wrapper'

import { imagePrefix } from '../../config'
import FeedbackFormWrapper from '../../components/article/feedback-form-wrapper'

const KO_WEN_JE__COVER_IMAGE = {
  desktop: `${imagePrefix}/images/article/ko-wen-je/1-desktop.jpeg`,
  tablet: `${imagePrefix}/images/article/ko-wen-je/1-tablet.jpeg`,
  mobile: `${imagePrefix}/images/article/ko-wen-je/1-mobile.jpeg`,
  desktopWebP: `${imagePrefix}/images/article/ko-wen-je/1-desktop.webp`,
  tabletWebP: `${imagePrefix}/images/article/ko-wen-je/1-tablet.webp`,
  mobileWebP: `${imagePrefix}/images/article/ko-wen-je/1-mobile.webp`,
}
export default function ArticleKoWenJe() {
  return (
    <main>
      <ArticleWrapper>
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
      </ArticleWrapper>
      <FeedbackFormWrapper
        identifier="election24-president-letters-ko-wen-je"
        candidate="柯文哲"
        nameColor="#3F8C88"
      />
    </main>
  )
}
