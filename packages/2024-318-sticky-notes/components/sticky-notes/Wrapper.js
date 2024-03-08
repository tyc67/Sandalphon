import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 136px;
  height: 136px;
  border-radius: 4px;
  background: rgba(255, 140, 140, 1);
  ${({ bgColor }) =>
    bgColor &&
    `
    background-color: ${bgColor};
  `}
  ${({ rotateDegree }) => {
    console.log(rotateDegree)
    return (
      rotateDegree &&
      `
    transform: rotate(${rotateDegree}deg);
  `
    )
  }}
`
