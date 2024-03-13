import {
  cardRotateDegreeRange,
  emptyStickyNote,
  rwdEmptyNotePerSection,
  rwdLines,
  stickyNoteColors,
} from '../const/sticky-notes'

/**
 * @typedef {import('../const/sticky-notes').StickyNoteColor} StickyNoteColor
 * @typedef {import('~/data/mockData').RawStickyNote} RawStickyNote
 * @typedef {import('~/components/sticky-notes/StickyNote').StickyNote} StickyNote
 * @typedef {import('~/hooks/useDevice').Device} Device
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

/**
 *
 * @param {RawStickyNote[]} rawStickyNotes
 * @returns {StickyNote[]}
 */
function convertRawStickyNoteToDisplayStickyNote(rawStickyNotes) {
  return rawStickyNotes.map((rawStickyNote) => ({
    id: rawStickyNote.type + '-' + crypto.randomUUID(),
    description: rawStickyNote.text,
    imageUrl: rawStickyNote.image,
    fixed: rawStickyNote.promote,
    type: rawStickyNote.type,
    color: genRandomCardColor(),
    rotateAngle: genRandomCardRotateAngle(),
    position: {
      line: null,
      index: null,
    },
  }))
}

/**
 *
 * @param {RawStickyNote[]} rawStickyNotes
 * @param {Device} device
 * @returns {{stickyNotesLines: StickyNote[][], emptyStickyNotes: StickyNote[], randomEmptyNoteInsertIndex: number}}
 */
export function initializeDisplayStickyNotes(rawStickyNotes, device) {
  const lines = rwdLines[device]
  const emptyNoteCountPerSection = rwdEmptyNotePerSection[device]

  let stickyNotesFromDB =
    convertRawStickyNoteToDisplayStickyNote(rawStickyNotes)

  // get lines of fixed sticky notes
  // run {lines} times to get number of lines fixed array with fixed number
  /** @type {StickyNote[]} */
  let fixedStickyNotes = Array.from(Array(lines)).reduce((fixedNotes, _, i) => {
    const noteIndex = stickyNotesFromDB.findIndex((e) => {
      return e.fixed === String(i + 1)
    })
    if (noteIndex !== -1) {
      fixedNotes[i] = stickyNotesFromDB[noteIndex]
      stickyNotesFromDB.splice(noteIndex, 1)
    } else {
      fixedNotes[i] = stickyNotesFromDB[0]
      stickyNotesFromDB.splice(0, 1)
    }
    return fixedNotes
  }, [])

  /** @type {StickyNote[]} */
  const randomStickyNotes = []
  while (stickyNotesFromDB.length !== 0) {
    const randomIndex = Math.floor(Math.random() * stickyNotesFromDB.length)
    randomStickyNotes.push(stickyNotesFromDB[randomIndex])
    stickyNotesFromDB.splice(randomIndex, 1)
  }

  /** @type {StickyNote[][]} */
  const stickyNotesLines = []
  Array.from(Array(lines)).forEach(() => stickyNotesLines.push([]))

  const stickyNoteLength = rawStickyNotes.length
  /** @type {StickyNote[]} */
  const emptyStickyNotes = []

  /**
   * Since empty note will be inserted into displayNotes per emptyNotePerSection,
   * this random index will decide the position of empty notes in each section.
   * Skip first ${lines} index to avoid insert the empty note in the firsct secrion
   * cause conflict with the fixed notes.
   */
  const randomEmptyNoteInsertIndex =
    lines +
    Math.floor(
      Math.random() *
        (Math.min(emptyNoteCountPerSection, stickyNoteLength) - lines)
    )
  const emptyNotesCount = Math.ceil(stickyNoteLength / emptyNoteCountPerSection)

  const totalStickyNotes = stickyNoteLength + emptyNotesCount

  for (let i = 0; i < totalStickyNotes; i++) {
    // calculate which nested array to push
    const nestedArrayIndex = i % lines

    // handle fixed notes first
    if (fixedStickyNotes.length !== 0) {
      const fixedStickyNote = fixedStickyNotes.shift()
      fixedStickyNote.position = {
        line: nestedArrayIndex,
        index: stickyNotesLines[nestedArrayIndex].length,
      }
      stickyNotesLines[nestedArrayIndex].push(fixedStickyNote)
      continue
    }

    // if the index is for the empty note
    if (i % emptyNoteCountPerSection === randomEmptyNoteInsertIndex) {
      /** @type {StickyNote} */
      const newEmptyStickyNote = {
        ...emptyStickyNote,
        id: crypto.randomUUID(),
        color: genRandomCardColor(),
        rotateAngle: genRandomCardRotateAngle(),
        position: {
          line: nestedArrayIndex,
          index: stickyNotesLines[nestedArrayIndex].length,
        },
      }

      stickyNotesLines[nestedArrayIndex].push(newEmptyStickyNote)
      emptyStickyNotes.push(newEmptyStickyNote)
      continue
    }

    // hadnle random notes later
    const randomSticyNote = randomStickyNotes.pop()
    randomSticyNote.position = {
      line: nestedArrayIndex,
      index: stickyNotesLines[nestedArrayIndex].length,
    }
    stickyNotesLines[nestedArrayIndex].push(randomSticyNote)
  }

  return { stickyNotesLines, emptyStickyNotes, randomEmptyNoteInsertIndex }
}

