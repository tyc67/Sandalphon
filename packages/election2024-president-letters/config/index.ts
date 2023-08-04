const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)
const nodeEnv: string = String(process.env.NODE_ENV)
let staticFileDestination: string
let protocol = 'http'
let host = 'localhost'
let imagePrefix: string
let feedBackFormIds = {
  formId: '10',
  fieldId: {
    emoji: '15',
  },
}
switch (env) {
  case 'dev':
    protocol = 'https'
    host = 'dev.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    break
  case 'staging':
    protocol = 'https'
    host = 'staging.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`

    break

  case 'prod': {
    protocol = 'https'
    host = 'www.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`

    break
  }
  default: {
    staticFileDestination = `${protocol}://${host}:3000`
    imagePrefix = ''

    break
  }
}
switch (nodeEnv) {
  case 'production':
    break
  default:
    feedBackFormIds = {
      formId: '10',
      fieldId: {
        emoji: '15',
      },
    }
    break
}

export { staticFileDestination, imagePrefix, feedBackFormIds }
