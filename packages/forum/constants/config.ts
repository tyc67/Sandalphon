// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLIC_` 開頭)
const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)
const mainColor: string =
  String(process.env.NEXT_PUBLIC_MAIN_COLOR) ?? '#bbd4da'

let protocol = 'http'
let host = 'localhost'
let staticFileDestination: string
let imagePrefix: string
let GTM_ID = ''
let SITE_URL = ''

switch (env) {
  case 'dev':
    protocol = 'https'
    host = 'dev.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-PBNLSMX'
    SITE_URL = 'dev-next.mirrormedia.mg'

    break
  case 'staging':
    protocol = 'https'
    host = 'staging.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-KVDZ27K'
    SITE_URL = 'staging-next.mirrormedia.mg'

    break

  case 'prod': {
    protocol = 'https'
    host = 'www.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-NCH86SP'
    SITE_URL = 'www.mirrormedia.mg'

    break
  }
  default: {
    staticFileDestination = `${protocol}://${host}:8080`
    imagePrefix = ''
    GTM_ID = 'GTM-PBNLSMX'

    break
  }
}

export { staticFileDestination, imagePrefix, GTM_ID, SITE_URL, mainColor }
