type ArticleWrapperProps = {
  children: React.ReactNode
}
export default function ArticleWrapper({
  children,
}: ArticleWrapperProps): JSX.Element {
  return <article>{children}</article>
}
