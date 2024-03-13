import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { SITE_URL } from '~/const/wide-article'

/**
 * Transform params `time` into different pattern
 * depend on the type 'dot' or 'slash' or 'slashWithTime'
 * If `time` is not a valid date, this function will return undefined
 * @param {string} time
 * @param {'dot' | 'slash'| 'slashWithTime'} format
 * @returns {string | undefined}
 */
const transformTimeData = (time, format) => {
  dayjs.extend(utc)

  const timeData = dayjs(time).utcOffset(8)

  if (!timeData.isValid()) {
    return undefined
  } else {
    switch (format) {
      case 'dot':
        return timeData.format('YYYY.MM.DD HH:mm')

      case 'slash':
        return timeData.format('YYYY/MM/DD')

      case 'slashWithTime':
        return timeData.format('YYYY/MM/DD HH:mm')

      default:
        return undefined
    }
  }
}

/**
 * Transform params `time` into `YYYY.MM.DD HH:MM` pattern
 * If `time` is not a valid date, this function will return undefined
 * @param {String} time
 * @returns {string | undefined}
 */
const transformTimeDataIntoDotFormat = (time) => {
  return transformTimeData(time, 'dot')
}

/**
 * Get path of article base on different article style, and whether is external article.
 * @param {String} slug
 * @param {import('~/type/wide-article/post').ArticleStyle} style
 * @param {Object |''} partner
 * @returns {String}
 */
const getArticleHref = (slug, style, partner) => {
  if (partner) {
    return `${SITE_URL}/external/${slug}/`
  }
  if (style === 'campaign') {
    return `${SITE_URL}/campaigns/${slug}`
  } else if (style === 'projects') {
    return `${SITE_URL}/projects/${slug}/`
  }

  return `${SITE_URL}/story/${slug}/`
}

export { transformTimeDataIntoDotFormat, getArticleHref }
