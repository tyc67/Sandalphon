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

export { staticFileDestination, SITE_URL, READR_URL, POST_JSON }
