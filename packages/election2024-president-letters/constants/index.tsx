const CANDIDATES = [
  { id: 'LaiChingTe', name: '賴清德' },
  { id: 'HouYuIh', name: '侯友宜' },
  { id: 'KoWenJe', name: '柯文哲' },
]

const LAI_CHING_TE_LETTER = {
  id: 'LaiChingTe',
  name: '賴清德',
  letterDescription: ['關於台灣年輕人的未來', '我的觀察與主張'],
  letterAvatar: {
    jpg: '/images/profile/LaiChingTe.jpg',
    webP: '/images/profile/LaiChingTe.webP',
  },
}
const HOU_YU_IH_LETTER = {
  id: 'HouYuIh',
  name: '侯友宜',
  letterDescription: ['讓改變看得見'],
  letterAvatar: {
    jpg: '/images/profile/HouYuIh.jpg',
    webP: '/images/profile/HouYuIh.webP',
  },
}

const KO_WEN_JE_LETTER = {
  id: 'KoWenJe',
  name: '柯文哲',
  letterDescription: ['追求卓越 創造價值', '打造更好的台灣'],
  letterAvatar: {
    jpg: '/images/profile/KoWenJe.jpg',
    webP: '/images/profile/KoWenJe.webP',
  },
}
const CANDIDATES_LETTER = [
  LAI_CHING_TE_LETTER,
  HOU_YU_IH_LETTER,
  KO_WEN_JE_LETTER,
]

export {
  CANDIDATES,
  CANDIDATES_LETTER,
  LAI_CHING_TE_LETTER,
  HOU_YU_IH_LETTER,
  KO_WEN_JE_LETTER,
}
