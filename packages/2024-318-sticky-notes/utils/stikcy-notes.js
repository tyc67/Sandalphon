import { cardRotateDegreeRange, stickyNoteColors } from '../const/sticky-notes'

/**
 * @typedef {import('../const/sticky-notes').StickyNoteColor} StickyNoteColor
 *
 * @returns {StickyNoteColor}
 */
export const genRandomCardColor = () => {
  const randomIndex = Math.floor(Math.random() * stickyNoteColors.length)
  return stickyNoteColors[randomIndex]
}

/**
 * Genereate css transform rotate angle in -5 ~ 5 degree
 * @returns {string}
 */
export const genRandomCardRotateAngle = () => {
  return (Math.random() * 10 - cardRotateDegreeRange).toFixed(2)
}
