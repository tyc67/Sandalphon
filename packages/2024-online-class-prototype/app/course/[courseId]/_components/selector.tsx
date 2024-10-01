import { PropsWithChildren } from 'react'

type Props = {
  id: string
  isActive: boolean
  onClick: () => void
}

export default function Selector({
  id,
  isActive,
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      id={id}
      className={`text-lg font-bold leading-[1.8] ${isActive ? 'text-black' : 'text-[#929292]'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
