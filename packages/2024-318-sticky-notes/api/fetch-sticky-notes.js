import axios from '~/axios'

/**
 * @typedef {import('~/data/mockData').RawData} RawData
 */

/**
 * @returns {Promise<RawData>}
 */
export const fetchStickyNotesAtPage = async (page) => {
  try {
    const response = await axios.get(
      `https://v3-statics-dev.mirrormedia.mg/json/project_318_${page}.json`
    )
    /** @type {import('~/data/mockData').RawData} */
    const rawData = response.data
    return rawData
  } catch (error) {
    console.error(error)
  }
}
