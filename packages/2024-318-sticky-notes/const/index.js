/**
 * @type {'local' | 'dev' | 'prod'}
 */
export const env = 'local' // 'local' || 'dev' || 'prod'
export const projectName = 'dev-318-sticky-notes'

const ga4Ids = {
  local: 'G-YDKYSDG3RL',
  dev: 'G-YDKYSDG3RL',
  prod: 'G-4Z12TPZTMB',
}
export const ga4Id = ga4Ids[env]