/**
 * @param {StickyNote[][]} stickyNotesLines
 * @param {StickyNote[]} emptyStickyNotes
 * @param {RawStickyNote[]} rawStickyNotes
 * @param {Device} device
 * @param {number} randomEmptyNoteInsertIndex
 */
export function refillDisplayStickyNotes(
  stickyNotesLines,
  emptyStickyNotes,
  rawStickyNotes,
  device,
  randomEmptyNoteInsertIndex
) {
  console.log('randomEmptyNoteInsertIndex', randomEmptyNoteInsertIndex)
  const newStickyNotesLines = JSON.parse(JSON.stringify(stickyNotesLines))
  const newEmptyStickyNotes = JSON.parse(JSON.stringify(emptyStickyNotes))
  const lines = rwdLines[device]
  const emptyNoteCountPerSection = rwdEmptyNotePerSection[device]

  let stickyNotesFromDB =
    convertRawStickyNoteToDisplayStickyNote(rawStickyNotes)

  /** @type {StickyNote[]} */
  const randomStickyNotes = []
  while (stickyNotesFromDB.length !== 0) {
    const randomIndex = Math.floor(Math.random() * stickyNotesFromDB.length)
    randomStickyNotes.push(stickyNotesFromDB[randomIndex])
    stickyNotesFromDB.splice(randomIndex, 1)
  }

  const stickyNoteLength = rawStickyNotes.length

  /**
   * Since empty note will be inserted into displayNotes per emptyNotePerSection,
   * this random index will decide the position of empty notes in each section.
   * Skip first ${lines} index to avoid insert the empty note in the firsct secrion
   * cause conflict with the fixed notes.
   */
  // const randomEmptyNoteInsertIndex =
  //   lines +
  //   Math.floor(
  //     Math.random() *
  //       (Math.min(emptyNoteCountPerSection, stickyNoteLength) - lines)
  //   )
  const additionalEmptyNotesCount = Math.ceil(
    stickyNoteLength / emptyNoteCountPerSection
  )

  const additionalTotalStickyNotes =
    stickyNoteLength + additionalEmptyNotesCount

  let minNestedArrayLength
  let nestedArrIndexToStart = 0
  for (const [i, stickyNotesLine] of newStickyNotesLines.entries()) {
    if (!minNestedArrayLength) {
      minNestedArrayLength = stickyNotesLine.length
      continue
    } else {
      if (minNestedArrayLength > stickyNotesLine.length) {
        nestedArrIndexToStart = i
        break
      }
    }
  }

  for (let i = 0; i < additionalTotalStickyNotes; i++) {
    // calculate which nested array to push
    const nestedArrayIndex = (nestedArrIndexToStart + i) % lines

    // if the index is for the empty note
    if (
      i % emptyNoteCountPerSection === randomEmptyNoteInsertIndex ||
      randomStickyNotes.length === 0
    ) {
      /** @type {StickyNote} */
      const newEmptyStickyNote = {
        ...emptyStickyNote,
        id: crypto.randomUUID(),
        color: genRandomCardColor(),
        rotateAngle: genRandomCardRotateAngle(),
        position: {
          line: nestedArrayIndex,
          index: newStickyNotesLines[nestedArrayIndex]?.length,
        },
      }

      newStickyNotesLines[nestedArrayIndex]?.push(newEmptyStickyNote)
      newEmptyStickyNotes.push(newEmptyStickyNote)
      continue
    }

    // hadnle random notes later
    const randomSticyNote = randomStickyNotes.pop()
    if (randomSticyNote) {
      randomSticyNote.position = {
        line: nestedArrayIndex,
        index: newStickyNotesLines[nestedArrayIndex]?.length,
      }
      newStickyNotesLines[nestedArrayIndex]?.push(randomSticyNote)
    }
  }

  return {
    stickyNotesLines: newStickyNotesLines,
    emptyStickyNotes: newEmptyStickyNotes,
  }
}
