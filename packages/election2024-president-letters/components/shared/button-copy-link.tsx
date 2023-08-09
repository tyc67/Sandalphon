//REMINDER: DO NOT REMOVE className which has prefix `GTM-`, since it is used for collecting data of Google Analytics event.

import { useState } from 'react'

import styled from 'styled-components'
import LinkIcon from '../../public/icon/link-logo.svg'
import useSharedUrl from '../../hooks/use-shared-url'
const CopiedMessage = styled.div<{ shouldShowMessage: Boolean }>`
  position: fixed;
  top: 64px;
  left: calc((100vw - min(80vw, 480px)) / 2);
  color: #fff;
  background: rgba(0, 0, 0, 0.87);
  border-radius: 2px;
  z-index: 100;
  margin: 0 auto;
  width: 80vw;
  max-width: 480px;
  padding: 12px;
  visibility: ${({ shouldShowMessage }) =>
    shouldShowMessage ? 'visible' : 'hidden'};
  opacity: ${
    /**
     * @param {{shouldShowMessage: Boolean}} param
     */
    ({ shouldShowMessage }) => (shouldShowMessage ? 1 : 0)
  };

  transition: all 0.3s ease-in;
`

const ClickButton = styled.button`
  &:focus {
    outline: none;
  }
`

/**
 * @returns {JSX.Element}
 */
export default function ButtonCopyLink() {
  const [shouldShowMessage, setShouldShowMessage] = useState(false)
  const sharedUrl = useSharedUrl()
  const handleCopyLink = () => {
    if (window.navigator.clipboard) {
      /**
       * Since `window.navigator.clipboard` is only available in https protocol,
       * we add optional chaining to hide error when developing in http protocol, such as `http://localhost:3000`
       * Must to know that this is a work-around solution, not solved problem of unable copy in http protocol.
       */
      window.navigator?.clipboard?.writeText(sharedUrl)

      setShouldShowMessage(true)
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        setShouldShowMessage(false)
      }, 3000)
    }
  }
  return (
    <>
      <CopiedMessage shouldShowMessage={shouldShowMessage}>
        已複製連結
      </CopiedMessage>

      <ClickButton onClick={handleCopyLink}>
        <LinkIcon className="GTM-share-link"></LinkIcon>
      </ClickButton>
    </>
  )
}
