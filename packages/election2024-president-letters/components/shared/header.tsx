import styled from 'styled-components'
import Link from 'next/link'
import MirrorMediaIcon from '../../public/icon/mirror-media.svg'
import { color, font } from '../../styles/theme'
const { text, border } = color
const { tiny } = font
import EmojiCloseIcon from '../../public/icon/emoji-close.svg'
// import EmojiOpenIcon from '../../public/icon/emoji-open.svg'
import { zIndex } from '../../styles/z-index'
const HeaderWrapper = styled.header`
  background-color: white;
  display: flex;
  padding: 8px 12px;
  position: fixed;
  justify-content: space-between;
  top: 0;
  z-index: ${zIndex.header};
  width: 100%;
`
const ButtonHideOrShowEmoji = styled.button`
  font-size: ${tiny.size};
  line-height: ${tiny.lineHeight};
  font-weight: ${tiny.weight};
  padding: 4px 8px;
  color: ${text.secondary};
  border: 1px solid ${border};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    margin-right: 4px;
  }
  &:hover {
    color: ${text.important};
    svg {
      path {
        fill-opacity: 1;
      }
    }
  }
`
export default function Header() {
  return (
    <HeaderWrapper>
      <Link href="https://www.mirrormedia.mg/">
        <MirrorMediaIcon />
      </Link>
      <ButtonHideOrShowEmoji>
        <EmojiCloseIcon />
        隱藏心情
      </ButtonHideOrShowEmoji>
    </HeaderWrapper>
  )
}
