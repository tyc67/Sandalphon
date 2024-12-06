type Props = {
  text: string
  method: string
  isActive: boolean
  onClick: (method: string) => void
}

export default function LoginMethodSelector({
  text,
  method,
  isActive,
  onClick,
}: Props) {
  return (
    <button
      className={`text-base font-medium leading-[1.8] [&:not(:first-child)]:before:mr-3 [&:not(:first-child)]:before:inline-block [&:not(:first-child)]:before:h-3 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-black ${
        isActive ? 'text-[#1877F2]' : 'text-[#929292]'
      } `}
      onClick={() => onClick(method)}
    >
      {text}
    </button>
  )
}
