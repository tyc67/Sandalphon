import { useEffect, useRef, useState } from 'react'
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
    if (device) {
      fetchStickyNotes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device, dispatch]) // avoid adding rawStickNotes to prevent update random position...

  useEffect(() => {
    const isLoading = isLoadingMoreRef.current
    if (endOfScroll && page < meta?.total_pages && !isLoading) {
      isLoadingMoreRef.current = true
      const newPage = page + 1

      fetchStickyNotesAtPage(newPage)
        .then((rawData) => {
          const { sheet_data: newRawStickyNotes, meta } = rawData

          dispatch(
            stickyNoteActions.appendStickyNotes({ newRawStickyNotes, device })
          )
          setPage(newPage)
          setMeta({
            total_pages: meta['total pages'],
            next: meta.next,
          })
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
