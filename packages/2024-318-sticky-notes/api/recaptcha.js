import axios from 'axios'
import { env } from '../const'

const verifyRecaptchaUrl =
  env !== 'prod'
    ? 'https://storytelling-dev-4g6paft7cq-de.a.run.app/api/verification'
    : 'https://storytelling-prod-4g6paft7cq-de.a.run.app/api/verification'

export const verifyRecaptcha = (data) => axios.post(verifyRecaptchaUrl, data)
