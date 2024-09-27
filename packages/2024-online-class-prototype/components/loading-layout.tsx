import { PropsWithChildren } from 'react'
import Loading from './loading'

type Props = {
  isLoading: boolean
}

export default function LoadingLayout({
  isLoading,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {isLoading ? (
        <div className="my-auto *:size-12 *:text-main">
          <Loading />
        </div>
      ) : (
        children
      )}
    </>
  )
}
