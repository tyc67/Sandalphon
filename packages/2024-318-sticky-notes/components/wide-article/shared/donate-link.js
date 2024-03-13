import Image from 'next/image'

import styled from 'styled-components'
import { staticFileDestination, SITE_URL } from '~/config'

/**
 * @typedef {import('~/type/theme').Theme} Theme
 */

const Link = styled.a`
  background-color: black;
  width: fit-content;
  height: 32px;
  padding: 9px 12px 9px 13.33px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5.33px;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  border-radius: 32px;
  background-color: ${
    /**
     * @param {Object} props
     * @param {Theme} [props.theme]
     */
    ({ theme }) => theme.color.brandColor.black
  };

  color: ${
    /**
     * @param {Object} props
     * @param {Theme} [props.theme]
     */
    ({ theme }) => theme.color.brandColor.white
  };

  outline: 1px solid
    ${
      /**
       * @param {Object} props
       * @param {Theme} [props.theme]
       */
      ({ theme }) => theme.color.brandColor.white
    };
`

export default function DonateLink({ className = '' }) {
  return (
    <Link className={className} href={`${SITE_URL}/donate`} target="_blank">
      <Image
        src={`${staticFileDestination}/wide-article/donate.png`}
        width={13.33}
        height={13.33}
        alt="donate"
      />
      <span>贊助本文</span>
    </Link>
  )
}
