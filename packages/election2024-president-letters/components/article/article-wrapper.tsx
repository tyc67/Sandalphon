import styled from 'styled-components'

const Article = styled.article`
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  white-space: nowrap;
`

type ArticleWrapperProps = {
  children: React.ReactNode
}
export default function ArticleWrapper({
  children,
}: ArticleWrapperProps): JSX.Element {
  return <Article>{children}</Article>
}
