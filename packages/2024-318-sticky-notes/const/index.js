/**
 * @type {'local' | 'dev' | 'prod'}
 */
export const env = 'dev' // 'local' || 'dev' || 'prod'
export const projectName = 'dev-318-sticky-notes'

const ga4Ids = {
  local: 'G-36HYH6NF6P',
  dev: 'G-36HYH6NF6P',
  prod: 'G-341XFN0675',
}
export const ga4Id = ga4Ids[env]
