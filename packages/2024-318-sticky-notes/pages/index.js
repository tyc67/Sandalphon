import TransformContainer from '../components/sticky-notes/TransformContainer'
import WideStyleArticle from '../components/wide-article/index'
// article mock data
import PostData from '../data/post-data.json'
import PostContent from '../data/post-content.json'

export default function Home() {
  const data = Object.assign(PostData)
  const content = Object.assign(PostContent)

  return (
    <>
      <WideStyleArticle postData={data} postContent={content} />
      <TransformContainer />
    </>
  )
}
