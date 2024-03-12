import useWindowDimensions from '../../hooks/useWindowDimensions'
import DesktopNewNote from './DesktopNewNote'
import MobileNewNote from './MobileNewNote'

export default function NewNote() {
  const { width } = useWindowDimensions()

  if (!width) {
    return null
  } else if (width >= 1200) {
    return <DesktopNewNote />
  } else {
    return <MobileNewNote />
  }
}
