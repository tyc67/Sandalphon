import ArticleCover from '../../components/article/article-cover'
import ArticleContent from '../../components/shared/article-content'
import { content } from '../../constants/article/hou-yu-ih'

import { HOU_YU_IH_LETTER } from '../../constants/index'

const HOU_YU_IH_COVER_IMAGE = {
  desktop: '/images/article/hou-yu-ih/1-desktop.jpeg',
  tablet: '/images/article/hou-yu-ih/1-tablet.jpeg',
  mobile: '/images/article/hou-yu-ih/1-mobile.jpeg',
  desktopWebP: '/images/article/hou-yu-ih/1-desktop.webp',
  tabletWebP: '/images/article/hou-yu-ih/1-tablet.webp',
  mobileWebP: '/images/article/hou-yu-ih/1-mobile.webp',
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
          name={HOU_YU_IH_LETTER.name}
        ></ArticleContent>
      </article>
    </main>
  )
}
