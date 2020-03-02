import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { postFeedback } from 'services/feedbackServices';
import { Game } from 'typings/game.typings';

export interface Props {
  game: Game;
}

export const FeedbackForm: FC<Props> = (props: Props): ReactElement => {
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
        <>
          <textarea
            value={feedbackValue}
            onChange={handleFeedbackChange}
            className='feedback-textarea'
            rows={4}
          />

          <button disabled={submitting} onClick={() => sendFeedbackEvent()}>
            {t('button.sendFeedback')}
          </button>
        </>
      )}

      {feedbackSent && <p className='success'>{t('button.feedbackSent')}</p>}
    </div>
  );
};
