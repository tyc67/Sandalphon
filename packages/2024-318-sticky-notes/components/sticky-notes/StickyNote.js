import { useRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 136px;
  height: 136px;
  border-radius: 4px;
  pointer-events: auto;
  ${({ bgColor }) =>
    bgColor &&
    `
  background-color: ${bgColor};
  `}
  transform: rotate(${({ rotateDegree }) => {
    return rotateDegree ? rotateDegree : 0
  }}deg);
`

export default function StickeyNote({ stickyNote }) {
  const id = 'id-' + stickyNote.index + stickyNote.description
  const wrapperRef = useRef()

  return (
    <Wrapper
      ref={wrapperRef}
      id={id}
      bgColor={stickyNote.bgColor.code}
      rotateDegree={stickyNote.rotateAngle}
    ></Wrapper>
  )
}
