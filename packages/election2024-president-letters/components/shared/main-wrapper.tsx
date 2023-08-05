import styled from 'styled-components'

const MainWrapper = styled.main<{ shouldScrollSnap: boolean }>`
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  white-space: nowrap;
  scroll-snap-type: ${(props) =>
    props.shouldScrollSnap ? 'y mandatory' : 'none'};
`
type MainProps = {
  shouldScrollSnap: boolean
  children: React.ReactNode
}

export default function Main({
  shouldScrollSnap = false,
  children = null,
}: MainProps): JSX.Element {
  return (
    <MainWrapper shouldScrollSnap={shouldScrollSnap}>{children}</MainWrapper>
  )
}
