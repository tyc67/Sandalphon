import styled from 'styled-components'
import { color, font, breakpoint } from '../../styles/theme'
const { tiny2, body2 } = font
const { text } = color
const Figcaption = styled.figcaption`
  padding: 4px 20px;
  background-color: white;
  color: ${text.secondary};
  font-size: ${tiny2.size};
  line-height: ${tiny2.lineHeight};
  font-weight: ${tiny2.weight};
  text-align: center;
  ${breakpoint.md} {
    font-size: ${body2.size};
    line-height: ${body2.lineHeight};
    font-weight: ${body2.weight};
  }
`
type Props = {
  children: React.ReactNode
}
export default function ImageCaption({ children }: Props): JSX.Element {
  return <Figcaption>{children}</Figcaption>
}
