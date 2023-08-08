import styled from 'styled-components'
import FeedbackForm from '@readr-media/react-feedback'
import type { Form as FormType } from '@readr-media/react-feedback/dist/typedef'
import { feedbackFormId, textFieldId } from '../../config'
import { breakpoint } from '../../styles/theme'
import { useInView } from 'react-intersection-observer'

const FormWrapper = styled.div`
  background-color: #e5e5e5;

  .field-comment {
    margin-top: 0px;
    margin-bottom: 0px;
    .input-control > button[disabled] {
      background-color: #bbbbbb;
    }

    .input-control > button:not([disabled]) {
      background-color: #000000;
      color: #ffffff;

      &:hover,
      &:active {
        background-color: #4d4d4d;
      }
    }

    ${breakpoint.md} {
      .input-control > button {
        width: 120px;
      }
    }

    .list-container {
      margin-bottom: 20px;

      ${breakpoint.md} {
        margin-bottom: 40px;
      }

      .comment-wrapper {
        background-color: #ffffff;
      }
      .comment-wrapper:not(:first-child) {
        margin-top: 8px;
      }

      .list-control > button {
        color: rgba(0, 0, 0, 0.87);
        border: 1px solid rgba(0, 0, 0, 0.87);
        margin-top: 0px;

        &:hover,
        &:active {
          background-color: #edeff2;
        }
      }
    }
  }
`

const FormTitle = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  padding-top: 20px;
  margin-bottom: 12px;
  text-align: center;

  ${breakpoint.md} {
    font-size: 24px;
    padding-top: 40px;
  }
`

type FeedbackFormWrapperProps = {
  identifier: string
  candidate: string
  nameColor: string
}

export default function FeedbackFormWrapper({
  identifier,
  candidate,
  nameColor,
}: FeedbackFormWrapperProps) {
  const forms: FormType[] = [
    {
      id: feedbackFormId,
      fields: [
        {
          id: textFieldId,
          name: '分享你的想法...',
          type: 'text',
          identifier,
          commentListTitle: '',
          shouldShowItemControl: false,
        },
      ],
    },
  ]

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  return (
    <FormWrapper ref={ref}>
      <FormTitle>
        回覆給<span style={{ color: nameColor }}>{candidate}</span>
      </FormTitle>
      {inView && (
        <FeedbackForm
          forms={forms}
          storageKey="election2024-president-letters"
        />
      )}
    </FormWrapper>
  )
}
