import { useEffect, useState } from 'react'
import useWindowDimensions from './useWindowDimensions'

export default function useDevice() {
  const [device, setDevice] = useState('mobile')
  const { width } = useWindowDimensions()
  useEffect(() => {
    const device =
      width >= 744 ? (width >= 1200 ? 'desktop' : 'tablet') : 'mobile'
    setDevice(device)
  }, [width])

  return device
}
