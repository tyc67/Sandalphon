import { useState, useEffect } from 'react'

/**
 * @typedef {Object} WindowDimensions
 * @property {number} width
 * @property {number} height
 */

/**
 * @returns {WindowDimensions}
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

/** @type {WindowDimensions} */
const initialWindowDimension = {
  width: 0,
  height: 0,
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    initialWindowDimension
  )

  useEffect(() => {
    setWindowDimensions(getWindowDimensions())
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
