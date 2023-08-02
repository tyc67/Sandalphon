import styled from 'styled-components'
import Layout from '../components/shared/layout'
import { breakpoint, color } from '../styles/theme'
const { background } = color
import InviteLetter from '../components/shared/invite-letter'

const Title = styled.h1`
  font-size: 16px;
  ${breakpoint.md} {
    font-size: 30px;
  }
`
const CANDIDATES_CONFIG = [
  {
    id: 'LaiChingTe',
    name: '賴清德',
    letterDescription: ['關於台灣年輕人的未來', '我的觀察與主張'],
    letterAvatar: {
      jpg: '/images/profile/LaiChingTe.jpg',
      webP: '/images/profile/LaiChingTe.webP',
    },
  },
  {
    id: 'HouYuIh',
    name: '侯友宜',
    letterDescription: ['讓改變看得見'],
    letterAvatar: {
      jpg: '/images/profile/HouYuIh.jpg',
      webP: '/images/profile/HouYuIh.webP',
    },
  },
  {
    id: 'KoWenJe',
    name: '柯文哲',
    letterDescription: ['追求卓越 創造價值', '打造更好的台灣'],
    letterAvatar: {
      jpg: '/images/profile/KoWenJe.jpg',
      webP: '/images/profile/KoWenJe.webP',
    },
  },
]
const Main = styled.main`
  background-color: ${background.gray};
  min-height: 100vh;
  padding-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
`
export default function Home() {
  return (
    <>
      <Layout>
        <Main>
          <Title>Home</Title>
          {CANDIDATES_CONFIG.map((person) => (
            <InviteLetter
              key={person.id}
              id={person.id}
              name={person.name}
              description={person.letterDescription}
              image={person.letterAvatar}
            ></InviteLetter>
          ))}
        </Main>
      </Layout>
    </>
  )
}
