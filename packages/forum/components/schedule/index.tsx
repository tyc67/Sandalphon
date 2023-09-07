import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import RowMotion from '~/components/schedule/row-motion'

const Wrapper = styled.div`
  ${defaultBlockStyle}
  padding: 30px 0px;
  max-width: none;

  ${breakpoint.md} {
    padding: 30px 0px;
  }
`

const RowContainer = styled.div`
  width: 100%;

  .row-motion:nth-child(even) {
    background: #e2fbfe;
    border-radius: 20px 0px 0px 20px;
    margin-left: auto;
  }

  .row-motion:nth-child(odd) {
    background: #ffffff;
    border-radius: 0px 20px 20px 0px;
    margin-right: auto;
  }
`
export default function Schedule(): JSX.Element {
  return (
    <Wrapper>
      <h1>論壇議程</h1>
      <RowContainer>
        <RowMotion order="1" />
        <RowMotion order="2" />
        <RowMotion order="3" />
        <RowMotion order="4" />
      </RowContainer>
    </Wrapper>
  )
}
