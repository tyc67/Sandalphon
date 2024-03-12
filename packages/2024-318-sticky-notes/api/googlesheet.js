import axios from '../axios'
import {
  googleSheetApiUrl,
  googleSheetId,
  googleSheetTitle,
} from '../const/sticky-notes'

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
