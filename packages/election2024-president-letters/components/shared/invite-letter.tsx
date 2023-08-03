import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { color, font, breakpoint } from '../../styles/theme'
import LeftArrowSvg from '../../public/icon/left-arrow.svg'
const { h5, body2 } = font
const { border, text, candidates } = color

const CANDIDATES_ID_PATH_MAPPING = {
  LaiChingTe: 'lai-ching-te',
  HouYuIh: 'hou-yu-ih',
  KoWenJe: 'ko-wen-je',
}
const Wrapper = styled.section`
  padding: 16px 16px 4px 16px;
  border: 1px ${border} solid;
  background-color: white;

  border-radius: 12px;
  max-width: 280px;
  margin: 0 auto 8px auto;
  ${breakpoint.xl} {
    max-width: 280px;
    min-width: 280px;
    margin: 0 0 0 0;
  }
`
const Top = styled.div`
  display: flex;
  margin-bottom: 12px;
`

const AvatarImage = styled.picture`
  position: relative;
  display: block;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  max-height: 64px;
  height: 64px;
  margin-right: 16px;

  img {
    border-radius: 50%;
    border: 1px ${border} solid;
    object-fit: cover;
  }
`
const Detail = styled.div`
  width: 100%;
  .name {
    margin: 0 auto;
    font-size: ${h5.size};
    font-weight: ${h5.weight};
    line-height: ${h5.lineHeight};
    color: ${text.important};
    position: relative;
    &::after {
      position: absolute;
      right: 0;
      content: '剛剛';
      font-size: ${body2.size};
      font-weight: ${body2.weight};
      line-height: ${body2.lineHeight};
      color: ${text.hint};
    }
  }
  .desc {
    margin: 0 auto;
    font-size: ${body2.size};
    font-weight: ${body2.weight};
    line-height: ${body2.lineHeight};
    color: ${text.secondary};
  }
`

const Bottom = styled.button<{ textColor: string }>`
  margin: 0 auto;
  width: 100%;
  background-color: transparent;
  border: unset;
  border-top: 1px solid ${border};
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  color: ${(props) => props.textColor};
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    margin-left: 6px;
    path {
      fill: ${(props) => props.textColor};
    }
  }
`
type InviteLetterProp = {
  id: string
  name: string
  description: string[]
  image: { jpg: string; webP: string }
}

export default function InviteLetter({
  id,
  name,
  description,
  image,
}: InviteLetterProp): JSX.Element {
  const href = `/article/${
    CANDIDATES_ID_PATH_MAPPING[id as keyof typeof CANDIDATES_ID_PATH_MAPPING]
  }`

  return (
    <Wrapper>
      <Top>
        <AvatarImage>
          <source srcSet={image.webP}></source>
          <Image src={image.jpg} fill alt={name}></Image>
        </AvatarImage>
        <Detail>
          <p className="name">{name}</p>
          {description.map((item, index) => (
            <p className="desc" key={index}>
              {item}
            </p>
          ))}
        </Detail>
      </Top>
      <Bottom textColor={candidates[id as keyof typeof candidates].text}>
        <Link href={href}>
          <span>開啟信件</span>
          <LeftArrowSvg />
        </Link>
      </Bottom>
    </Wrapper>
  )
}
