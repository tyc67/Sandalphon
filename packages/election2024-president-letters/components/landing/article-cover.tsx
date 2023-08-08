import styled from 'styled-components'
import CoverImage from '../shared/article-image'
import { font, color, breakpoint } from '../../styles/theme'
import { imagePrefix } from '../../config'
import { CANDIDATES } from '../../constants'
import SVGMailOpenGray from '../../public/icon/mail-open-gray.svg'
import { headerHeight } from '../../styles/shared-style'
const { h1, h2, body2 } = font

const { text, candidates } = color
const YAO_JAO_TO_COVER_IMAGE = {
  desktop: `${imagePrefix}/images/article/yao-jen-to/1-desktop.jpeg`,
  tablet: `${imagePrefix}/images/article/yao-jen-to/1-tablet.jpeg`,
  mobile: `${imagePrefix}/images/article/yao-jen-to/1-mobile.jpeg`,
  desktopWebP: `${imagePrefix}/images/article/yao-jen-to/1-desktop.webp`,
  tabletWebP: `${imagePrefix}/images/article/yao-jen-to/1-tablet.webp`,
  mobileWebP: `${imagePrefix}/images/article/yao-jen-to/1-mobile.webp`,
}
const Wrapper = styled.section`
  position: relative;
  scroll-snap-align: start;
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  ${breakpoint.xl} {
    flex-direction: row-reverse;
    align-items: center;
  }
`
const Bottom = styled.section`
  display: flex;

  flex-direction: column;
  justify-content: start;
  background-color: white;
  padding: 60px 20px 40px;
  position: relative;

  height: calc(60vh - ${headerHeight});
  overflow: hidden;
  svg {
    position: absolute;
    top: 230px;
    right: 10px;
    transform: rotate(25deg) translate(-50%, -50%);
  }
  ${breakpoint.xl} {
    height: 450px;
    padding: 40px;
    justify-content: end;
    svg {
      bottom: 0;
      top: 20%;
      left: 60px;
      transform: rotate(0deg) translate(-50%, -50%);
    }
  }
  ${breakpoint.xxl} {
    padding: 40px 120px;
    svg {
      left: 140px;
    }
  }
`
const Title = styled.h1`
  color: ${text.important};
  font-size: ${h2.size};
  line-height: ${h2.lineHeight};
  font-weight: ${h2.weight};
  ${breakpoint.xl} {
    margin-bottom: 80px;
  }
  ${breakpoint.md} {
    font-size: ${h1.size};
    line-height: ${h1.lineHeight};
    font-weight: ${h1.weight};
  }
`
const CandidatesName = styled.span<{ candidateId: string }>`
  margin-right: 8px;
  color: ${(props) =>
    candidates[props.candidateId as keyof typeof candidates].text};
  background-color: ${(props) =>
    candidates[props.candidateId as keyof typeof candidates].background};
`

const Description = styled.p`
  margin-top: 20px;
  .author {
    font-size: ${body2.size};
    line-height: ${body2.lineHeight};
    font-weight: ${body2.weight};
    color: ${text.important};
    &--second-color {
      color: ${text.secondary};
    }
  }
  ${breakpoint.xl} {
    margin-top: unset;
  }
`

export default function ArticleCover() {
  return (
    <Wrapper>
      <CoverImage
        type="cover"
        name="姚人多"
        imagesSrc={YAO_JAO_TO_COVER_IMAGE}
        isFullSizeImage={true}
      />
      <Bottom>
        <Title>
          <span>盡力明白身邊的年輕人</span>
          <br />
          {CANDIDATES.map((candidate) => (
            <CandidatesName key={candidate.id} candidateId={candidate.id}>
              {candidate.name}
            </CandidatesName>
          ))}
          <br />
          <span>寫給年輕人的信</span>
        </Title>
        <Description>
          <span className="author">撰文——姚人多</span>
          <br />
          <span className="author author--second-color">
            前《鏡週刊》特約總主筆
          </span>
          <br />
          <span className="author author--second-color">
            清華大學人文社會學院學士班主任
          </span>
        </Description>
        <SVGMailOpenGray />
      </Bottom>
    </Wrapper>
  )
}
