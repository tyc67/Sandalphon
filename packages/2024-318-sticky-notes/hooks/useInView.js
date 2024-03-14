import { useEffect, useState } from 'react'

/**
 *
 * @param {React.MutableRefObject} ref
 * @param {string} [rootMargin]
 * @returns {boolean}
 */
export default function useInView(ref, rootMargin = '0px') {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    if (ref.current == null) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref, rootMargin])
  return isVisible
}
