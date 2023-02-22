import { useMemo } from 'react'
import styled from 'styled-components'

import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorators from '~/components/draft/entity-decorator'
import { atomicBlockRenderer } from '~/components/draft/block-redender-fn'

const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

const Container = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.textColor.brown};
  font-family: 'PingFang TC';
  color: ${({ theme }) => theme.textColor.brown};
  position: relative;
  letter-spacing: 0.08em;
  width: 100%;
  max-width: calc(100% - 40px);
  margin: auto;
  margin-bottom: 24px;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: none;
    margin-bottom: 28px;
    padding-bottom: 28px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 680px;
  }

  ol > li {
    display: flex;
    align-items: center;
    line-height: 2;
    counter-increment: my-awesome-counter;
    color: rgba(255, 255, 255, 0.87);
    ::before {
      content: counter(my-awesome-counter) '.';
      display: block;
      margin-right: 0.75rem;
      font-weight: 300;
      font-size: 18px;
      line-height: 32px;
      letter-spacing: 0.1em;
      margin-right: 5px;
    }
  }

  .public-DraftStyleDefault-block {
    margin-bottom: 25px;
    ${({ theme }) => theme.breakpoint.md} {
      margin-bottom: 30px;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      margin-bottom: 24px;
    }
  }
`

const Credit = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.7;
  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['content-sm']}
    line-height: 2;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    font-weight: 300;
    font-size: 16px;
    line-height: 1.7;
  }
`

const Content = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.6;
  text-align: justify;
  width: 80%;
  min-width: 224px;
  margin: auto;
  margin-bottom: 24px;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: none;
    width: 100%;
    font-size: 18px;
    line-height: 2;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-weight: 300;
    font-size: 16px;
    line-height: 1.8;
  }
`

export default function Brief({ content, writers, photographers, coworker }) {
  const blocksWithoutEmptyQuote = useMemo(() => {
    return content?.blocks.filter(
      (block) => block?.type !== 'blockquote' || block?.text.replace(/\s/g, '')
    )
  }, [content])

  let contentState
  let editorState

  if (content) {
    contentState = convertFromRaw({
      ...content,
      blocks: blocksWithoutEmptyQuote,
    })
  }

  if (content) {
    editorState = EditorState.createWithContent(contentState, decorators)
  }

  return (
    <Container>
      <Content>
        {content && (
          <Editor
            onChange={() => {}}
            editorState={editorState}
            readOnly
            editorKey="editor"
            blockRendererFn={blockRendererFn}
          />
        )}
      </Content>
      <Credit>
        <p>
          記者｜{writers}；攝影｜{photographers}
        </p>
        <p>網頁｜{coworker}</p>
      </Credit>
    </Container>
  )
}
