import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { logGAEvent } from '~/utils/analytics'
import { OpenEmbeddedVideo } from '~/constants/embedded-code'

const Container = styled.div`
  z-index: 500;
  .cover-photo {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    z-index: -1;
    margin: auto;
  }

  .cover-photo-desktop {
    display: none;
  }
  .cover-photo-mobile {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: auto;
  }

  @media screen and (min-width: 768px) {
    .cover-photo-mobile {
      display: none;
    }
    .cover-photo-desktop {
      display: block;
      width: 100%;
      object-fit: contain;
    }
  }

  .video-anchor {
    height: 1px;
    visibility: hidden;
  }
`

const Block = styled.div`
  position: relative;
  z-index: 200;
  /* styles for image link */
  img.img-responsive {
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
`

export default function Embedded() {
  const embeddedCode = OpenEmbeddedVideo

  const embedded = useRef(null)

  // interSectionObserver
  const embeddedAnchor = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (embeddedAnchor.current) observer.observe(embeddedAnchor.current)
    if (isVisible) {
      logGAEvent('Scroll', 'scroll to head video')
    }
    return () => {
      if (embeddedAnchor.current) observer.unobserve(embeddedAnchor.current)
    }
  }, [embeddedAnchor, options, isVisible])

  useEffect(() => {
    const node = embedded.current
    if (node.children[0]) return
    const fragment = document.createDocumentFragment()

    // `embeddedCode` is a string, which may includes
    // multiple '<script>' tags and other html tags.
    // For executing '<script>' tags on the browser,
    // we need to extract '<script>' tags from `embeddedCode` string first.
    //
    // The approach we have here is to parse html string into elements,
    // and we could use DOM element built-in functions,
    // such as `querySelectorAll` method, to query '<script>' elements,
    // and other non '<script>' elements.
    const parser = new DOMParser()
    const ele = parser.parseFromString(
      `<div id="embedded">${embeddedCode}</div>`,
      'text/html'
    )

    const scripts = ele.querySelectorAll('script')
    const nonScripts = ele.querySelectorAll('div#embedded > :not(script)')

    nonScripts.forEach((ele) => {
      fragment.appendChild(ele)
    })

    scripts.forEach((s) => {
      const scriptEle = document.createElement('script')
      const attrs = s.attributes
      for (let i = 0; i < attrs.length; i++) {
        scriptEle.setAttribute(attrs[i].name, attrs[i].value)
      }
      scriptEle.text = s.text || ''
      fragment.appendChild(scriptEle)
    })

    node.appendChild(fragment)
  }, [embeddedCode])

  return (
    <Container>
      <div className="cover-photo">
        <img
          className="cover-photo-desktop"
          src="/cover-photo-desktop.jpg"
          alt="cover-photo"
        ></img>
        <img
          className="cover-photo-mobile"
          src="/cover-photo-mobile.jpg"
          alt="cover-photo"
        ></img>
      </div>
      <div ref={embeddedAnchor} className="video-anchor"></div>
      <Block ref={embedded} />
    </Container>
  )
}
