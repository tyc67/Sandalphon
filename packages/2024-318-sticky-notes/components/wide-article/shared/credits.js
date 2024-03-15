import styled from 'styled-components'
import Link from 'next/link'
import { SITE_URL } from '~/const/wide-article'
import { creditsFor318 } from '~/const/wide-article'

/**
 * @typedef {import('~/type/theme').Theme} Theme
 */

const CreditsWrapper = styled.section`
  font-size: 16px;
  font-weight: 400;
  margin-top: 24px;
  width: 100%;
  line-height: 1.5;
  max-width: 500px;
  text-align: center;

  #author {
    display: none;
    ${({ theme }) => theme.breakpoint.md} {
      display: flex;
    }
  }

  #author_mobile {
    display: flex;
    ${({ theme }) => theme.breakpoint.md} {
      display: none;
    }
  }
`

const CreditTitle = styled.figcaption`
  display: block;
  color: white;
  position: relative;
  text-align: left;
  margin-right: 14px;
  min-width: 32px;

  &::after {
    position: absolute;
    content: ' | ';
    right: -7px;
    transform: translate(50%, 1px);
    top: -2px;
    color: white;
  }
`

const CreditList = styled.figure`
  display: flex;
  justify-content: center;
  width: auto;
  margin-bottom: 5px;

  ul {
    gap: 0 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    &.no-link-list {
      display: block;
    }
    li {
      width: auto;
      display: block;
      line-height: 1.5;
      &.link {
        position: relative;

        color: ${
          /** @param {{theme:Theme}} param */
          ({ theme }) => theme.color.brandColor.white
        };
      }

      &.no-link {
        text-align: left;
        color: white;
      }
    }
  }
`

const Notion = styled.p`
  color: white;
  font-size: 14px;
  line-height: 1.8;
  margin: auto;
  margin-top: 20px;
  max-width: 420px;
`

const CREDIT_TITLE_NAME_MAP = {
  writers: '文 ',
  photographers: '攝影',
  camera_man: '影音',
  designers: '設計',
  engineers: '工程',
  vocals: '主播',
  extend_byline: '協力',
}

/**
 * @typedef {import('~/type/wide-article/post').Contact[]} Contacts
 */

/**
 * @typedef {import('~/type/wide-article/post').Tag[]} Tags
 */

/**
 * @typedef {Object} Credit
 * @property {Contacts} [writers]
 * @property {Contacts} [photographers]
 * @property {Contacts} [camera_man]
 * @property {Contacts} [designers]
 * @property {Contacts} [engineers]
 * @property {Contacts} [vocals]
 * @property {string} [extend_byline]
 */

/**
 * @param {Object} props
 * @param {Credit[]} props.credits
 * @param {string} [props.className]
 * @returns {JSX.Element}
 */
export default function Credits({ credits = [], className = '' }) {
  const shouldShowCredits = credits.some((credit) => {
    const [people] = Object.values(credit)
    return people.length !== 0 || (typeof people === 'string' && people.trim())
  })

  const creditsJsx = shouldShowCredits ? (
    <>
      {credits.map((credit, index) => {
        const title = Object.keys(credit)
        const titleName = CREDIT_TITLE_NAME_MAP[title]
        const [people] = Object.values(credit)
        if (
          !titleName ||
          people.length === 0 ||
          (typeof people === 'string' && !people.trim())
        ) {
          return null
        }
        return (
          <CreditList key={index}>
            {titleName !== '協力' && <CreditTitle>{titleName}</CreditTitle>}
            <ul
              className={Array.isArray(people) ? 'link-list' : 'no-link-list'}
            >
              {Array.isArray(people) ? (
                people.map((person) => (
                  <li key={person.id} className="link">
                    <Link
                      target="_blank"
                      rel="noreferrer noopenner"
                      href={`${SITE_URL}/author/${person.id}`}
                    >
                      {person.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="no-link">
                  <span>{people}</span>
                </li>
              )}
            </ul>
          </CreditList>
        )
      })}
    </>
  ) : null

  const credits318 = (
    <>
      <CreditList id="author_mobile">
        <CreditTitle>撰文</CreditTitle>

        <ul className={'no-link-list'}>
          <li className="no-link">
            <p>陳虹瑾、李振豪、陳昌遠</p>
            <p>曾芷筠、蔣宜婷、陳珮瑜</p>
          </li>
        </ul>
      </CreditList>

      {creditsFor318.map((item) => {
        return (
          <CreditList key={item.title} id={item.id}>
            <CreditTitle>{item.title}</CreditTitle>

            <ul className={'no-link-list'}>
              <li className="no-link">
                <span>{item.name}</span>
              </li>
            </ul>
          </CreditList>
        )
      })}
    </>
  )

  return (
    <CreditsWrapper className={className}>
      {creditsJsx}
      {credits318}

      <Notion>
        歷史留言素材取自 318
        公民運動文物紀錄典藏庫（public.318.io），若您為留言作者，歡迎至該網站指認作品。
      </Notion>
    </CreditsWrapper>
  )
}
