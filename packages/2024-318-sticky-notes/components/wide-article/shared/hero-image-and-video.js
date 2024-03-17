import styled, { css } from 'styled-components'
import CustomImage from '@readr-media/react-image'
import { defaultPingFangFontFamily } from '~/styles/shared-style'
import { useEffect, useRef } from 'react'
import { useAppDispatch } from '~/hooks/useRedux'
import { stickyNoteActions } from '~/store/sticky-note-slice'
import { staticFileDestination } from '~/const/wide-article'
/**
 * @typedef {Pick<import('~/type/wide-article/post').HeroImage ,'id' | 'resized' | 'resizedWebp'>} HeroImage
 */

/**
 * @typedef {import('~/type/wide-article/post').HeroVideo } HeroVideo
 */
const heroCssWide = css`
  object-position: center center;
`
const heroCssPremium = css`
  margin: 0 auto;
  max-width: 1200px;
  max-height: 800px;
  object-position: center center;
`

const TitleWrapper = styled.section`
  margin: 20px 10px 0;
  max-width: 800px;
  width: auto;

  ${({ theme }) => theme.breakpoint.md} {
    position: absolute;
    left: 50%;
    bottom: calc(100% - 100vh);
    transform: translate(-50%, 0%);
    margin: 0 auto;
    width: 90vw;
    margin-bottom: 10vh;
    max-width: 800px;
  }
`
const ArticleTitle = styled.h1`
  color: rgba(255, 255, 255, 0.87);
  font-size: 24px;
  ${defaultPingFangFontFamily};
  font-weight: 700;
  text-align: center;
  display: block;

  ${({ theme }) => theme.breakpoint.md} {
    color: rgba(255, 255, 255, 0.87);
    font-size: 36px;
    line-height: 52px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 40px;
    line-height: 1.5;
  }
`

const ArticleSubtitle = styled.h2`
  color: white;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
  ${defaultPingFangFontFamily};
  text-align: center;
  margin: 0.3rem;

  ${({ theme }) => theme.breakpoint.md} {
    ${defaultPingFangFontFamily};
    color: white;
    font-size: 28px;
    font-weight: 400;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    ${defaultPingFangFontFamily};
    font-size: 32px;
    line-height: 1.5;
  }
`

const Figure = styled.figure`
  margin: 0 0 0;
  height: 100%;
  position: relative;
  video {
    ${({ isStyleWide }) =>
      isStyleWide ? `${heroCssWide}` : `${heroCssPremium}`}
  }
  .readr-media-react-image {
    ${({ isStyleWide }) =>
      isStyleWide ? `${heroCssWide}` : `${heroCssPremium}`}
  }
  .empty {
    ${heroCssWide}
  }
  ${
    /**
     * @param {Object} param
     * @param {boolean} param.isStyleWide
     */
    ({ isStyleWide }) =>
      isStyleWide &&
      `&::after {
      content: ' ';
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100vh;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15)
      );
    }`
  }
  ${({ theme }) => theme.breakpoint.md} {
    margin: 0 0 0;
  }
`
const Empty = styled.div`
  margin: 0 0 0;
  width: 100%;
  height: 100vh;
  background-color: #d9d9d9;
`
const HeroCaption = styled.figcaption`
  display: block;
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.8;
  font-weight: 400;
  color: #9f9f9f;
  margin: 12px auto 0;
  padding: 0 20px;
  max-width: 680px;
  text-align: center;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`
const Video = styled.video`
  object-fit: cover;
  height: 100vh;
  width: 100%;
`

/**
 * Component for rending hero image of hero video.
 * This component is currently used at story page wide and premium layout.
 * This component will change it style by `props.style`.
 * If `props.style` is `wide`, component will render style for story page wide layout.
 * If `props.style` is `premium`, component will render style for story page premium layout.
 * There are four difference between 'wide' and `premium`:
 * 1. In `wide`, there is a `<h1>` in middle of bottom of component. In `premium`, there is no `<h1>` have to render.
 * 2. In `wide`, there is a semitransparent mask above image or video. In `premium`, there is no `<h1>` have to render.
 * 3. In `wide`, there is full-size block with gray background if no image and video is selected.  In `premium`, there is no have to render a full-size block.
 * 3. In `wide`, height of hero-image and hero-video are `100vh`. In `premium`, height are `66.vw`, and max-width is `1200px`, max-height is `800px`.
 * @param {Object} props
 * @param {'wide' | 'premium'} [props.style] - The style of the component, it will change the components style by assigning different value.
//  * @param {HeroImage | null} props.heroImage - The hero image data.
 * @param {HeroVideo | null} props.heroVideo - The hero video data.
 * @param {string} props.heroCaption - The caption for the hero image or video.
 * @param {string} [props.title] - The title of the article. Optional, only render if `props.style` is wide
 * @param {string} [props.subtitle] - The subtitle of the article
 * @returns {JSX.Element}
 */
