// import Layout from '../../components/shared/layout'
import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { LAI_CHING_TE_LETTER } from '../../constants/index'
import { content } from '../../constants/article/lai-ching-te'
const LAI_CHING_TE_COVER_IMAGE = {
  desktop: '/images/article/lai-ching-te/1-desktop.jpeg',
  tablet: '/images/article/lai-ching-te/1-tablet.jpeg',
  mobile: '/images/article/lai-ching-te/1-mobile.jpeg',
  desktopWebP: '/images/article/lai-ching-te/1-desktop.webp',
  tabletWebP: '/images/article/lai-ching-te/1-tablet.webp',
  mobileWebP: '/images/article/lai-ching-te/1-mobile.webp',
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
        ></ArticleContent>
      </article>
    </main>
  )
}
