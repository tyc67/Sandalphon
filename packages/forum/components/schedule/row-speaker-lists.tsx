import React from 'react'
import styled from 'styled-components'
import SpeakerItem from '~/components/schedule/row-speaker-item'
import type { Speaker, RowSpeakerItem } from '~/types'

const SpeakersWrapper = styled.div`
  max-width: 300px;
`

const TypeGroup = styled.div`
  & + * {
    margin-top: 20px;
  }
`
const SpeakerType = styled.div`
  color: #b3b3b3;
  margin-bottom: 8px;
  font-size: 14px;
`

type SpeakersProps = {
  speakers: Speaker[]
}
const Speakers: React.FC<SpeakersProps> = ({ speakers }) => {
  return (
    <>
      {speakers.map((item) => (
        <SpeakerItem name={item.name} titles={item.title} key={item.name} />
      ))}
    </>
  )
}

type RowSpeakerProps = {
  speakerLists: RowSpeakerItem[]
}
export default function RowSpeakerLists({
  speakerLists,
}: RowSpeakerProps): JSX.Element {
  return (
    <SpeakersWrapper>
      {speakerLists.map((item, index) => {
        return (
          <TypeGroup key={index}>
            {item.type && <SpeakerType>{item.type}</SpeakerType>}
            <Speakers speakers={item.speakers} />
          </TypeGroup>
        )
      })}
    </SpeakersWrapper>
  )
}