export default function HeroImageAndVideo({
  // heroImage = null,
  heroVideo = null,
  heroCaption = '',
  title = '',
  style = 'wide',
  subtitle = '',
}) {
  //因專題特殊需求，希望不要載入太大照片，故先暫時改為寫死
  const heroImage = {
    imageFile: {
      width: 2000,
      height: 1333,
    },
    resized: {
      w480: 'https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4-w480.png',
      w800: 'https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4-w800.png',
      w1200: '',
      w1600:
        'https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4-w1600.png',
    },
    resizedWebp: {
      w480: 'https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4-w480.webP',
      w800: 'https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4-w800.webP',
      w1200: '',
      w1600:
        'https://v3-statics.mirrormedia.mg/images/22ad989e-5ad3-41d7-95cc-4e0b1f2c91d4-w1600.webP',
    },
  }

  const dispatch = useAppDispatch()
  const landingTopRef = useRef(null)
  const landingBottomRef = useRef(null)
  const shouldShowHeroVideo = Boolean(heroVideo)
  const shouldShowHeroImage = Boolean(!shouldShowHeroVideo && heroImage)

  const getHeroJsx = () => {
    if (shouldShowHeroVideo) {
      return (
        <Video
          preload="metadata"
          controlsList="nodownload"
          playsInline={true}
          autoPlay={true}
          muted={true}
          loop={true}
          poster={heroVideo?.heroImage?.resized?.original}
          src={heroVideo.videoSrc}
        />
      )
    } else if (shouldShowHeroImage) {
      return (
        <CustomImage
          images={heroImage.resized}
          imagesWebP={heroImage.resizedWebp}
          loadingImage={`${staticFileDestination}/wide-article/loading@4x.gif`}
          defaultImage={`${staticFileDestination}/wide-article/default-og-img.png`}
          alt={heroCaption ? heroCaption : title}
          objectFit={'cover'}
          width={'100%'}
          height={style === 'wide' ? '100vh' : '66.67vw'}
          rwd={{ mobile: '100vw', default: '100vw' }}
          priority={true}
        />
      )
    }
    return null
  }
  const heroJsx = getHeroJsx()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        const isIntersecting = entry.isIntersecting
        /**
         *  Since the landing page is at the first page in the screen,
         * we only care if the topRef is on the screen (only scroll up case)
         * and bottomRef is off the screen (only scroll down case).
         */
        if (id === 'landing-top' && isIntersecting) {
          dispatch(stickyNoteActions.changeShowStickyNotesPanel(false))
        } else if (id === 'landing-bottom' && !isIntersecting) {
          dispatch(stickyNoteActions.changeShowStickyNotesPanel(true))
        }
      })
    })
    if (landingTopRef.current) {
      observer.observe(landingTopRef.current)
    }
    if (landingBottomRef.current) {
      observer.observe(landingBottomRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [dispatch])

  return (
    <>
      <div id="landing-top" ref={landingTopRef} />
      {shouldShowHeroImage || shouldShowHeroVideo ? (
        <Figure isStyleWide={style === 'wide'}>
          {heroJsx}
          <div id="landing-bottom" ref={landingBottomRef} />
          {heroCaption ? <HeroCaption>{heroCaption}</HeroCaption> : null}
        </Figure>
      ) : (
        <>{style === 'wide' ? <Empty /> : null}</>
      )}
      {style === 'wide' && (title || subtitle) ? (
        <TitleWrapper>
          <ArticleTitle>{title}</ArticleTitle>
          <ArticleSubtitle>{subtitle}</ArticleSubtitle>
        </TitleWrapper>
      ) : null}
    </>
  )
}
