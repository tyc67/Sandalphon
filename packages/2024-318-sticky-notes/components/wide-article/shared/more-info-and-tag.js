import styled from 'styled-components'
import Tags from './tags'

/**
 * @typedef {import('../../../type/theme').Theme} Theme
 */
/**
 * @typedef {import('./tags').Tags} Tags
 */

const StyledTags = styled(Tags)`
  margin-top: 32px;
`
/**
 *
 * @param {Object} props
 * @param {Tags} props.tags
 * @returns {JSX.Element}
 */
export default function MoreInfoAndTag({ tags }) {
  return (
    <section>
      <StyledTags tagColor="white" tags={tags}></StyledTags>
    </section>
  )
}
