import { useEffect } from 'react'
import {
  emptyStickyNote,
  rwdEmptyNotePerSection,
  rwdLines,
} from '../const/sticky-notes'
import {
  genRandomCardColor,
  genRandomCardRotateAngle,
} from '../utils/stikcy-notes'
import useDevice from './useDevice'
import { useAppDispatch } from './useRedux'
import { stickyNoteActions } from '../store/sticky-note-slice'

/**
 * @typedef {import('../data/mockData').RawStickyNote} RawStickyNote
 * @typedef {import('../components/sticky-notes/StickyNote').StickyNote} StickyNote
 */

/**
 *
 * @param {RawStickyNote[]} rawStickyNotes
 * @returns {StickyNote[]}
 */
function convertRawStickyNoteToDisplayStickyNote(rawStickyNotes) {
  return rawStickyNotes.map((rawStickyNote) => ({
    ...rawStickyNote,
    id: rawStickyNote.type + '-' + crypto.randomUUID(),
    color: genRandomCardColor(),
    rotateAngle: genRandomCardRotateAngle(),
  }))
}

/**
 *
 * @param {RawStickyNote[]} rawData
 * @returns
 */
export function useStickyNotesInLines(rawData = []) {
  const dispatch = useAppDispatch()
  const device = useDevice()

  useEffect(() => {
    const lines = rwdLines[device]
    const emptyNoteCountPerSection = rwdEmptyNotePerSection[device]

    const stickyNotesFromDB = convertRawStickyNoteToDisplayStickyNote(rawData)

    // get lines of fixed sticky notes
    // run {lines} times to get number of lines fixed array with fixed number
    /** @type {StickyNote[]} */
    const fixedStickyNotes = Array.from(Array(lines)).reduce(
      (fixedNotes, _, i) => {
        const noteIndex = stickyNotesFromDB.findIndex((e) => {
          return e.fixed === String(i + 1)
        })
        fixedNotes.push(stickyNotesFromDB[noteIndex])
        stickyNotesFromDB.splice(noteIndex, 1)
        return fixedNotes
      },
      []
    )

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

    const stickyNoteLength = rawData.length

    const copyFixedSticyNotes = [...fixedStickyNotes]
    const copyRandomStickyNotes = [...randomStickyNotes]
    /** @type {import('../store/sticky-note-slice').StickyNoteWithPosition[]} */
    const emptyStickyNotes = []

    /**
     * Since empty note will be inserted into displayNotes per emptyNotePerSection,
     * this random index will decide the position of empty notes in each section.
     * Skip first ${lines} index to avoid insert the empty note in the firsct secrion
     * cause conflict with the fixed notes.
     */
    const randomEmptyNoteInsertIndex =
      lines + Math.floor(Math.random() * (emptyNoteCountPerSection - lines))
    const emptyNotesCount = Math.ceil(
      stickyNoteLength / emptyNoteCountPerSection
    )

    const totalStickyNotes = stickyNoteLength + emptyNotesCount

    for (let i = 0; i < totalStickyNotes; i++) {
      // calculate which nested array to push
      const nestedArrayIndex = i % lines

      // handle fixed notes first
      if (copyFixedSticyNotes.length !== 0) {
        const fixedStickyNote = copyFixedSticyNotes.shift()
        stickyNotesLines[nestedArrayIndex].push(fixedStickyNote)
        continue
      }

      // if the index is for the empty note
      if (i % emptyNoteCountPerSection === randomEmptyNoteInsertIndex) {
        /** @type {StickyNote} */
        const newEmptyStickyNote = {
          ...emptyStickyNote,
          id: 'empty-' + crypto.randomUUID(),
          color: genRandomCardColor(),
          rotateAngle: genRandomCardRotateAngle(),
        }
        /** @type {import('../store/sticky-note-slice').Position} */
        const position = {
          line: nestedArrayIndex,
          index: stickyNotesLines[nestedArrayIndex].length,
        }
        stickyNotesLines[nestedArrayIndex].push(newEmptyStickyNote)
        emptyStickyNotes.push({
          ...newEmptyStickyNote,
          position,
        })
        continue
      }

      // hadnle random notes later
      const randomSticyNote = copyRandomStickyNotes.pop()
      stickyNotesLines[nestedArrayIndex].push(randomSticyNote)
    }

    console.log('emptyStickyNotes', emptyStickyNotes)
    dispatch(stickyNoteActions.changeStickyNotesInLines(stickyNotesLines))
    dispatch(stickyNoteActions.changeEmptyNotes(emptyStickyNotes))
  }, [rawData, device, dispatch])
}
