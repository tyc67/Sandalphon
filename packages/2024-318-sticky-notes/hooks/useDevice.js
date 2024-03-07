import { useEffect, useState } from 'react'
import useWindowDimensions from './useWindowDimensions'

/**
 * @typedef {'mobile' | 'tablet' | 'desktop'} Device
 */

/** @type {Device} */
const initialDevice = 'mobile'
/*
 * @returns {Device}
 */
export default function useDevice() {
  const [device, setDevice] = useState(initialDevice)
  const { width } = useWindowDimensions()
  useEffect(() => {
    const device =
      width >= 744 ? (width >= 1200 ? 'desktop' : 'tablet') : 'mobile'
    setDevice(device)
  }, [width])

  return device
}
