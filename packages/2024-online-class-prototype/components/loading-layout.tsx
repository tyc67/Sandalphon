'use client'

import { PropsWithChildren, useEffect } from 'react'
import Loading from './loading'

type Props = {
  isLoading: boolean
}

export default function LoadingLayout({
  isLoading,
  children,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    if (!isLoading) {
      const hash = `#${window.location.href.split('#')[1]}`
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView()
      }
    }
  }, [isLoading])

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
