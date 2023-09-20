// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLIC_` 開頭)
const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)

const OG_TITLE: string = process.env.OG_TITLE || ''
const OG_DESC: string = process.env.OG_DESC || ''
const OG_IMAGE_URL: string = process.env.OG_IMAGE_URL || ''

const primaryColor: string = process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#E2FBFE'
const secondaryColor: string =
  process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#ffffff'

let protocol = 'http'
let host = 'localhost'
let staticFileDestination: string
let imagePrefix: string
let GTM_ID = ''
let SITE_URL = ''

switch (env) {
  case 'dev':
    protocol = 'https'
    host = 'events.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/events/${projectName}`
    imagePrefix = `/events/${projectName}`
    GTM_ID = 'GTM-PBNLSMX'
    SITE_URL = 'dev-next.mirrormedia.mg'

    break
  case 'staging':
    protocol = 'https'
    host = 'events.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/events/${projectName}`
    imagePrefix = `/events/${projectName}`
    GTM_ID = 'GTM-KVDZ27K'
    SITE_URL = 'staging-next.mirrormedia.mg'

    break

  case 'prod': {
    protocol = 'https'
    host = 'events.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/events/${projectName}`
    imagePrefix = `/events/${projectName}`
    GTM_ID = 'GTM-NCH86SP'
    SITE_URL = 'www.mirrormedia.mg'

    break
  }
  default: {
    staticFileDestination = `${protocol}://${host}:3000`
    imagePrefix = ''
    GTM_ID = 'GTM-PBNLSMX'

    break
  }
}

export {
  staticFileDestination,
  imagePrefix,
  GTM_ID,
  SITE_URL,
  primaryColor,
  secondaryColor,
  OG_TITLE,
  OG_DESC,
  OG_IMAGE_URL,
}
