export const fixedStickyHeight = 110

// how many lines the sticky notes will render
export const rwdLines = {
  mobile: 2,
  tablet: 3,
  desktop: 5,
}

// how many notes to insert one empty note
export const rwdEmptyNotePerSection = {
  mobile: 10,
  tablet: 15,
  desktop: 25,
}

export const emptyStickyNote = {
  description: '',
  imageUrl: '',
  index: null,
  fixed: '',
}

export const stickyNoteColors = [
  { color: 'red', code: 'rgba(255, 140, 140, 1)' },
  { color: 'blue', code: 'rgba(39, 216, 255, 1)' },
  { color: 'yellow', code: 'rgba(255, 232, 28, 1)' },
  { color: 'green', code: 'rgba(109, 234, 98, 1)' },
  { color: 'orange', code: 'rgba(255, 178, 62, 1)' },
]

export const colorToAngle = {
  red: 1.5,
  blue: 2.1,
  yellow: -1.5,
  green: -3.09,
  orange: 0.5,
}

// decide the range of the rotate degree range ex: 5 deg -> range in -5 ~ 5 deg
export const cardRotateDegreeRange = 5
