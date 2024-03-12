import styled from 'styled-components'
import RelatedArticleList from './related-article-list'

/**
 * @typedef {import('./related-article-list').Relateds} Relateds
 */
const AsideWrapper = styled.aside`
  width: 100%;
  max-width: 640px;
  margin: 20px auto;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 32px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin-top: 64px;
  }
`
/**
 * Component for rendering aside of story page, which contain related posts, latest news, popular news.
 * Currently used at wide layout and premium layout of story page.
 * @param {Object} props
 * @param {Relateds} props.relateds - The related post.
 * @returns {JSX.Element}
 */
export default function Aside({ relateds = [] }) {
  return (
    <AsideWrapper>
      {relateds.length > 0 && <RelatedArticleList relateds={relateds} />}
    </AsideWrapper>
  )
}
