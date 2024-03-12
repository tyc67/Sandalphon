import { env } from '.'

export const fixedStickyHeight = 110

/**
 * how many lines the sticky notes will render
 * @typedef {Object} RwdLines
 * @property {number} mobile
 * @property {number} tablet
 * @property {number} desktop
 */
/** @type {RwdLines} */
export const rwdLines = {
  mobile: 2,
  tablet: 3,
  desktop: 5,
}

/**
 * how many notes to insert one empty note
 * @typedef {Object} RwdEmptyNotePerSection
 * @property {number} mobile
 * @property {number} tablet
 * @property {number} desktop
 */

/** @type {RwdEmptyNotePerSection} */
export const rwdEmptyNotePerSection = {
  mobile: 10,
  tablet: 15,
  desktop: 25,
}

/**
 * @typedef {import("../components/sticky-notes/StickyNote").StickyNote} StickyNote
 */
/** @type {StickyNote} */
export const emptyStickyNote = {
  description: '',
  imageUrl: '',
  fixed: '',
  type: 'empty',
  id: '',
  color: {
    color: '',
    code: '',
  },
  rotateAngle: '',
}

/**
 * @typedef {Object} StickyNoteColor
 * @property {string} color
 * @property {string} code
 */

/** @type {StickyNoteColor[]} */
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

export const googleSheetApiUrl =
  env === 'local'
    ? 'http://localhost:3000/api/googlesheet'
    : env === 'dev'
    ? 'https://dev.mirrormedia.mg/api/googlesheet'
    : 'https://www.mirrormedia.mg/api/googlesheet'

export const googleSheetId = '1YS35rZCU4AoyiPB9gH0hZ6_dtuvq_FbYVjk_bHFk2xA'
export const googleSheetTitle = env !== 'prod' ? 'postin-dev' : 'postin-prod'
