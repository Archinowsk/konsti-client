/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { postFeedback } from 'services/feedbackServices'

type Props = {
  game: Object,
}

type State = {
  submitting: boolean,
  feedbackValue: string,
  feedbackSent: boolean,
}

const FeedbackForm = (props: Props, state: State) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [feedbackValue, setFeedbackValue] = React.useState('')
  const [feedbackSent, setFeedbackSent] = React.useState(false)
  const { t } = useTranslation()

  // Hide / unhide clicked
  const sendFeedbackEvent = async () => {
    const { game } = props

    setSubmitting(true)

    const feedbackData = {
      id: game.id,
      feedback: feedbackValue,
    }

    try {
      await postFeedback(feedbackData)
    } catch (error) {
      console.log(`postFeedback error: ${error}`)
    }
    setFeedbackSent(true)
    setSubmitting(false)
  }

  const handleFeedbackChange = event => {
    setFeedbackValue(event.target.value)
  }

  return (
    <div>
      {!feedbackSent && (
        <React.Fragment>
          <textarea
            value={feedbackValue}
            onChange={handleFeedbackChange}
            className='feedback-textarea'
            rows='4'
          />

          <button disabled={submitting} onClick={() => sendFeedbackEvent()}>
            {t('button.sendFeedback')}
          </button>
        </React.Fragment>
      )}

      {feedbackSent && <p className='success'>{t('button.feedbackSent')}</p>}
    </div>
  )
}

export default FeedbackForm
