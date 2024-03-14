import { useEffect, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import TransformContainer from '../components/sticky-notes/TransformContainer'
import WideStyleArticle from '~/components/wide-article/index'

import { POST_JSON } from '~/const/wide-article'
import { onGA4Event } from '~/utils/wide-article'

const BottomAnchor = styled.span`
  width: 0;
  height: 0;
`

export default function Home({ postData, postContent }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onGA4Event('scroll', 'scroll to bottom-318_10th')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
    })

    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    return () => {
      if (bottomRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(bottomRef.current)
      }
    }
  }, [])

  return (
    <>
      <WideStyleArticle postData={postData} postContent={postContent} />
      <TransformContainer />
      <BottomAnchor ref={bottomRef} />
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
