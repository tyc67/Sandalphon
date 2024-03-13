import styled from 'styled-components'
import { SITE_URL } from '~/config'

/**
 * @typedef {import('~/type/wide-article/post').Tag[]}Tags
 */

/**
 * @typedef {import('~/type/theme').Theme} Theme
 */

const TagsWrapper = styled.section`
  display: flex;
  justify-content: start;
  width: fit-content;
  flex-wrap: wrap;
`
const Tag = styled.a`
  font-size: 14px;
  line-height: 20px;
  padding: 4px 8px;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 2px;
  background-color: white;
  color: black;
  font-weight: 400;
`
/**
 *
 * @param {Object} props
 * @param {Tags} props.tags
 * @param {string} [props.tagColor]
 * @param {string} [props.className] - Attribute for updating style by styled-component
 * @returns {JSX.Element}
 */
export default function Tags({ tags, className = '' }) {
  const shouldShowTags = tags && tags.length
  const tagsJsx = shouldShowTags ? (
    <TagsWrapper className={className}>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          href={`${SITE_URL}/tag/${tag.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          {tag.name}
        </Tag>
      ))}
    </TagsWrapper>
  ) : null

  return <>{tagsJsx}</>
}
