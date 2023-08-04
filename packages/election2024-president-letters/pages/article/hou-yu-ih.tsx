import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { content } from '../../constants/article/hou-yu-ih'
import { imagePrefix } from '../../config'
import { HOU_YU_IH_LETTER } from '../../constants/index'
import FeedbackFormWrapper from '../../components/article/feedback-form-wrapper'

const HOU_YU_IH_COVER_IMAGE = {
  desktop: `${imagePrefix}/images/article/hou-yu-ih/1-desktop.jpeg`,
  tablet: `${imagePrefix}/images/article/hou-yu-ih/1-tablet.jpeg`,
  mobile: `${imagePrefix}/images/article/hou-yu-ih/1-mobile.jpeg`,
  desktopWebP: `${imagePrefix}/images/article/hou-yu-ih/1-desktop.webp`,
  tabletWebP: `${imagePrefix}/images/article/hou-yu-ih/1-tablet.webp`,
  mobileWebP: `${imagePrefix}/images/article/hou-yu-ih/1-mobile.webp`,
}
export default function ArticleHoYouIh() {
  return (
    <main>
      <article>
        <ArticleCover
          name={HOU_YU_IH_LETTER.name}
          id={HOU_YU_IH_LETTER.id}
          title={HOU_YU_IH_LETTER.letterDescription}
          imagesSrc={HOU_YU_IH_COVER_IMAGE}
        />
        <ArticleContent
          content={content}
          id={HOU_YU_IH_LETTER.id}
          name={HOU_YU_IH_LETTER.name}
        ></ArticleContent>
      </article>
      <FeedbackFormWrapper
        identifier="election24-president-letters-hou-yu-ih"
        candidate="侯友宜"
        nameColor="#5A6FB8"
      />
    </main>
  )
}
