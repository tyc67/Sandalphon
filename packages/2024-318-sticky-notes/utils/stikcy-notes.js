import { cardRotateDegreeRange, stickyNoteColors } from '../const/sticky-notes'

export const genRandomCardColor = () => {
  const randomIndex = Math.floor(Math.random() * stickyNoteColors.length)
  return stickyNoteColors[randomIndex]
}

/**
 * Genereate css transform rotate degree in -5 ~ 5 degree
 * @returns {number}
 */
export const genRandomCardRotateDegree = () => {
  return (Math.random() * 10 - cardRotateDegreeRange).toFixed(2)
}
