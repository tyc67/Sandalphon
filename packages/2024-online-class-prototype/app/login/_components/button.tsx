import Loading from '@/components/loading'
import { PropsWithChildren } from 'react'

type Props = {
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

export default function Button({
  children,
  onClick,
  disabled,
  isLoading,
}: PropsWithChildren<Props>) {
  return (
    <button
      className="rounded bg-black px-[14px] text-base font-bold leading-[1.8] text-white disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="p-1 *:size-5 *:text-white">
          <Loading />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
