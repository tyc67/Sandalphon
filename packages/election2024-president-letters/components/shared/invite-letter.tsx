import styled from 'styled-components'
import Link from 'next/link'
import { color, font, breakpoint } from '../../styles/theme'
import LeftArrowSvg from '../../public/icon/left-arrow.svg'
import MailGreenSvg from '../../public/icon/mail-green.svg'
import MailBlueSvg from '../../public/icon/mail-blue.svg'
import MailWhiteSvg from '../../public/icon/mail-white.svg'
const { h5, body2 } = font
const { border, text, candidates } = color

const Wrapper = styled.section`
  padding: 16px 16px 4px 16px;
  border: 1px ${border} solid;
  background-color: white;
  position: relative;
  border-radius: 12px;
  width: 280px;
  margin: 0 auto 8px auto;
  ${breakpoint.xl} {
    max-width: 280px;
    min-width: 280px;
    margin: 0 0 0 0;
  }
  .decorator {
    position: absolute;

    &-lai-ching-te {
      top: -15.48px;
      left: 186px;
      transform: rotate(25deg);
    }
    &-hou-yu-ih {
      top: -15.48px;
      left: 22px;
      transform: rotate(-30deg);
    }
    &-ko-wen-je {
      top: -15.48px;
      left: 166px;
      transform: rotate(15deg);
    }
  }
  ${breakpoint.xl} {
    .decorator {
      position: absolute;

      &-lai-ching-te {
        top: -21.875px;
        left: 42px;
        transform: rotate(25deg);
      }
      &-hou-yu-ih {
        top: unset;
        bottom: -20px;
        left: 24px;
        transform: rotate(-30deg);
      }
      &-ko-wen-je {
        left: 166px;
        transform: rotate(-15deg);
      }
    }
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

    svg {
      margin-left: 6px;
      path {
        fill: ${(props) => props.textColor};
      }
    }
    &:hover {
      color: ${text.important};
      svg {
        path {
          fill: ${text.important};
        }
      }
    }
  }

  &:hover {
    color: ${text.important};
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
  const href = `/article/${id}`

  const getSvg = () => {
    switch (id) {
      case 'lai-ching-te':
        return <MailGreenSvg className={`decorator decorator-${id}`} />
      case 'hou-yu-ih':
        return <MailBlueSvg className={`decorator decorator-${id}`} />
      case 'ko-wen-je':
        return <MailWhiteSvg className={`decorator decorator-${id}`} />
      default:
        return <MailWhiteSvg className={`decorator decorator-${id}`} />
    }
  }
  const decoratorSvg = getSvg()

  return (
    <Wrapper>
      {decoratorSvg}
      <Top>
        <AvatarImage>
          <source srcSet={image.webP}></source>
          <img src={image.jpg} alt={name}></img>
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
