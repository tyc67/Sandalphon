import { createContext } from 'react'
export const EmojiContext = createContext<{
  shouldShowEmoji: boolean
  setShouldShowEmoji: React.Dispatch<React.SetStateAction<boolean>>
}>({
  shouldShowEmoji: true,
  setShouldShowEmoji: () => {},
})
