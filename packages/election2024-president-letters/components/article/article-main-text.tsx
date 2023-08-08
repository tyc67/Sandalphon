import axios from 'axios'
import { useState, useMemo, useEffect, useCallback, useContext } from 'react'
import FeedBackForm from '@readr-media/react-feedback'
import type {
  Form,
  SingleField,
  NotifyObject,
} from '@readr-media/react-feedback/dist/typedef'
import type { ExtendedOption } from '../../types'
import styled, { css } from 'styled-components'
import { font, color, breakpoint } from '../../styles/theme'
import {
  feedbackFormId,
  emotionFieldId,
  optionApiUrl,
  imagePrefix,
} from '../../config'
import SVGAddEmojiSmall from '../../public/icon/add-emoji-small.svg'
import EmojiSummary from './emoji-summary'
import { EmojiContext } from '../../context/emoji'
import { useInView } from 'react-intersection-observer'

import { textFont } from '../../styles/shared-style'
const { text } = color
const { body2, tiny } = font

const defaultPadding = css`
  padding-left: 20px;
  padding-right: 20px;
`
const defaultMarginBottom = css`
  margin-bottom: 24px;
`

const tinyFont = css`
  font-size: ${tiny.size};
  line-height: ${tiny.lineHeight};
  font-weight: ${tiny.weight};
`
const MaxWidth = css`
  max-width: 640px; //todo: after implement like/dislike, should adjust this value
`
const hideAndShowAnimation = css<{ shouldShowEmojiFeature: boolean }>`
  opacity: ${({ shouldShowEmojiFeature }) =>
    shouldShowEmojiFeature ? '1' : '0'};
  transition: 0.1s ease-in-out;
`
const MainText = styled.p`
  color: ${text.important};
  ${textFont};
  max-width: 600px;
  margin-bottom: 4px;
  ${breakpoint.xl} {
    margin-bottom: 0;
    width: 600px;
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
  }
`
const EmojiWrapper = styled.div<{
  shouldShowEmoji: boolean
  shouldShowEmojiFeature: boolean
}>`
  display: flex;
  ${hideAndShowAnimation}
  justify-content: space-between;
  align-items: center;
  .form-feedback {
    display: none;
  }

  ${breakpoint.lg} {
    position: relative;

    .form-feedback {
      display: ${({ shouldShowEmoji }) => (shouldShowEmoji ? 'block' : 'none')};
      position: absolute;
      top: 40px;
      right: calc(334px * -1 / 2 + 34px);
      background-color: white;
      z-index: 1;
      padding: 16px 32px 8px 32px;
      border-radius: 100px;
      width: 344px;
      height: 89px;
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

  ${breakpoint.xl} {
    .form-feedback {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const EmojiSummaryWrapper = styled.div`
  ${tinyFont};
  color: ${text.secondary};
  display: inline-flex;

  ${breakpoint.xl} {
    display: none;
  }
`
const EmojiSummaryWrapperDesktop = styled(EmojiSummaryWrapper)<{
  shouldShowEmojiFeature: boolean
}>`
  display: none;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: ${body2.size};
  line-height: ${body2.lineHeight};
  font-weight: ${body2.weight};
  text-align: end;
  ${breakpoint.xl} {
    display: block;
    ${hideAndShowAnimation};
    margin-right: 12px;
  }
`

const emojiActiveEffect = css`
  color: ${text.important};
  svg {
    path {
      fill: ${text.important};
    }
  }
