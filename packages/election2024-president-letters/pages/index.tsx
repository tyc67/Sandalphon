import styled from 'styled-components'
import { color, breakpoint } from '../styles/theme'
const { background } = color
import InviteLetter from '../components/shared/invite-letter'
import ArticleYaoJeoTo from '../components/landing/article-yao-jen-to'
import { CANDIDATES_LETTER } from '../constants'
import Main from '../components/shared/main-wrapper'
import Detector from '../components/shared/detector'
import { headerHeight } from '../styles/shared-style'
import Landing from '../components/landing/landing'
const Wrapper = styled.section`
  scroll-snap-align: start;
  background-color: ${background.gray};
  padding: calc(40px + ${headerHeight}) 20px 40px 20px;
  margin: 0 auto;
  ${breakpoint.xl} {
    padding: calc(40px + ${headerHeight}) 40px 40px 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
`
export default function Home() {
  const { state, component } = Detector()
  return (
    <Main shouldScrollSnap={state}>
      <Landing />
      <Wrapper>
        {CANDIDATES_LETTER.map((person) => (
          <InviteLetter
            key={person.id}
            id={person.id}
            name={person.name}
            description={person.letterDescription}
            image={person.letterAvatar}
          ></InviteLetter>
        ))}
      </Wrapper>
      <ArticleYaoJeoTo
        detector={component}
        shouldActiveParallaxScrolling={!state}
      />
    </Main>
  )
}
