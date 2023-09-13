import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import RowMotion from '~/components/schedule/row-motion'
import type { ScheduleItem } from '~/types'

const Wrapper = styled.div`
  ${defaultBlockStyle}
  padding: 30px 0px;
  max-width: none;

  ${breakpoint.md} {
    padding: 30px 0px;
  }

  ${breakpoint.xl} {
    max-width: none;
  }
`

const RowContainer = styled.div`
  width: 100%;
  padding: 20px 0px;
  overflow: hidden;

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

type ScheduleProps = {
  content: ScheduleItem[]
}
export default function Schedule({ content = [] }: ScheduleProps): JSX.Element {
  return (
    <Wrapper>
      <h1>論壇議程</h1>
      <RowContainer>
        {content.map((item, index) => {
          return <RowMotion order={`${index + 1}`} content={item} key={index} />
        })}
      </RowContainer>
    </Wrapper>
  )
}
