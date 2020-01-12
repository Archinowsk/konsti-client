// @flow
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { postFeedback } from 'services/feedbackServices';
import type { Game } from 'flow/game.flow';
import type { StatelessFunctionalComponent, Element } from 'react';

export type Props = {|
  game: Game,
|};

export const FeedbackForm: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { game } = props;

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [feedbackValue, setFeedbackValue] = React.useState<string>('');
  const [feedbackSent, setFeedbackSent] = React.useState<boolean>(false);

  const { t } = useTranslation();

  // Hide / show clicked
  const sendFeedbackEvent = async (): Promise<void> => {
    setSubmitting(true);

    const feedbackData = {
      gameId: game.gameId,
      feedback: feedbackValue,
    };

    try {
      await postFeedback(feedbackData);
    } catch (error) {
      console.log(`postFeedback error:`, error);
    }
    setFeedbackSent(true);
    setSubmitting(false);
  };

  const handleFeedbackChange = event => {
    setFeedbackValue(event.target.value);
  };

  return (
    <div className='feedback-form'>
      <p className='bold'>{t('feedbackTitle')}</p>
      <p>{t('feedbackInstruction')}</p>

      {!feedbackSent && (
        <Fragment>
          <textarea
            value={feedbackValue}
            onChange={handleFeedbackChange}
            className='feedback-textarea'
            rows='4'
          />

          <button disabled={submitting} onClick={() => sendFeedbackEvent()}>
            {t('button.sendFeedback')}
          </button>
        </Fragment>
      )}

      {feedbackSent && <p className='success'>{t('button.feedbackSent')}</p>}
    </div>
  );
};
