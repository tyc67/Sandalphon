import { css } from 'styled-components'
import { font, breakpoint } from './theme'
const { body, h4 } = font
const headerHeight = '48px'
const textFont = css`
  font-size: ${body.size};
  line-height: ${body.lineHeight};
  font-weight: ${body.weight};
  ${breakpoint.md} {
    font-size: ${h4.size};
    line-height: ${h4.lineHeight};
    font-weight: ${h4.weight};
  }
`
export { headerHeight, textFont }
