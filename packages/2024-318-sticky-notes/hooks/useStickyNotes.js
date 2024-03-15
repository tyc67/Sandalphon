import { useEffect, useRef, useState } from 'react'
import useDevice from './useDevice'
import { useAppDispatch, useAppSelector } from './useRedux'
import { stickyNoteActions } from '../store/sticky-note-slice'
import useInView from './useInView'
import { fetchStickyNotesAtPage } from '~/api/fetch-sticky-notes'
import {
  appendSavedNotesToRawNotes,
  removeNotesInLSIfInRawStickyNotes,
} from '../utils/sticky-notes'

/**
 * @typedef {import('../data/mockData').RawStickyNote} RawStickyNote
 * @typedef {import('~/data/mockData').RawDataMeta} RawDataMeta
 * @typedef {import('../data/mockData').RawData} RawData
 * @typedef {import('./useDevice').Device} Device
 */

/** @type {RawDataMeta} */
const initialMeta = null

/**
 * Fetch rawStickyNotes json and generate stickyNotes to display
 * @param {React.MutableRefObject} endRef
 */
export function useStickyNotesInLines(endRef) {
  const [meta, setMeta] = useState(initialMeta)
  const [page, setPage] = useState(1)
  const isLoadingMoreRef = useRef(false)
  const rawStickyNotes = useAppSelector(
    (state) => state.stickyNote.rawStickyNotes
  )
  const stickyNotesInLines = useAppSelector(
    (state) => state.stickyNote.stickyNotesInLines
  )
  const emptyStickyNotes = useAppSelector(
    (state) => state.stickyNote.emptyStickyNotes
  )
  const dispatch = useAppDispatch()
  const showStickyNotesPanel = useAppSelector(
    (state) => state.stickyNote.showStickyNotesPanel
  )
  const device = useDevice()
  const endOfScroll = useInView(endRef)

  useEffect(() => {
    const fetchStickyNotes = async () => {
      try {
        let newRawStickyNotes = rawStickyNotes
        if (!rawStickyNotes.length) {
          const { sheet_data, meta } = await fetchStickyNotesAtPage(1)
          newRawStickyNotes = sheet_data

          newRawStickyNotes = appendSavedNotesToRawNotes(sheet_data)

          setMeta(meta)
        }

        dispatch(
          stickyNoteActions.initialStickyNotes({
            rawStickyNotes: newRawStickyNotes,
            device,
          })
        )
      } catch (error) {
        console.error(error)
      }
    }
    if (showStickyNotesPanel && device) {
      fetchStickyNotes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStickyNotesPanel, device, dispatch]) // avoid adding rawStickNotes to prevent update random position...

  useEffect(() => {
    const isLoading = isLoadingMoreRef.current
    if (endOfScroll && page < meta?.total_pages && !isLoading) {
      console.log('laod more')
      isLoadingMoreRef.current = true
      const newPage = page + 1

      fetchStickyNotesAtPage(newPage)
        .then((rawData) => {
          const { sheet_data, meta } = rawData

          const newRawStickyNotes =
            removeNotesInLSIfInRawStickyNotes(sheet_data)

          dispatch(
            stickyNoteActions.appendStickyNotes({ newRawStickyNotes, device })
          )
          setPage(newPage)
          setMeta(meta)
        })
        .catch((error) => console.error(error))
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
