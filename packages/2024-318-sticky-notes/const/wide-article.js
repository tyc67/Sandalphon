import { env, projectName } from '.'

let SITE_URL = ''
let READR_URL = ''
let staticFileDestination = ''

switch (env) {
  case 'dev':
    SITE_URL = 'https://dev-next.mirrormedia.mg'
    READR_URL = 'https://v3-dev.readr.tw'
    staticFileDestination = `https://www.mirrormedia.mg/projects/${projectName}`

    break

  case 'prod': {
    SITE_URL = 'https://www.mirrormedia.mg'
    READR_URL = 'https://www.readr.tw'
    staticFileDestination = `https://www.mirrormedia.mg/projects/${projectName}`

    break
  }
  default: {
    SITE_URL = 'https://dev-next.mirrormedia.mg'
    READR_URL = 'https://v3-dev.readr.tw'
    staticFileDestination = `http://localhost:3000`

    break
  }
}

export { staticFileDestination, SITE_URL, READR_URL }
