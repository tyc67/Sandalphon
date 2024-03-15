import {
  cardRotateDegreeRange,
  emptyStickyNote,
  noteKeyInLocalStorage,
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
    id: rawStickyNote.id + '-' + crypto.randomUUID(),
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
      const fixedNote = stickyNotesFromDB[noteIndex]
      fixedNote.color = stickyNoteColors[i]
      fixedNotes[i] = fixedNote
      stickyNotesFromDB.splice(noteIndex, 1)
    } else {
      const fixedNote = stickyNotesFromDB[0]
      fixedNote.color = stickyNoteColors[i]
      fixedNotes[i] = fixedNote
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

    // if the index is for the empty note or run out of randomStickyNotes
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
          index: stickyNotesLines[nestedArrayIndex].length,
        },
      }

      stickyNotesLines[nestedArrayIndex].push(newEmptyStickyNote)
      emptyStickyNotes.push(newEmptyStickyNote)
      continue
    }

    // hadnle random notes later
    const randomSticyNote = randomStickyNotes.pop()
    if (randomSticyNote) {
      randomSticyNote.position = {
        line: nestedArrayIndex,
        index: stickyNotesLines[nestedArrayIndex].length,
      }
      stickyNotesLines[nestedArrayIndex].push(randomSticyNote)
    }
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

  const additionalEmptyNotesCount = Math.ceil(
    stickyNoteLength / emptyNoteCountPerSection
  )

  const additionalTotalStickyNotes =
    stickyNoteLength + additionalEmptyNotesCount

  let minNestedArrayLength
  let nestedArrIndexToStart = 0
  for (const [i, stickyNotesLine] of stickyNotesLines.entries()) {
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

    // if the index is for the empty note or run out of randomStickyNotes
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
          index: stickyNotesLines[nestedArrayIndex]?.length,
        },
      }

      stickyNotesLines[nestedArrayIndex]?.push(newEmptyStickyNote)
      emptyStickyNotes.push(newEmptyStickyNote)
      continue
    }

    // hadnle random notes later
    const randomSticyNote = randomStickyNotes.pop()
    if (randomSticyNote) {
      randomSticyNote.position = {
        line: nestedArrayIndex,
        index: stickyNotesLines[nestedArrayIndex]?.length,
      }
      stickyNotesLines[nestedArrayIndex]?.push(randomSticyNote)
    }
  }

  return {
    stickyNotesLines: stickyNotesLines,
    emptyStickyNotes: emptyStickyNotes,
  }
}

function getNotesInLS() {
  let notesInLS = []
  try {
    const oldNotes = JSON.parse(localStorage.getItem(noteKeyInLocalStorage))
    if (Array.isArray(oldNotes)) notesInLS = oldNotes
  } catch (error) {
    // ignore old notes if json parsing invalid json or stored notes are not array
    console.log(error)
  }
  return notesInLS
}

/**
 *
 * @param {RawStickyNote} row
 */
export function saveNewRowToLocalStorage(row) {
  const notesInLS = getNotesInLS()
  notesInLS.push(row)

  localStorage.setItem(noteKeyInLocalStorage, JSON.stringify(notesInLS))
}

/**
 * @param {RawStickyNote[]} rawStickyNotes
 */
export function appendSavedNotesToRawNotes(rawStickyNotes) {
  const notesInLS = getNotesInLS()
  const newNotesInLS = []

  for (const noteInLS of notesInLS) {
    const foundNote = rawStickyNotes.find(
      (rawStickyNote) => rawStickyNote.id === noteInLS.id
    )
    /**
     * If the noteInLs shows in the first page rawStickyNotes, delete from the LS by not adding to newNotesInLS.
     * If not, keep noteInLs in LS and add it to the rawStickyNotes.
     */
    if (!foundNote) {
      newNotesInLS.push(noteInLS)
      rawStickyNotes.push(noteInLS)
    }
  }

  localStorage.setItem(noteKeyInLocalStorage, JSON.stringify(newNotesInLS))
  return rawStickyNotes
}

/**
 * @param {RawStickyNote[]} rawStickyNotes
 */
export function removeNotesInLSIfInRawStickyNotes(rawStickyNotes) {
  const notesInLS = getNotesInLS()
  const newNotesInLS = []
  for (const noteInLS of notesInLS) {
    const foundNoteIndex = rawStickyNotes.findIndex(
      (rawStickyNote) => rawStickyNote.id === noteInLS.id
    )
    /**
     * If the noteInLs shows in the (page > 2) rawStickyNotes:
     * 1. delete from the LS by not adding to newNotesInLS.
     * 2. remove the noteInLS in the rawStickyNotes cause it already displays
     *  in the first page. Check appendSavedNotesToRawNotes for the logic.
     * If not, keep noteInLs in LS and add it to the rawStickyNotes.
     */
    if (foundNoteIndex === -1) {
      // remain the noteInLS
      newNotesInLS.push(noteInLS)
    } else {
      rawStickyNotes.splice(foundNoteIndex, 1)
    }
  }
  localStorage.setItem(noteKeyInLocalStorage, JSON.stringify(newNotesInLS))
  return rawStickyNotes
}
