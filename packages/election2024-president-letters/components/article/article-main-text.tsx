import FeedBackForm from '@readr-media/react-feedback'
import { Form } from '@readr-media/react-feedback/dist/typedef'
import styled, { css } from 'styled-components'
import { font, color } from '../../styles/theme'
import { feedBackFormIds } from '../../config'

const { text } = color
const { body } = font

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
const MaxWidth = css`
  max-width: 640px; //todo: after implement like/dislike, should adjust this value
  margin-left: auto;
  margin-right: auto;
`

const Text = styled.p`
  ${bodyFont};
  ${defaultMargin};
  ${defaultPadding};
  ${MaxWidth}
`

const MainText = styled(Text)`
  color: ${text.important};
`

type ArticleMainTextProps = {
  value: string
  shouldShowEmoji?: boolean
}
export default function ArticleMainText({
  value,
  shouldShowEmoji = true,
}: ArticleMainTextProps) {
  return (
    <>
      <MainText>{value}</MainText>
      {shouldShowEmoji && (
        <FeedBackForm {...feedBackFormSetting}></FeedBackForm>
      )}
    </>
  )
}
