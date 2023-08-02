import styled from 'styled-components'
import CoverImage from '../shared/article-image'
import { font, color } from '../../styles/theme'
import { CANDIDATES } from '../../constants'
const { h2, body2 } = font
const { text, candidates } = color
const YAO_JAO_TO_COVER_IMAGE = {
  desktop: '/images/article/yao/1-desktop.jpeg',
  tablet: '/images/article/yao/1-tablet.jpeg',
  mobile: '/images/article/yao/1-mobile.jpeg',
  desktopWebP: '/images/article/yao/1-desktop.webp',
  tabletWebP: '/images/article/yao/1-tablet.webp',
  mobileWebP: '/images/article/yao/1-mobile.webp',
}

const Bottom = styled.section`
  background-color: white;
  padding: 40px 20px;
`
const Title = styled.h2`
  color: ${text.important};
  font-size: ${h2.size};
  line-height: ${h2.lineHeight};
  font-weight: ${h2.weight};
`
const CandidatesName = styled.span<{ candidateId: string }>`
  margin-right: 8px;
  color: ${(props) =>
    candidates[props.candidateId as keyof typeof candidates].text};
  background-color: ${(props) =>
    candidates[props.candidateId as keyof typeof candidates].background};
`

const Description = styled.p`
  margin-top: 73px;
  .author {
    font-size: ${body2.size};
    line-height: ${body2.lineHeight};
    font-weight: ${body2.weight};
    color: ${text.important};
    &--second-color {
      color: ${text.secondary};
    }
  }
`

export default function ArticleCover() {
  return (
    <>
      <CoverImage
        type="cover"
        name="姚人多"
        imagesSrc={YAO_JAO_TO_COVER_IMAGE}
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
      </Bottom>
    </>
  )
}
