import React from 'react'
import styled, { css } from 'styled-components'
import SlideItem from '~/components/related-post/slide-item'
import { breakpoint, zIndex } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import { imagePrefix } from '~/config'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import required modules
import { Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const arrowSharedStyle = css`
  display: none;

  ${breakpoint.md} {
    display: block;
    cursor: pointer;
    z-index: ${zIndex.coverContent};
    position: absolute;
    width: 40px;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
`

const Wrapper = styled.div`
  ${defaultBlockStyle}
  padding: 30px 0px 30px 20px;
  max-width: none;
`

const SwiperGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: 100%;
  position: relative;

  ${breakpoint.md} {
    max-width: 545px;
  }
  ${breakpoint.xl} {
    max-width: 1035px;
  }

  //includes: .swiper-wrapper, .swiper-button, .swiper-pagination
  .swiper {
    width: 100%;
    height: 100%;

    ${breakpoint.md} {
      max-width: 452px;
    }
    ${breakpoint.xl} {
      max-width: 920px;
    }
  }

  //single slide style
  .swiper-slide {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 200px;
    margin-right: 20px;

    ${breakpoint.md} {
      width: 216px;
      height: 300px;
      margin: 0px;
    }
  }

  //swiper button
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  .custom-swiper-prev {
    ${arrowSharedStyle}
    left: 0px;
    justify-content: left;
  }
  .custom-swiper-next {
    ${arrowSharedStyle}
    right: 0px;
    justify-content: right;
  }

  //swiper pagination
  .swiper-pagination {
    display: none;
  }
`

// FIXME: posts 數量如果很少的 error handle
// FIXME: 手機版滑單張間隔的問題

type ResizedImage = {
  original: string
  w480: string
  w800: string
  w1200: string
  w1600: string
  w2400: string
}
type HeroImage = {
  resized: ResizedImage
  resizedWebp: ResizedImage
}

export type GenericRelatedPost = {
  id: string
  updatedAt: string
  slug: string
  publishedDate: string
  state: string
  title: string
  heroImage: HeroImage | null
  url: string
}

type RelatedPostProps = {
  relatedPosts: GenericRelatedPost[]
}
export default function RelatedPost({
  relatedPosts = [],
}: RelatedPostProps): JSX.Element {
  return (
    <Wrapper id="">
      <h1>相關報導</h1>
      <SwiperGroup>
        <div className="custom-swiper-prev swiper-arrow">
          <img
            src={`${imagePrefix}/icon/carousel-arrow-left.svg`}
            alt="carousel-arrow-left"
          />
        </div>

        <Swiper
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          breakpoints={{
            768: {
              slidesPerView: 2, // when screen width >= 768px
            },
            1200: {
              slidesPerView: 4, // when screen width >= 1200px
            },
          }}
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          slidesPerView={'auto'}
          spaceBetween={20}
          slidesPerGroup={1}
          loop={true}
          modules={[Pagination, Navigation]}
          navigation={{
            prevEl: '.custom-swiper-prev',
            nextEl: '.custom-swiper-next',
          }}
          pagination={{
            clickable: true,
          }}
        >
          {relatedPosts?.map((item: GenericRelatedPost) => {
            return (
              <SwiperSlide key={item.id}>
                <SlideItem post={item} />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="custom-swiper-next swiper-arrow">
          <img
            src={`${imagePrefix}/icon/carousel-arrow-right.svg`}
            alt="carousel-arrow-right"
          />
        </div>
      </SwiperGroup>
    </Wrapper>
  )
}
