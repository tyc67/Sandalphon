import styled from 'styled-components'
import ButtonCopyLink from './button-copy-link'
import ButtonSocialNetworkShare from './button-social-network-share'
import { breakpoint } from '../../styles/theme'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${breakpoint.xl} {
    width: 160px;
    margin-left: 0;
    margin-right: 40px;
    &::after {
      position: absolute;
      width: 1px;
      height: 16px;
      right: -20px;
      content: '';
      background-color: rgba(161, 161, 161, 1);
    }
  }
`
export default function ShareAndCopyLink() {
  return (
    <Wrapper>
      <ButtonSocialNetworkShare type={'facebook'}></ButtonSocialNetworkShare>
      <ButtonSocialNetworkShare type={'line'}></ButtonSocialNetworkShare>
      <ButtonCopyLink></ButtonCopyLink>
    </Wrapper>
  )
}
