const env = String(process.env.NEXT_PUBLIC_ENV)
const projectName = String(process.env.NEXT_PUBLIC_PROJECT_NAME)

let SITE_URL = ''
let READR_URL = ''
let staticFileDestination = ''
let ga4Id = ''

switch (env) {
  case 'dev':
    SITE_URL = 'https://dev-next.mirrormedia.mg'
    READR_URL = 'https://v3-dev.readr.tw'
    staticFileDestination = `https://www.mirrormedia.mg/projects/${projectName}`
    ga4Id = 'G-YDKYSDG3RL'

    break

  case 'prod': {
    SITE_URL = 'https://www.mirrormedia.mg'
    READR_URL = 'https://www.readr.tw'
    staticFileDestination = `https://www.mirrormedia.mg/projects/${projectName}`
    ga4Id = 'G-4Z12TPZTMB'

    break
  }
  default: {
    SITE_URL = 'https://dev-next.mirrormedia.mg'
    READR_URL = 'https://v3-dev.readr.tw'
    staticFileDestination = `http://localhost:3000`
    ga4Id = 'G-YDKYSDG3RL'

    break
  }
}

export { staticFileDestination, SITE_URL, READR_URL, ga4Id }
