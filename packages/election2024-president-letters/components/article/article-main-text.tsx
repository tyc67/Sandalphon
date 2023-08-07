import { useState } from 'react'
import FeedBackForm from '@readr-media/react-feedback'
import { Form } from '@readr-media/react-feedback/dist/typedef'
import styled, { css } from 'styled-components'
import { font, color, breakpoint } from '../../styles/theme'
import { feedbackFormId, emotionFieldId } from '../../config'
import SVGAddEmojiSmall from '../../public/icon/add-emoji-small.svg'
import SVGAddEmojiLarge from '../../public/icon/add-emoji-large.svg'

const { text } = color
const { body, body2, tiny } = font

type Forms = { forms: Form[] }
const feedBackFormSetting: Forms = {
  forms: [
    {
      id: feedbackFormId,
      name: 'feedback-like',
      type: 'form',
      active: true,
      fieldsCount: 1,
      fields: [
        {
          id: emotionFieldId,
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
const defaultMarginBottom = css`
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
`

const Text = styled.p`
  ${bodyFont};
`

const MainText = styled(Text)`
  color: ${text.important};
  max-width: 600px;

  ${breakpoint.xl} {
    width: 600px;
  }
`

const FeedBackFormWrapperDesktop = styled.div`
  display: none;
  ${breakpoint.xl} {
    display: block;
    position: relative;

    .form-feedback {
      display: none;
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      z-index: 1;
      padding: 16px 32px 8px 32px;
      border-radius: 100px;
      width: 344px;
      height: 89px;
      //title
      .fnOpuD {
        display: none;
      }
      &::after {
        content: '';
        border: 6px solid transparent;
        position: absolute;
        border-bottom-color: white;
        border-top: 0;
        top: -6px;
        left: 50%;
        margin-left: -6px;
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  ${MaxWidth};
  ${defaultPadding};
  ${defaultMarginBottom};
  ${breakpoint.xl} {
    max-width: inherit;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    &:hover {
      ${FeedBackFormWrapperDesktop} {
        .form-feedback {
          display: block;
        }
        button {
          color: ${text.important};
          .large {
            path {
              fill: ${text.important};
            }
          }
        }
      }
    }
  }
`
const EmojiWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${breakpoint.xl} {
    display: none;
  }
`

const Emoji = styled.div`
  ${tinyFont};
  color: ${text.secondary};
  &:focus {
    color: ${text.important};
  }
`
const EmojiDesktop = styled(Emoji)`
  display: none;
  font-size: ${body2.size};
  line-height: ${body2.lineHeight};
  font-weight: ${body2.weight};
  text-align: end;
  ${breakpoint.xl} {
    display: block;
    margin-right: 12px;
  }
`

const AddEmojiButton = styled.button`
  ${tinyFont};
  display: flex;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  color: ${text.secondary};

  .small,
  .large {
    margin-right: 4px;
    path {
      fill: ${text.secondary};
    }
  }
  &:focus {
    color: ${text.important};
    .small,
    .large {
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

const AddEmojiButtonDesktop = styled(AddEmojiButton)`
  display: none;
  ${breakpoint.xl} {
    display: flex;
    margin-left: 0px;
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

  ${({ shouldShowFeedBack }) =>
    shouldShowFeedBack
      ? 'transform: translateY(0%)'
      : 'transform: translateY(100%)'};
  overflow-x: hidden;
  transition: ${({ shouldShowFeedBack }) =>
    shouldShowFeedBack
      ? 'transform 0.3s ease-in-out'
      : 'transform 0.3s 0.3s ease-in-out'};
  .close-background {
    position: fixed;
    height: 100vh;
    width: 100%;
    background-color: ${({ shouldShowFeedBack }) =>
      shouldShowFeedBack ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    transition: ${({ shouldShowFeedBack }) =>
      shouldShowFeedBack
        ? 'background-color 0.3s 0.3s ease-in-out'
        : 'background-color 0.3s ease-in-out'};
  }
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
  const handleClose = () => {
    setShouldShowFeedBack(false)
  }
  const handleOpen = () => {
    setShouldShowFeedBack(true)
  }
  return (
    <Wrapper>
      {shouldShowEmojiFeature && <EmojiDesktop>心情123456</EmojiDesktop>}
      <MainText>{value}</MainText>
      {shouldShowEmojiFeature && (
        <FeedBackFormWrapperDesktop>
          <AddEmojiButtonDesktop>
            <SVGAddEmojiLarge className="large" />
            <span>加入心情</span>
          </AddEmojiButtonDesktop>

          <FeedBackForm
            shouldUseRecaptcha={false}
            {...feedBackFormSetting}
          ></FeedBackForm>
        </FeedBackFormWrapperDesktop>
      )}
      {shouldShowEmojiFeature && (
        <EmojiWrapper>
          <Emoji>心情123456</Emoji>
          <AddEmojiButton onClick={handleOpen}>
            <SVGAddEmojiSmall className="small" />
            <span>加入心情</span>
          </AddEmojiButton>
        </EmojiWrapper>
      )}
      {shouldShowEmojiFeature && (
        <FeedBackFormWrapper
          shouldShowFeedBack={shouldShowFeedBack}
          className="epl-feed-back-form-wrapper"
        >
          <div className="close-background" onClick={handleClose}></div>
          <FeedBackForm
            shouldUseRecaptcha={false}
            {...feedBackFormSetting}
          ></FeedBackForm>
        </FeedBackFormWrapper>
      )}
    </Wrapper>
  )
}
