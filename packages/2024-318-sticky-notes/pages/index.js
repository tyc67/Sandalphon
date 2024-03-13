import axios from 'axios'

import TransformContainer from '../components/sticky-notes/TransformContainer'
import WideStyleArticle from '~/components/wide-article/index'

import { POST_JSON } from '~/const/wide-article'

export default function Home({ postData, postContent }) {
  return (
    <>
      <WideStyleArticle postData={postData} postContent={postContent} />
      <TransformContainer />
    </>
  )
}

export async function getStaticProps() {
  let postData = null
  let postContent = null

  try {
    const response = await axios.get(`${POST_JSON}`)

    const posts = response.data

    postData = posts?.post || null
    postContent = postData.content
      ? { type: 'fullContent', data: postData.content, isLoaded: true }
      : null
  } catch (error) {
    console.error('Error fetching post data:', error)
  }

  return {
    props: {
      postData,
      postContent,
    },
  }
}
