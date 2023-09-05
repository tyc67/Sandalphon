import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from '~/components/shared/content-block'
// import { imagePrefix } from '~/constants/environment-variables'
// import Image from 'next/image'
//FIXME: 研究一下 image-loader，改用 next/image

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const SpeakerLists = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 50px;
`

const SpeakerItem = styled.div`
  width: 100%;
  max-width: 200px;
  margin-bottom: 25px;
`

const HeadPhoto = styled.div`
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #d9d9d9;
  object-fit: cover;
  object-position: center;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
`

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin: 40px auto;
  line-height: 1.6;
`

const Description = styled(ContentBlock)`
  line-height: 1.8;
  text-align: left;
`

type Speaker = {
  name: string
  order: string
  image: string
  description: string
}

type SpeakersProps = {
  speakers: Speaker[]
}

export default function Speakers({
  speakers = [],
}: SpeakersProps): JSX.Element {
  const speakerLists = speakers.map((speaker: Speaker) => {
    return (
      <SpeakerItem key={speaker.name}>
        <HeadPhoto>
          <img
            src={speaker.image}
            alt={speaker.name}
            // width="200"
            // height="200"
            // onError={(e) => {
            //   console.log('有 error')
            //   e.currentTarget.src = { defaultHeadPhoto }
            // }}
          />
        </HeadPhoto>
        <Title>{speaker.name}</Title>

        <Description content={speaker.description} />
      </SpeakerItem>
    )
  })

  return (
    <Wrapper>
      <h1>與會陣容</h1>
      <SpeakerLists>{speakerLists}</SpeakerLists>
    </Wrapper>
  )
}
