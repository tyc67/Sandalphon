import { css } from 'styled-components'
import { breakpoint } from './theme'

export const defaultBlockStyle = css`
  width: 100%;
  max-width: 960px;
  margin: auto;
  padding: 30px 20px;

  ${breakpoint.md} {
    padding: 30px 60px;
  }
  ${breakpoint.xl} {
    padding: 30px 0px;
  }

  h1 {
    font-size: 32px;
    line-height: 1.8;
    font-weight: 900;
    text-align: center;
    margin: 20px auto;

    ${breakpoint.md} {
      font-size: 30px;
    }

    ${breakpoint.xl} {
      margin: 40px auto;
    }
  }

  .shared-content-block {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
    text-align: justify;
    word-break: break-all;

    ${breakpoint.md} {
      font-size: 20px;
    }
    ${breakpoint.xl} {
      font-size: 18px;
    }
  }
`
