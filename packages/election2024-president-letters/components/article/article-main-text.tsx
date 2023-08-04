import { useState } from 'react'
import FeedBackForm from '@readr-media/react-feedback'
import { Form } from '@readr-media/react-feedback/dist/typedef'
import styled, { css } from 'styled-components'
import { font, color, breakpoint } from '../../styles/theme'
import { feedBackFormIds } from '../../config'
import SVGAddEmojiSmall from '../../public/icon/add-emoji-small.svg'
import SVGAddEmojiLarge from '../../public/icon/add-emoji-large.svg'

const { text } = color
const { body, tiny } = font

type Forms = { forms: Form[] }
const feedBackFormSetting: Forms = {
  forms: [
    {
      id: feedBackFormIds.formId,
      name: 'feedback-like',
      type: 'form',
      active: true,
      fieldsCount: 1,
      fields: [
        {
          id: feedBackFormIds.fieldId.emoji,
          name: '按讚訂閱留言開啟小鈴鐺',
          type: 'single',
          status: 'published',
          sortOrder: null,
        },
      ],
    },
  ],
}

const defaultPadding = css`
  padding-left: 20px;
  padding-right: 20px;
`
const defaultMargin = css`
  margin-bottom: 24px;
`

const bodyFont = css`
  font-size: ${body.size};
  line-height: ${body.lineHeight};
  font-weight: ${body.weight};
`

const tinyFont = css`
  font-size: ${tiny.size};
  line-height: ${tiny.lineHeight};
  font-weight: ${tiny.weight};
`
const MaxWidth = css`
  max-width: 640px; //todo: after implement like/dislike, should adjust this value
  margin-left: auto;
  margin-right: auto;
`

const Text = styled.p`
  ${bodyFont};
`

const MainText = styled(Text)`
  color: ${text.important};
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${MaxWidth};
  ${defaultPadding};
  ${defaultMargin};
`
const EmojiWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Emoji = styled.div`
  ${tinyFont};
  color: ${text.secondary};
  &:focus {
    color: ${text.important};
  }
`

const AddEmojiButton = styled.button`
  ${tinyFont};
  display: flex;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  color: ${text.secondary};
  svg {
    margin-right: 4px;
    path {
      fill: ${text.secondary};
    }
  }
  &:focus {
    color: ${text.important};
    svg {
      path {
        fill: ${text.important};
      }
    }
  }
  .small {
    display: block;
  }
  .large {
    display: none;
  }

  ${breakpoint.xl} {
    .small {
      display: none;
    }
    .large {
      display: block;
    }
  }
`

const FeedBackFormWrapper = styled.div<{ shouldShowFeedBack: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: end;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  font-size: 14px;
  line-height: 1.5;
  z-index: 539;
  overflow-y: auto;
  background-color: ${({ shouldShowFeedBack }) =>
    shouldShowFeedBack ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  ${({ shouldShowFeedBack }) =>
    shouldShowFeedBack
      ? 'transform: translateY(0%)'
      : 'transform: translateY(100%)'};
  overflow-x: hidden;
  transition: ${({ shouldShowFeedBack }) =>
    shouldShowFeedBack
      ? 'transform 0.3s ease-in-out, background-color 0.3s 0.3s ease-in-out'
      : 'transform 0.3s 0.3s ease-in-out, background-color 0.3s ease-in-out'};

  .form-feedback {
    padding: 20px;
    width: 100%;
    position: relative;
    background-color: white;
    border-radius: 20px 20px 0 0;
    margin: auto auto 0 auto;
  }
  ${breakpoint.md} {
    .form-feedback {
      width: 100%;
    }
  }
  ${breakpoint.xl} {
    display: none;
  }
`

type ArticleMainTextProps = {
  value: string
  shouldShowEmojiFeature?: boolean
}
export default function ArticleMainText({
  value,
  shouldShowEmojiFeature = true,
}: ArticleMainTextProps) {
  const [shouldShowFeedBack, setShouldShowFeedBack] = useState(false)
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLDivElement
    const eventTargetClassName = eventTarget.className
    if (eventTargetClassName.includes('epl-feed-back-form-wrapper')) {
      setShouldShowFeedBack(false)
    }
  }
  const handleOpen = () => {
    setShouldShowFeedBack(true)
  }
  return (
    <Wrapper>
      <MainText>{value}</MainText>
      <EmojiWrapper>
        <Emoji>心情123456</Emoji>
        <AddEmojiButton onClick={handleOpen}>
          <SVGAddEmojiSmall className="small" />
          <SVGAddEmojiLarge className="large" />
          <span>加入心情</span>
        </AddEmojiButton>
      </EmojiWrapper>
      {shouldShowEmojiFeature && (
        <FeedBackFormWrapper
          shouldShowFeedBack={shouldShowFeedBack}
          className="epl-feed-back-form-wrapper"
          onClick={handleClose}
        >
          <FeedBackForm {...feedBackFormSetting}></FeedBackForm>
        </FeedBackFormWrapper>
      )}
    </Wrapper>
  )
}
