// import Layout from '../../components/shared/layout'
import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { imagePrefix } from '../../config'
import { LAI_CHING_TE_LETTER } from '../../constants/index'
import { content } from '../../constants/article/lai-ching-te'
import FeedbackFormWrapper from '../../components/article/feedback-form-wrapper'
import ArticleWrapper from '../../components/article/article-wrapper'
import Main from '../../components/shared/main-wrapper'
import Detector from '../../components/shared/detector'
import Related from '../../components/shared/related'
import Credits from '../../components/shared/credits'
import CustomHead from '../../components/shared/head'
import { getOGDescription, getTitleForHead } from '../../utils'
const ogDescription = getOGDescription(content)
const titleForHead = getTitleForHead(
  LAI_CHING_TE_LETTER.letterDescription,
  LAI_CHING_TE_LETTER.name
)

const LAI_CHING_TE_COVER_IMAGE = {
  desktop: `${imagePrefix}/images/article/lai-ching-te/1-desktop.jpeg`,
  tablet: `${imagePrefix}/images/article/lai-ching-te/1-tablet.jpeg`,
  mobile: `${imagePrefix}/images/article/lai-ching-te/1-mobile.jpeg`,
  desktopWebP: `${imagePrefix}/images/article/lai-ching-te/1-desktop.webp`,
  tabletWebP: `${imagePrefix}/images/article/lai-ching-te/1-tablet.webp`,
  mobileWebP: `${imagePrefix}/images/article/lai-ching-te/1-mobile.webp`,
}

export default function ArticleLaiChingTe() {
  // const [isTopDetectorInView, setIsTopDetectorInView] = useState(true)
  // const shouldScrollSnap = isTopDetectorInView
  const { state, component } = Detector()
  const shouldScrollSnap = state
  return (
    <>
      <CustomHead
        title={titleForHead}
        description={ogDescription}
        imageUrl="/images/article/lai-ching-te/1-tablet.jpeg"
      ></CustomHead>
      <Main shouldScrollSnap={shouldScrollSnap}>
        <ArticleWrapper>
          <ArticleCover
            name={LAI_CHING_TE_LETTER.name}
            id={LAI_CHING_TE_LETTER.id}
            title={LAI_CHING_TE_LETTER.letterDescription}
            imagesSrc={LAI_CHING_TE_COVER_IMAGE}
          ></ArticleCover>
          <ArticleContent
            shouldActiveParallaxScrolling={!state}
            content={content}
            name={LAI_CHING_TE_LETTER.name}
            id={LAI_CHING_TE_LETTER.id}
          >
            {component}
          </ArticleContent>
        </ArticleWrapper>

        <FeedbackFormWrapper
          identifier="election24-president-letters-lai-ching-te"
          candidate="賴清德"
          nameColor="#6F8F46"
        />
        <Related renderCandidatesId={['hou-yu-ih', 'ko-wen-je']}></Related>
        <Credits></Credits>
      </Main>
    </>
  )
}
