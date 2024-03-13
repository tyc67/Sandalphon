import { useEffect, useRef, useState } from 'react'
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
import { useAppDispatch, useAppSelector } from './useRedux'
import { stickyNoteActions } from '../store/sticky-note-slice'
import axios from '~/axios'
import useInView from './useInView'
import { fetchStickyNotesAtPage } from '~/api/fetch-sticky-notes'

/**
 * @typedef {import('../data/mockData').RawStickyNote} RawStickyNote
 * @typedef {import('~/data/mockData').RawDataMeta} RawDataMeta
 * @typedef {import('../data/mockData').RawData} RawData
 * @typedef {import('../components/sticky-notes/StickyNote').StickyNote} StickyNote
 * @typedef {import('./useDevice').Device} Device
 */

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
 * @returns {{stickyNotesLines: StickyNote[][], emptyStickyNotes: StickyNote[]}}
 */
function initializeDisplayStickyNotes(rawStickyNotes, device) {
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

  return { stickyNotesLines, emptyStickyNotes }
}

/**
 * @param {StickyNote[][]} stickyNotesLines
 * @param {StickyNote[]} emptyStickyNotes
 * @param {RawStickyNote[]} rawStickyNotes
 * @param {Device} device
 */
function refillDisplayStickyNotes(
  stickyNotesLines,
  emptyStickyNotes,
  rawStickyNotes,
  device
) {
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
  const randomEmptyNoteInsertIndex =
    lines +
    Math.floor(
      Math.random() *
        (Math.min(emptyNoteCountPerSection, stickyNoteLength) - lines)
    )
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

/** @type {RawStickyNote[]} */
const initialRawStickyNotes = []

/** @type {RawDataMeta} */
const initialMeta = null

/**
 * Fetch rawStickyNotes json and generate stickyNotes to display
 * @param {React.MutableRefObject} endRef
 */
export function useStickyNotesInLines(endRef) {
  const [rawStickyNotes, setRawStickyNotes] = useState(initialRawStickyNotes)
  const [meta, setMeta] = useState(initialMeta)
  const [page, setPage] = useState(1)
  const isLoadingMoreRef = useRef(false)
  const stickyNotesInLines = useAppSelector(
    (state) => state.stickyNote.stickyNotesInLines
  )
  const emptyStickyNotes = useAppSelector(
    (state) => state.stickyNote.emptyStickyNotes
  )
  const dispatch = useAppDispatch()
  const device = useDevice()
  const endOfScroll = useInView(endRef)

  useEffect(() => {
    const fetchStickyNotes = async () => {
      try {
        let newRawStickyNotes = rawStickyNotes
        if (!rawStickyNotes.length) {
          const response = await axios.get(
            `https://v3-statics-dev.mirrormedia.mg/json/project_318_1.json`
          )
          /** @type {import('~/data/mockData').RawData} */
          const rawData = response.data
          const { sheet_data, meta } = rawData
          newRawStickyNotes = sheet_data

          setMeta({
            total_pages: meta['total pages'],
            next: meta.next,
          })
        }

        const { stickyNotesLines, emptyStickyNotes } =
          initializeDisplayStickyNotes(newRawStickyNotes, device)

        setRawStickyNotes(newRawStickyNotes)

        dispatch(stickyNoteActions.changeStickyNotesInLines(stickyNotesLines))
        dispatch(stickyNoteActions.changeEmptyNotes(emptyStickyNotes))
      } catch (error) {
        console.error(error)
      }
    }
    fetchStickyNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device, dispatch]) // avoid adding rawStickNotes to prevent update random position...

  useEffect(() => {
    const isLoading = isLoadingMoreRef.current
    if (endOfScroll && page < meta?.total_pages && !isLoading) {
      isLoadingMoreRef.current = true
      const newPage = page + 1

      fetchStickyNotesAtPage(newPage)
        .then((rawData) => {
          const { sheet_data: rawStickyNotes, meta } = rawData
          const {
            stickyNotesLines: newStickyNotesInLines,
            emptyStickyNotes: newEmptyStickyNotes,
          } = refillDisplayStickyNotes(
            stickyNotesInLines,
            emptyStickyNotes,
            rawStickyNotes,
            device
          )

          setPage(newPage)
          setRawStickyNotes((oldVal) => oldVal.concat(rawStickyNotes))
          setMeta({
            total_pages: meta['total pages'],
            next: meta.next,
          })
          dispatch(
            stickyNoteActions.changeStickyNotesInLines(newStickyNotesInLines)
          )
          dispatch(stickyNoteActions.changeEmptyNotes(newEmptyStickyNotes))
        })
        .finally(() => {
          isLoadingMoreRef.current = false
        })
    }
  }, [
    device,
    dispatch,
    emptyStickyNotes,
    endOfScroll,
    meta?.total_pages,
    page,
    stickyNotesInLines,
  ])
}
