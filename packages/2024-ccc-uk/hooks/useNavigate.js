import { useEffect, useRef, useCallback, useState } from 'react'
// import ReactGA from 'react-ga'

import useWindowDimensions from './useWindowDimensions'
import gtag from '../utils/gtag'
import { projectName } from '../consts/config'

export default function useNavigate(pagesRef) {
  const [browsingIndex, setBrowsingIndex] = useState(0)
  const lowestPageIndexRef = useRef(0)
  const pageNavigationInfosRef = useRef([])
  const windowDimensions = useWindowDimensions()
  const isMapGASent = useRef(false)

  const jumpToPage = useCallback(
    (index) => {
      const scrollYPosition = pageNavigationInfosRef.current
        .slice(0, index)
        .reduce((sum, next) => sum + next.height, 0)
      pagesRef.current.parentElement.scroll(0, scrollYPosition)
    },
    [pagesRef]
  )

  useEffect(() => {
    setTimeout(() => {
      if (pagesRef.current) {
        const pageDoms = [
          ...pagesRef.current.querySelectorAll(':scope > div.page'),
        ]
        pageNavigationInfosRef.current = pageDoms.map((pageDom, index) => ({
          index,
          height: pageDom.clientHeight,
        }))
      }
    }, 300)
  }, [pagesRef, windowDimensions])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries = entries.filter((entry) => entry.isIntersecting)
        if (entries.length === 1) {
          const showingPageIndex = entries[0].target.id.split('-')[1] - 0

          // quick silly way to trigger ga event on map showed. Make sure to change this if map's index is modified.
          // only send this event once per page lifecycle.
          if (showingPageIndex === 1) {
            if (!isMapGASent.current) {
              const windowWidth = windowDimensions.width
              const eventName = `scroll to map ${
                windowWidth > 930 ? 'desktop' : 'mobile'
              } - ${projectName}`
              gtag.sendGAEvent('scroll', {
                projects: eventName,
              })
              isMapGASent.current = true
            }
          }

          if (showingPageIndex > lowestPageIndexRef.current) {
            lowestPageIndexRef.current = showingPageIndex
            if (
              showingPageIndex ===
              pagesRef.current.querySelectorAll(':scope > div.page').length - 1
            ) {
              gtag.sendGAEvent('scroll', {
                projects: `scroll to end - ${projectName}`,
              })
            }
          }

          setBrowsingIndex(showingPageIndex)
        } else if (entries.length > 1) {
          console.error(
            '[Error]: intersection observer observe two intersecting'
          )
        }
      },
      { threshold: 0.5 }
    )

    const pageDoms = [...pagesRef.current.querySelectorAll(':scope > div.page')]
    pageDoms.forEach((pageDom) => {
      observer.observe(pageDom)
    })

    return () => {
      pageDoms.forEach((pageDom) => {
        observer.unobserve(pageDom)
      })
    }
  }, [pagesRef, windowDimensions])

  useEffect(() => {
    const beforeunloadHandler = () => {
      gtag.sendGAEvent('scroll', {
        projects: `scroll to page ${lowestPageIndexRef.current} - ${projectName}`,
      })
    }
    window.addEventListener('beforeunload', beforeunloadHandler)

    return () => window.removeEventListener('beforeunload', beforeunloadHandler)
  }, [])

  return {
    navigateTo: jumpToPage,
    browsingIndex,
  }
}
