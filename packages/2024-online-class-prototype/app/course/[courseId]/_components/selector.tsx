import { PropsWithChildren } from 'react'

type Props = {
  isActive: boolean
  onClick: () => void
}

export default function Selector({
  isActive,
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={`text-lg font-bold leading-[1.8] ${isActive ? 'text-black' : 'text-[#929292]'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
