import DonateLink from './donate-link'
import SubscribeLink from './subscribe-link'
import styled from 'styled-components'
import { breakpoint } from '../../styles/theme'
const Wrapper = styled.div`
  display: flex;
  margin: 20px auto;
  justify-content: center;
  ${breakpoint.xl} {
    margin: 40px 0;
  }
`
export default function DonateAndSubscribe() {
  return (
    <Wrapper>
      <DonateLink></DonateLink>
      <SubscribeLink></SubscribeLink>
    </Wrapper>
  )
}
