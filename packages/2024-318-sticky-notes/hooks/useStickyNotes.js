import { useEffect, useState } from 'react'
import {
  emptyStickyNote,
  rwdEmptyNotePerSection,
  rwdLines,
} from '../const/sticky-notes'
import {
  genRandomCardColor,
  genRandomCardRotateDegree,
} from '../utils/stikcy-notes'
import useDevice from './useDevice'

export function useStickyNotes(rawData = []) {
  const [displayStickyNotes, setDisplayStickyNotes] = useState([])
  const device = useDevice()

  useEffect(() => {
    const lines = rwdLines[device]
    const emptyNoteCountPerSection = rwdEmptyNotePerSection[device]

    const rawStickyNotes = Array.from(rawData)

    // get lines of fixed sticky notes
    // run {lines} times to get number of lines fixed array with fixed number
    const fixedStickyNotes = Array.from(Array(lines)).reduce(
      (fixedNotes, _, i) => {
        const noteIndex = rawStickyNotes.findIndex((e) => {
          return e.fixed === String(i + 1)
        })
        fixedNotes.push(rawStickyNotes[noteIndex])
        rawStickyNotes.splice(noteIndex, 1)
        return fixedNotes
      },
      []
    )

    const randomStickyNotes = []
    while (rawStickyNotes.length !== 0) {
      const randomIndex = Math.floor(Math.random() * rawStickyNotes.length)
      randomStickyNotes.push(rawStickyNotes[randomIndex])
      rawStickyNotes.splice(randomIndex, 1)
    }

    const stickyNotesLines = []
    Array.from(Array(lines)).forEach(() => stickyNotesLines.push([]))

    const stickyNoteLength = rawData.length

    const copyFixedSticyNotes = [...fixedStickyNotes]
    const copyRandomStickyNotes = [...randomStickyNotes]
    const emptyStickyNotes = []

    /**
     * Since empty note will be inserted into displayNotes per emptyNotePerSection,
     * this random index will decide the position of empty notes in each section.
     * Skip first ${lines} index to avoid insert the empty note in the firsct secrion
     * cause conflict with the fixed notes.
     */
    const randomEmptyNoteInsertIndex =
      lines + Math.floor(Math.random() * (emptyNoteCountPerSection - lines))
    console.log('randomEmptyNoteInsertIndex', randomEmptyNoteInsertIndex + 1)
    const emptyNotesCount = Math.ceil(
      stickyNoteLength / emptyNoteCountPerSection
    )

    const totalStickyNotes = stickyNoteLength + emptyNotesCount
    console.log(totalStickyNotes)
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
        console.log(`第${i + 1}個塞入emptyStickyNote`)
        const indexOfEmptyStickyNotes = emptyStickyNotes.length
        const newEmptyStickyNote = {
          ...emptyStickyNote,
          index: 'empty-' + indexOfEmptyStickyNotes,
        }
        stickyNotesLines[nestedArrayIndex].push(newEmptyStickyNote)
        emptyStickyNotes.push(newEmptyStickyNote)
        continue
      }

      // hadnle random notes later
      const randomSticyNote = copyRandomStickyNotes.pop()
      stickyNotesLines[nestedArrayIndex].push(randomSticyNote)
    }

    const newDisplayStickyNotes = stickyNotesLines.map((stickyNotesLine) =>
      stickyNotesLine.map((displayStickyNote) => ({
        ...displayStickyNote,
        bgColor: genRandomCardColor(),
        rotateAngle: genRandomCardRotateDegree(),
      }))
    )
    setDisplayStickyNotes(newDisplayStickyNotes)
  }, [rawData, device])

  return displayStickyNotes
}
