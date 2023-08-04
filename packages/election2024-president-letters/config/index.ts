const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)

let staticFileDestination: string
let protocol = 'http'
let host = 'localhost'
let imagePrefix: string
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

export { staticFileDestination, imagePrefix }
