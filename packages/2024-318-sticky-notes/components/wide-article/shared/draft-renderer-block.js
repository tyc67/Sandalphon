import { MirrorMedia } from '@mirrormedia/lilith-draft-renderer'
const { DraftRenderer, hasContentInRawContentBlock, removeEmptyContentBlock } =
  MirrorMedia

/**
 * @typedef { 'normal' | 'wide' | 'photography' | 'premium' | 'amp' } ContentLayout
 */

/**
 * @typedef {import('~/type/wide-article/draft').Draft} RawContentBlock
 */

/**
 * @callback WrapperFunction
 * @param {JSX.Element} children - The React element to wrap.
 * @returns {JSX.Element} The wrapped React element.
 */

/**
 * Component for render blocks of draft.js
 * We use package `@mirrormedia/draft-renderer` to render the block of draft.js
 * @param {Object} props
 * @param {RawContentBlock} props.rawContentBlock - The blocks of draft.js we want to render.
 * @param { ContentLayout } [props.contentLayout]
 * - Which layout we want to render.
 * - Different layout will affect the style of blocks.
 * - Optional, default value is `normal`
 * @param {WrapperFunction} [props.wrapper]
 * - The function to wrap all blocks, you can use it to put all blocks in a jsx element.
 * - Optional, default value is `(children) => <>{children}</>`.
 * @returns  {JSX.Element}
 */
export default function DraftRenderBlock({
  rawContentBlock = { blocks: [], entityMap: {} },
  contentLayout = 'normal',
  wrapper = (children) => <>{children}</>,
}) {
  const shouldRenderDraft = hasContentInRawContentBlock(rawContentBlock)
  const jsx = NormalSSRRenderBlock(rawContentBlock, contentLayout)

  return <>{shouldRenderDraft && wrapper(jsx)}</>
}
/**
 *
 * @param {RawContentBlock} rawContentBlock
 * @param {ContentLayout} contentLayout
 * @returns {JSX.Element}
 */
function NormalSSRRenderBlock(rawContentBlock, contentLayout) {
  const shouldRenderDraft = hasContentInRawContentBlock(rawContentBlock)
  let draftJsx = null

  if (shouldRenderDraft) {
    const contentWithRemovedEmptyBlock =
      removeEmptyContentBlock(rawContentBlock)
    draftJsx = (
      <DraftRenderer
        rawContentBlock={contentWithRemovedEmptyBlock}
        contentLayout={contentLayout}
      />
    )
  }

  return draftJsx
}
