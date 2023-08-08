const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)
let feedbackFormId = process.env.NEXT_PUBLIC_FEEDBACK_FORM_ID ?? ''
let emotionFieldId = process.env.NEXT_PUBLIC_EMOTION_FIELD_ID ?? ''
let textFieldId = process.env.NEXT_PUBLIC_TEXT_FIELD_ID ?? ''
let optionApiUrl = process.env.NEXT_PUBLIC_OPTION_API_URL ?? ''
let staticFileDestination: string
let protocol = 'http'
let host = 'localhost'
let imagePrefix: string
let GTM_ID = ''

switch (env) {
  case 'dev':
    protocol = 'https'
    host = 'dev.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-PBNLSMX'

    break
  case 'staging':
    protocol = 'https'
    host = 'staging.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-KVDZ27K'

    break

  case 'prod': {
    protocol = 'https'
    host = 'www.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-NCH86SP'

    break
  }
  default: {
    staticFileDestination = `${protocol}://${host}:8080`
    imagePrefix = ''
    GTM_ID = 'GTM-PBNLSMX'

    break
  }
}

export {
  staticFileDestination,
  imagePrefix,
  feedbackFormId,
  emotionFieldId,
  textFieldId,
  optionApiUrl,
  GTM_ID,
}
