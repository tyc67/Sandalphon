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
import Related from '../components/shared/related'
import Credits from '../components/shared/credits'
import CustomHead from '../components/shared/head'
import { content } from '../constants/article/yao-jen-to'
import { getOGDescription } from '../utils'
const ogDesc = getOGDescription(content)
const Wrapper = styled.section`
  scroll-snap-align: start;
  background-color: ${background.gray};
  padding: calc(40px + ${headerHeight}) 20px 40px 20px;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    <>
      <CustomHead
        title={'盡力明白身邊的年輕人　賴清德、侯友宜、柯文哲寫給年輕人的信'}
        description={ogDesc}
        imageUrl="/images/og.jpg"
      />
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
        <Related
          renderCandidatesId={['lai-ching-te', 'hou-yu-ih', 'ko-wen-je']}
        ></Related>
        <Credits></Credits>
      </Main>
    </>
  )
}
