/**
 * @typedef {'reporter' | 'user'} RawNoteType
 *
 * @typedef {Object} RawStickyNote
 * @property {string} time
 * @property {string} id
 * @property {string} text
 * @property {string} image
 * @property {string} promote
 * @property {RawNoteType} type
 *
 * @typedef {Object} RawDataMeta
 * @property {number} total_pages
 * @property {string} next
 *
 * @typedef {Object} RawData
 * @property {RawDataMeta} meta
 * @property {RawStickyNote[]} sheet_data
 */

/**
 * @type {RawData}
 */
export const mockStickyNotes = {
  meta: {
    total_pages: 5,
    next: 'json/project_318_2.json',
  },
  sheet_data: [
    {
      time: '2024-03-11',
      id: '',
      text: '',
      image:
        'https://statics-readr-tw-prod.readr.tw/images/0f74045a-28f6-40f3-a563-a89bda8dea35.png',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-12',
      id: '',
      text: '',
      image:
        'https://statics-readr-tw-prod.readr.tw/images/e4b8c858-ccb8-4df7-b6e6-9ed2e1608aaf.png',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-13',
      id: '',
      text: '',
      image:
        'https://statics-readr-tw-prod.readr.tw/images/e0ff7980-38df-4dc9-91ea-3fd98da4639e.png',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-14',
      id: '',
      text: '',
      image:
        'https://statics-readr-tw-prod.readr.tw/images/f3921888-2af8-4993-8891-a41daab82672.png',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-11',
      id: '530a4add-cb8c-4263-b0d7-af920c963a27',
      text: '測試便利貼',
      image: '',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-11',
      id: '530a4add-cb8c-4263-b0d7-af920c963a27',
      text: '測試便利貼',
      image: '',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-11',
      id: '530a4add-cb8c-4263-b0d7-af920c963a27',
      text: '測試便利貼',
      image: '',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-11',
      id: '',
      text: '',
      image:
        'https://statics-readr-tw-prod.readr.tw/images/0f74045a-28f6-40f3-a563-a89bda8dea35.png',
      promote: '',
      type: 'reporter',
    },
    {
      time: '2024-03-12',
      id: '',
      text: '',
      image:
        'https://statics-readr-tw-prod.readr.tw/images/e4b8c858-ccb8-4df7-b6e6-9ed2e1608aaf.png',
      promote: '',
      type: 'reporter',
    },
  ],
}