`

const AddEmojiButton = styled.button<{
  isActive: boolean
  shouldShowEmojiFeature: boolean
}>`
  ${tinyFont};
  display: flex;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  color: ${text.secondary};
  cursor: ${({ shouldShowEmojiFeature }) =>
    shouldShowEmojiFeature ? 'pointer' : 'default'};
  svg {
    display: block;
    margin-right: 4px;
    path {
      fill: ${text.secondary};
    }
  }
  &:focus {
    ${emojiActiveEffect}
  }

  ${breakpoint.xl} {
    width: 160px;
    justify-content: flex-start;
  }

  .selected-text {
    order: 1;
    margin-right: 6px;
  }

  .selected-image-wrapper {
    order: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: #efefef;
    border-radius: 50%;

    > img {
      width: calc(100% - 4px);
      height: calc(100% - 4px);
    }
  }

  ${({ isActive }) => isActive && emojiActiveEffect}

  ${breakpoint.xl} {
    .selected-text {
      order: 2;
      margin-left: 6px;
      margin-right: 0;
    }
    .selected-image-wrapper {
      order: 1;
    }
  }
`

const HiddenMask = styled.div<{ shouldShow: boolean }>`
  display: ${({ shouldShow }) => (shouldShow ? 'block' : 'none')};
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
`

const EmojiFormWrapper = styled.div<{
  shouldShowEmoji: boolean
  shouldShowEmojiFeature: boolean
}>`
  position: fixed;
  display: ${({ shouldShowEmojiFeature }) =>
    shouldShowEmojiFeature ? 'flex' : 'none'};
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

  ${({ shouldShowEmoji }) =>
    shouldShowEmoji
      ? 'transform: translateY(0%)'
      : 'transform: translateY(100%)'};
  overflow-x: hidden;
  transition: ${({ shouldShowEmoji }) =>
    shouldShowEmoji
      ? 'transform 0.3s ease-in-out'
      : 'transform 0.3s 0.3s ease-in-out'};
  .close-background {
    position: fixed;
    height: 100vh;
    width: 100%;
    background-color: ${({ shouldShowEmoji }) =>
      shouldShowEmoji ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
    transition: ${({ shouldShowEmoji }) =>
      shouldShowEmoji
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

    .option-statistic {
      display: none;
    }
  }
  ${breakpoint.lg} {
    display: none;
    .form-feedback {
      width: 100%;
    }
  }
`

type ArticleMainTextProps = {
  sectionId: string
  value: string
  hasFeedBackFeature: boolean
  emojiFormId: string
  onEmojiFormToggle: (
    /* eslint-disable-line no-unused-vars */ formId: string
  ) => void
}
export default function ArticleMainText({
  sectionId,
  value,
  hasFeedBackFeature,
  emojiFormId,
  onEmojiFormToggle,
}: ArticleMainTextProps) {
  const [initialized, setInitialized] = useState(false)
  const [shouldShowEmoji, setshouldShowEmoji] = useState(false)
  const [summary, setSummary] = useState<Record<string, number>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const { shouldShowEmoji: shouldShowEmojiFeature } = useContext(EmojiContext)

  const handleClose = () => {
    setshouldShowEmoji(false)
    if (typeof onEmojiFormToggle === 'function') onEmojiFormToggle('')
  }
  const handleOpen = () => {
    setshouldShowEmoji(true)
    if (typeof onEmojiFormToggle === 'function') onEmojiFormToggle(sectionId)
  }

  const isActive = useMemo(
    () => sectionId === emojiFormId,
    [sectionId, emojiFormId]
  )

  const updateSelectedOption = (option: string | null) => {
    if (!initialized) return

    if (option) {
      localStorage.setItem(sectionId, option)
    } else {
      localStorage.removeItem(sectionId)
    }
    setSelectedOption(option)
    handleClose()
  }

  const onOptionChanged = (data: NotifyObject) => {
    updateSelectedOption(data.selectedOption)
    if (data.optionSummary) setSummary(data.optionSummary)
  }

  const options: ExtendedOption[] = [
    {
      name: '很讚',
      value: 'good',
      iconUrl: `${imagePrefix}/icon/good.svg`,
      sortOrder: 1,
    },
    {
      name: '超愛',
      value: 'very-good',
      iconUrl: `${imagePrefix}/icon/very-good.svg`,
      sortOrder: 2,
    },
    {
      name: '想哭',
      value: 'sad',
      iconUrl: `${imagePrefix}/icon/sad.svg`,
      sortOrder: 3,
    },
    {
      name: '驚訝',
      value: 'shock',
      iconUrl: `${imagePrefix}/icon/shock.svg`,
      sortOrder: 4,
    },
    {
      name: '生氣',
      value: 'angry',
      iconUrl: `${imagePrefix}/icon/angry.svg`,
      sortOrder: 5,
    },
  ]

  const singleField: SingleField = {
    id: emotionFieldId,
    name: '這段讓你覺得...',
    type: 'single',
    identifier: sectionId,
    notifyUpstream: onOptionChanged,
    selectedItem: selectedOption ?? undefined,
    options,
  }

  const feedBackFormSetting: Form[] = [
    {
      id: feedbackFormId,
      name: 'feedback-emotion',
      fields: [singleField],
    },
  ]

  const optionMap = options.reduce(
    (prev: Record<string, ExtendedOption>, curr: ExtendedOption) => {
      const k = curr.value
      prev[k] = curr
      return prev
    },
    {}
  )

  const fetchOptionSummary = useCallback(
    () =>
      axios.get(optionApiUrl, {
        params: {
          form: feedbackFormId,
          field: emotionFieldId,
          identifier: sectionId,
        },
      }),
    [sectionId]
  )

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    if (hasFeedBackFeature && inView) {
      setSelectedOption(localStorage.getItem(sectionId))
      fetchOptionSummary()
        .then(({ data }) => {
          setSummary(data)
          setInitialized(true)
        })
        .catch((err) => console.error(err))
    }
  }, [sectionId, fetchOptionSummary, hasFeedBackFeature, inView])

  return (
    <Wrapper ref={ref}>
      {hasFeedBackFeature && inView && (
        <EmojiSummaryWrapperDesktop
          shouldShowEmojiFeature={shouldShowEmojiFeature}
        >
          <EmojiSummary emojiMap={optionMap} summary={summary} />
        </EmojiSummaryWrapperDesktop>
      )}
      <MainText>{value}</MainText>
      {hasFeedBackFeature && (
        <EmojiWrapper
          shouldShowEmoji={isActive}
          shouldShowEmojiFeature={shouldShowEmojiFeature}
        >
          {inView && (
            <EmojiSummaryWrapper>
              <EmojiSummary emojiMap={optionMap} summary={summary} />
            </EmojiSummaryWrapper>
          )}
          <AddEmojiButton
            onClick={handleOpen}
            isActive={isActive}
            shouldShowEmojiFeature={shouldShowEmojiFeature}
          >
            {selectedOption ? (
              <>
                <span className="selected-text">你的心情</span>
                <span className="selected-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={optionMap[selectedOption].iconUrl}
                    alt={optionMap[selectedOption].name}
                  />
                </span>
              </>
            ) : (
              <>
                <SVGAddEmojiSmall />
                <span>加入心情</span>
              </>
            )}
          </AddEmojiButton>
          <HiddenMask shouldShow={isActive} onClick={handleClose} />
          {inView && (
            <FeedBackForm
              shouldUseRecaptcha={false}
              forms={feedBackFormSetting}
              storageKey="election2024-president-letters"
            />
          )}
        </EmojiWrapper>
      )}

      {hasFeedBackFeature && (
        <EmojiFormWrapper
          shouldShowEmoji={shouldShowEmoji}
          shouldShowEmojiFeature={shouldShowEmojiFeature}
          className="epl-emoji-form-wrapper"
        >
          <div className="close-background" onClick={handleClose}></div>
          {inView && (
            <FeedBackForm
              shouldUseRecaptcha={false}
              forms={feedBackFormSetting}
              storageKey="election2024-president-letters"
            />
          )}
        </EmojiFormWrapper>
      )}
    </Wrapper>
  )
}
