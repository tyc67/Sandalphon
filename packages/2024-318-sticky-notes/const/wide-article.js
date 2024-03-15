import { env, projectName } from '.'

let SITE_URL = ''
let READR_URL = ''
let POST_JSON = ''
let staticFileDestination = ''

switch (env) {
  case 'dev':
    SITE_URL = 'https://dev-next.mirrormedia.mg'
    READR_URL = 'https://v3-dev.readr.tw'
    POST_JSON =
      'https://storage.googleapis.com/v3-statics-dev.mirrormedia.mg/files/json/318_story.json'
    staticFileDestination = `https://www.mirrormedia.mg/projects/${projectName}`
    break

  case 'prod': {
    SITE_URL = 'https://www.mirrormedia.mg'
    READR_URL = 'https://www.readr.tw'
    POST_JSON = 'https://v3-statics.mirrormedia.mg/files/json/318_story.json'
    staticFileDestination = `https://www.mirrormedia.mg/projects/${projectName}`
    break
  }
  default: {
    SITE_URL = 'https://dev-next.mirrormedia.mg'
    READR_URL = 'https://v3-dev.readr.tw'
    POST_JSON =
      'https://storage.googleapis.com/v3-statics-dev.mirrormedia.mg/files/json/318_story.json'
    staticFileDestination = `http://localhost:3000`
    break
  }
}

const creditsFor318 = [
  {
    id: 'author',
    title: '撰文',
    name: '陳虹瑾、李振豪、陳昌遠、曾芷筠、蔣宜婷、陳珮瑜',
  },
  {
    id: 'cover-photography',
    title: '封面攝影',
    name: '張乾琦/馬格蘭通訊社',
  },
  {
    id: 'photographer',
    title: '攝影',
    name: '杭大鵬、王漢順、鄒保祥',
  },
  {
    id: 'history-photography',
    title: '歷史照片攝影',
    name: '杭大鵬、余志偉、高偉格',
  },
  {
    id: 'video',
    title: '影片 “Still Remember”',
    name: '馬立群',
  },
  {
    id: 'designer',
    title: '設計',
    name: '曾立宇',
  },
  {
    id: 'engineer',
    title: '網頁工程',
    name: '李文瀚、張容瑄',
  },
  {
    id: 'producer',
    title: '製作人',
    name: '陳虹瑾、李又如、王薏晴',
  },
  {
    id: 'executive',
    title: '監製',
    name: '王錦華、簡信昌',
  },
]

export { staticFileDestination, SITE_URL, READR_URL, POST_JSON, creditsFor318 }
