/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { postFeedback } from 'services/feedbackServices'

type Props = {
  t: Function,
  game: Object,
}

type State = {
  submitting: boolean,
  feedbackValue: string,
  feedbackSent: boolean,
}

class FeedbackForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      submitting: false,
      feedbackValue: '',
      feedbackSent: false,
    }
  }

  // Hide / unhide clicked
  sendFeedbackEvent = async () => {
    const { game } = this.props
    const { feedbackValue } = this.state

    this.setState({ submitting: true })

    const feedbackData = {
      id: game.id,
      feedback: feedbackValue,
    }

    try {
      await postFeedback(feedbackData)
    } catch (error) {
      console.log(`postFeedback error: ${error}`)
    }
    this.setState({ feedbackSent: true, submitting: false })
  }

  render() {
    const { t } = this.props
    const { submitting, feedbackValue, feedbackSent } = this.state

    const handleFeedbackChange = event => {
      this.setState({ feedbackValue: event.target.value })
    }

    return (
      <div>
        {!feedbackSent && (
          <React.Fragment>
            <textarea
              value={feedbackValue}
              onChange={handleFeedbackChange}
              className="feedback-textarea"
              rows="4"
            />

            <button
              disabled={submitting}
              onClick={() => this.sendFeedbackEvent()}
            >
              {t('button.sendFeedback')}
            </button>
          </React.Fragment>
        )}

        {feedbackSent && <p className="success">{t('button.feedbackSent')}</p>}
      </div>
    )
  }
}

export default translate()(FeedbackForm)
