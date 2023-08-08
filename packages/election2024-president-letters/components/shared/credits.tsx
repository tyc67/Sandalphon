import styled from 'styled-components'
import { font, color, breakpoint } from '../../styles/theme'
const { body2 } = font
const { text } = color
const Wrapper = styled.section`
  scroll-snap-align: start;
  /* max-width: 400px; */
  margin: 0 auto;
  color: ${text.secondary};
  font-size: ${body2.size};
  line-height: ${body2.lineHeight};
  font-weight: ${body2.weight};
  padding: 20px 20px 80px;
  text-align: center;
  white-space: initial;
  ${breakpoint.md} {
    padding: 40px 40px 80px;
  }
`
export default function Credits() {
  return (
    <Wrapper>
      網頁製作：傅典洋、陳柏維、蔡尚真、呂昱辰、吳曼努、張蘊方、李又如、簡信昌
    </Wrapper>
  )
}
