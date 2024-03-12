import axios from '../axios'
import {
  cardRotateDegreeRange,
  googleSheetApiUrl,
  googleSheetId,
  googleSheetTitle,
  stickyNoteColors,
} from '../const/sticky-notes'

/**
 * @typedef {import('../const/sticky-notes').StickyNoteColor} StickyNoteColor
 *
 * @returns {StickyNoteColor}
 */
export const genRandomCardColor = () => {
  const randomIndex = Math.floor(Math.random() * stickyNoteColors.length)
  return stickyNoteColors[randomIndex]
}

/**
 * Genereate css transform rotate angle in -5 ~ 5 degree
 * @returns {string}
 */
export const genRandomCardRotateAngle = () => {
  return (Math.random() * 10 - cardRotateDegreeRange).toFixed(2)
}

/**
 * @typedef {Object} GoogleSheetParamRow
 * @property {string} id
 * @property {string} time
 * @property {string} text
 * @property {string} image
 * @property {string} promote
 * @property {string} type
 *
 * @typedef {Object} GoogleSheetParam
 * @property {string} id
 * @property {string} title
 * @property {GoogleSheetParamRow} row
 *
 * @param {GoogleSheetParamRow} row
 */
export async function insertNewRowToSheet(row) {
  /** @type {GoogleSheetParam} */
  const googleSheetParam = {
    id: googleSheetId,
    title: googleSheetTitle,
    row,
  }
  return axios.post(googleSheetApiUrl, { googleSheet: googleSheetParam })
}
