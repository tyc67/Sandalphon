import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import axios from '~/axios'
import TransformContainer from '../components/sticky-notes/TransformContainer'
import WideStyleArticle from '~/components/wide-article/index'

import { POST_JSON } from '~/const/wide-article'
import { onGA4Event } from '~/utils/wide-article'
import { stickyNoteMetaUrl } from '~/const/sticky-notes'
import { useAppDispatch } from '~/hooks/useRedux'
import { stickyNoteActions } from '~/store/sticky-note-slice'

/**
 * @typedef {import('~/data/mockData').StickyNotesWording} StickyNotesWording
 */

const BottomAnchor = styled.span`
  width: 0;
  height: 0;
`

/**
 *
 * @param {Object} props
 * @param {Object} props.postData
 * @param {Object} props.postContent
 * @param {StickyNotesWording[]} props.stickyNotesWordings
 * @returns
 */
export default function Home({ postData, postContent, stickyNotesWordings }) {
  const bottomRef = useRef(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (stickyNotesWordings) {
      dispatch(stickyNoteActions.chagneStickyNotesWordings(stickyNotesWordings))
    }
  }, [])

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
  /** @type {StickyNotesWording[]} */
  let stickyNotesWordings = []

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

  try {
    const response = await axios.get(stickyNoteMetaUrl)
    stickyNotesWordings = response.data.placeholder || []
  } catch (error) {
    console.error('Error fetching sticky notes meta', error)
  }

  return {
    props: {
      postData,
      postContent,
      stickyNotesWordings,
    },
  }
}
