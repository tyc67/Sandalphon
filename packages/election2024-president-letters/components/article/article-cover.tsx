import ArticleImage, { ImagesSrc } from '../shared/article-image'
import styled from 'styled-components'
import { font, color, breakpoint } from '../../styles/theme'
import SvgOpenLetterGreen from '../../public/icon/mail-open-green.svg'
import SvgOpenLetterBlue from '../../public/icon/mail-open-blue.svg'
import SvgOpenLetterWhite from '../../public/icon/mail-open-white.svg'
const { h1, h2, body2 } = font
const { text, candidates } = color

type ArticleCoverProps = {
  id: string
  title: string[]
  name: string
  imagesSrc: ImagesSrc
}
const Wrapper = styled.section`
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
  justify-content: space-between;
  background-color: white;
  padding: 40px 20px;
  position: relative;
  height: 60vh;
  overflow: hidden;
  svg {
    position: absolute;
    bottom: -16px;
    right: 0;
    transform: rotate(25deg) translate(-50%, -50%);
  }
  ${breakpoint.xl} {
    height: 450px;
    padding: 40px;
    justify-content: end;
    svg {
      bottom: 0;
      top: 25%;
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
const Title = styled.h1<{ candidateId: string }>`
  color: ${text.important};
  font-size: ${h1.size};
  line-height: ${h1.lineHeight};
  font-weight: ${h1.weight};
  span {
    display: block;
    width: fit-content;
  }
  .subtitle {
    font-size: ${h2.size};
    line-height: ${h2.lineHeight};
    font-weight: ${h2.weight};
    color: ${(props) =>
      candidates[props.candidateId as keyof typeof candidates].text};
    background-color: ${(props) =>
      candidates[props.candidateId as keyof typeof candidates].background};
  }
  ${breakpoint.xl} {
    height: 152px;
    margin-top: 116px;
    margin-bottom: 80px;
  }
`
const Desc = styled.div`
  p {
    font-size: ${body2.size};
    line-height: ${body2.lineHeight};
    font-weight: ${body2.weight};
    color: ${text.secondary};
    span {
      color: ${text.important};
    }
  }
`
export default function ArticleCover({
  id,
  title,
  name,
  imagesSrc,
}: ArticleCoverProps): JSX.Element {
  const getSvg = () => {
    switch (id) {
      case 'LaiChingTe':
        return <SvgOpenLetterGreen />
      case 'HouYuIh':
        return <SvgOpenLetterBlue />
      case 'KoWenJe':
        return <SvgOpenLetterWhite />
      default:
        return <SvgOpenLetterGreen />
    }
  }
  const decoratorSvg = getSvg()
  return (
    <Wrapper>
      <ArticleImage
        name={name}
        type="cover"
        imagesSrc={imagesSrc}
        isFullSizeImage={true}
      ></ArticleImage>
      <Bottom>
        <Title candidateId={id}>
          <span className="subtitle">給年輕人的一封信</span>

          {title.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </Title>
        <Desc>
          <p>
            From: <span>{name}</span>
          </p>
          <p>
            To: <span>You</span>
          </p>
        </Desc>
        {decoratorSvg}
      </Bottom>
    </Wrapper>
  )
}
