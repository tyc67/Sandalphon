import styled from 'styled-components'
import Link from 'next/link'
import MirrorMediaIcon from '../../public/icon/mirror-media.svg'
import { zIndex } from '../../styles/z-index'
const HeaderWrapper = styled.header`
  background-color: white;
  display: flex;
  padding: 8px 12px;
  position: fixed;
  top: 0;
  z-index: ${zIndex.header};
  width: 100%;
`
export default function Header() {
  return (
    <HeaderWrapper>
      <Link href="https://www.mirrormedia.mg/">
        <MirrorMediaIcon />
      </Link>
    </HeaderWrapper>
  )
}
