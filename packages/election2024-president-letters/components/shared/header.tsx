import styled from 'styled-components'
import Link from 'next/link'
import MirrorMediaIcon from '../../public/icon/mirror-media.svg'
const HeaderWrapper = styled.header`
  background-color: white;
  display: flex;
  padding: 8px 12px;
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
