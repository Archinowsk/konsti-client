/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { postFeedback } from 'services/feedbackServices'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {|
  game: Game,
|}

export const FeedbackForm: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { game } = props

  const [submitting, setSubmitting] = React.useState(false)
  ;(submitting: boolean)

  const [feedbackValue, setFeedbackValue] = React.useState('')
  ;(feedbackValue: string)

  const [feedbackSent, setFeedbackSent] = React.useState(false)
  ;(feedbackSent: boolean)

  const { t } = useTranslation()

  // Hide / unhide clicked
  const sendFeedbackEvent = async () => {
    setSubmitting(true)

    const feedbackData = {
      gameId: game.gameId,
      feedback: feedbackValue,
    }

    try {
      await postFeedback(feedbackData)
    } catch (error) {
      console.log(`postFeedback error:`, error)
    }
    setFeedbackSent(true)
    setSubmitting(false)
  }

  const handleFeedbackChange = event => {
    setFeedbackValue(event.target.value)
  }

  return (
    <div className='feedback-form'>
      <p className='bold'>{t('feedbackTitle')}</p>
      <p>{t('feedbackInstruction')}</p>

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
