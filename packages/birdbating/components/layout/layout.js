import styled from 'styled-components'
import Header from './header'

const Container = styled.div``

const Main = styled.div`
  width: 100%;
`

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  )
}
