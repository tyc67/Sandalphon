import { imagePrefix } from '../config'

const CANDIDATES = [
  { id: 'lai-ching-te', name: '賴清德' },
  { id: 'hou-yu-ih', name: '侯友宜' },
  { id: 'ko-wen-je', name: '柯文哲' },
]

const LAI_CHING_TE_LETTER = {
  id: 'lai-ching-te',
  name: '賴清德',
  letterDescription: ['關於台灣年輕人的未來', '我的觀察與主張'],
  letterAvatar: {
    jpg: `${imagePrefix}/images/profile/lai-ching-te.jpg`,
    webP: `${imagePrefix}/images/profile/lai-ching-te.webp`,
  },
}
const HOU_YU_IH_LETTER = {
  id: 'hou-yu-ih',
  name: '侯友宜',
  letterDescription: ['讓改變看得見'],
  letterAvatar: {
    jpg: `${imagePrefix}/images/profile/hou-yu-ih.jpg`,
    webP: `${imagePrefix}/images/profile/hou-yu-ih.webp`,
  },
}

const KO_WEN_JE_LETTER = {
  id: 'ko-wen-je',
  name: '柯文哲',
  letterDescription: ['追求卓越 創造價值', '打造更好的台灣'],
  letterAvatar: {
    jpg: `${imagePrefix}/images/profile/ko-wen-je.jpg`,
    webP: `${imagePrefix}/images/profile/ko-wen-je.webp`,
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
