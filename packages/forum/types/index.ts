export type Speaker = {
  name: string
  title: string[]
}
export type RowSpeakerItem = {
  type: string
  speakers: Speaker[]
}

export type ScheduleItem = {
  topic: string
  time: string
  speakersInfo: string
  instruction: string
}
