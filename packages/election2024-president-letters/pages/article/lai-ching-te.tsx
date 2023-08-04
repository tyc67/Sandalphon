// import Layout from '../../components/shared/layout'
import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { imagePrefix } from '../../config'
import { LAI_CHING_TE_LETTER } from '../../constants/index'
import { content } from '../../constants/article/lai-ching-te'
const LAI_CHING_TE_COVER_IMAGE = {
  desktop: `${imagePrefix}/images/article/lai-ching-te/1-desktop.jpeg`,
  tablet: `${imagePrefix}/images/article/lai-ching-te/1-tablet.jpeg`,
  mobile: `${imagePrefix}/images/article/lai-ching-te/1-mobile.jpeg`,
  desktopWebP: `${imagePrefix}/images/article/lai-ching-te/1-desktop.webp`,
  tabletWebP: `${imagePrefix}/images/article/lai-ching-te/1-tablet.webp`,
  mobileWebP: `${imagePrefix}/images/article/lai-ching-te/1-mobile.webp`,
}
export default function ArticleLaiChingTe() {
  return (
    <main>
      <article>
        <ArticleCover
          name={LAI_CHING_TE_LETTER.name}
          id={LAI_CHING_TE_LETTER.id}
          title={LAI_CHING_TE_LETTER.letterDescription}
          imagesSrc={LAI_CHING_TE_COVER_IMAGE}
        />
        <ArticleContent
          content={content}
          name={LAI_CHING_TE_LETTER.name}
          id={LAI_CHING_TE_LETTER.id}
        ></ArticleContent>
      </article>
    </main>
  )
}
