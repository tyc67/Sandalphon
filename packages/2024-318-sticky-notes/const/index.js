/**
 * @type {'local' | 'dev' | 'prod'}
 */
export const env = 'prod' // 'local' || 'dev' || 'prod'
export const projectName = 'anniversary318'

const ga4Ids = {
  local: 'G-36HYH6NF6P',
  dev: 'G-36HYH6NF6P',
  prod: 'G-341XFN0675',
}
export const ga4Id = ga4Ids[env]
