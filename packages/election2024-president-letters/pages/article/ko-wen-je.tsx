// import Layout from '../../components/shared/layout'
import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { KO_WEN_JE_LETTER } from '../../constants/index'
import { content } from '../../constants/article/ko-wen-je'
import ArticleWrapper from '../../components/article/article-wrapper'
import Main from '../../components/shared/main-wrapper'
import Detector from '../../components/shared/detector'
import { imagePrefix } from '../../config'
import FeedbackFormWrapper from '../../components/article/feedback-form-wrapper'
import Related from '../../components/shared/related'
import Credits from '../../components/shared/credits'
import CustomHead from '../../components/shared/head'
import { getOGDescription, getTitleForHead } from '../../utils'
const ogDescription = getOGDescription(content)
const titleForHead = getTitleForHead(
  KO_WEN_JE_LETTER.letterDescription,
  KO_WEN_JE_LETTER.name
)
const KO_WEN_JE__COVER_IMAGE = {
  desktop: `${imagePrefix}/images/article/ko-wen-je/1-desktop.jpeg`,
  tablet: `${imagePrefix}/images/article/ko-wen-je/1-tablet.jpeg`,
  mobile: `${imagePrefix}/images/article/ko-wen-je/1-mobile.jpeg`,
  desktopWebP: `${imagePrefix}/images/article/ko-wen-je/1-desktop.webp`,
  tabletWebP: `${imagePrefix}/images/article/ko-wen-je/1-tablet.webp`,
  mobileWebP: `${imagePrefix}/images/article/ko-wen-je/1-mobile.webp`,
}
export default function ArticleKoWenJe() {
  const { state, component } = Detector()

  return (
    <>
      <CustomHead
        title={titleForHead}
        description={ogDescription}
        imageUrl="/images/article/ko-wen-je/1-tablet.jpeg"
      ></CustomHead>
      <Main shouldScrollSnap={state}>
        <ArticleWrapper>
          <ArticleCover
            name={KO_WEN_JE_LETTER.name}
            id={KO_WEN_JE_LETTER.id}
            title={KO_WEN_JE_LETTER.letterDescription}
            imagesSrc={KO_WEN_JE__COVER_IMAGE}
          ></ArticleCover>
          <ArticleContent
            content={content}
            name={KO_WEN_JE_LETTER.name}
            id={KO_WEN_JE_LETTER.id}
            shouldActiveParallaxScrolling={!state}
          >
            {component}
          </ArticleContent>
        </ArticleWrapper>
        <FeedbackFormWrapper
          identifier="election24-president-letters-ko-wen-je"
          candidate="柯文哲"
          nameColor="#3F8C88"
        />
        <Related renderCandidatesId={['lai-ching-te', 'hou-yu-ih']}></Related>
        <Credits></Credits>
      </Main>
    </>
  )
}
