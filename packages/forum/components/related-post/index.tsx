import React from 'react'
import styled, { css } from 'styled-components'
import SlideItem from '~/components/related-post/slide-item'
import { breakpoint, zIndex } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import ArrowRight from '~/public/icon/carousel-arrow-right.svg'
import ArrowLeft from '~/public/icon/carousel-arrow-left.svg'
import type { GenericRelatedPost } from '~/types'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// import required modules
import { Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const arrowSharedStyle = css<{ postLength: number }>`
  display: none;

  ${breakpoint.md} {
    cursor: pointer;
    z-index: ${zIndex.coverContent};
    position: absolute;
    width: 40px;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    align-items: center;
    display: ${(props) => (props.postLength > 2 ? 'flex' : 'none')};
  }

  ${breakpoint.xl} {
    display: ${(props) => (props.postLength > 4 ? 'flex' : 'none')};
  }
`

const Wrapper = styled.div`
  ${defaultBlockStyle}
  padding: 30px 0px 30px 20px;
  max-width: none;
`

const SwiperGroup = styled.div<{ postLength: number }>`
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
      height: 275px;
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

type RelatedPostProps = {
  // relatedPosts: GenericRelatedPost[] //k6
  relatedPosts: any //k3
}
export default function RelatedPost({
  relatedPosts = [],
}: RelatedPostProps): JSX.Element {
  const postLength = relatedPosts?.length

  return (
    <Wrapper id="related-post">
      <h1>相關報導</h1>
      <SwiperGroup postLength={postLength}>
        <div className="custom-swiper-prev swiper-arrow">
          <ArrowLeft />
        </div>

        <Swiper
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          breakpoints={{
            768: {
              slidesPerGroup: 2, // when screen width >= 768px
            },
            1200: {
              slidesPerGroup: 4, // when screen width >= 1200px
            },
          }}
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          slidesPerView={'auto'}
          spaceBetween={20}
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
          <ArrowRight />
        </div>
      </SwiperGroup>
    </Wrapper>
  )
}
