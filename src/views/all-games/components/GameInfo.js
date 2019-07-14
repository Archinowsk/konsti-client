/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { timeFormatter } from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

export type Props = {|
  game: Game,
|}

export const GameInfo: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { game } = props
  const { t } = useTranslation()

  if (!game) return <div className='game-details' />

  const getTags = () => {
    const tagsList = []

    if (game.noLanguage) {
      tagsList.push(<li key={'noLanguage'}>{t(`gameTags.noLanguage`)}</li>)
    }

    if (game.englishOk) {
      tagsList.push(<li key={'englishOk'}>{t(`gameTags.englishOk`)}</li>)
    }

    if (game.childrenFriendly) {
      tagsList.push(
        <li key={'childrenFriendly'}>{t(`gameTags.childrenFriendly`)}</li>
      )
    }

    if (game.ageRestricted) {
      tagsList.push(
        <li key={'ageRestricted'}>{t(`gameTags.ageRestricted`)}</li>
      )
    }

    if (game.beginnerFriendly) {
      tagsList.push(
        <li key={'beginnerFriendly'}>{t(`gameTags.beginnerFriendly`)}</li>
      )
    }

    if (game.intendedForExperiencedParticipants) {
      tagsList.push(
        <li key={'intendedForExperiencedParticipants'}>
          {t(`gameTags.intendedForExperiencedParticipants`)}
        </li>
      )
    }

    return tagsList
  }

  const getGenres = (genresList: $ReadOnlyArray<string>) => {
    return genresList.map(genre => t(`genre.${genre}`)).join(', ')
  }

  const getStyles = (styles: $ReadOnlyArray<string>) => {
    return styles.map(style => t(`gameStyle.${style}`)).join(', ')
  }

  const tagsList = getTags()
  const formattedStartTime = timeFormatter.weekdayAndTime(game.startTime)
  const formattedEndTime = timeFormatter.time(game.endTime)

  return (
    <div className='game-details'>
      {game.title && (
        <div className='game-details-row'>
          <h3 className='game-details-title'>{game.title}</h3>
          {game.shortDescription && (
            <p className='game-details-subtext italic'>
              {game.shortDescription}
            </p>
          )}
        </div>
      )}

      {game.people && (
        <div className='game-details-row'>
          <span className='game-details-text'>{game.people}</span>
        </div>
      )}

      {game.revolvingDoor && (
        <div className='game-details-row'>
          <span className='game-details-title'>
            {t('gameInfo.revolvingDoor')}
          </span>
          <p className={'game-details-subtext'}>
            {t('gameInfo.revolvingDoorDescription')}
          </p>
        </div>
      )}

      {game.ageRestricted && (
        <div className='game-details-row'>
          <span className='game-details-title'>
            {t('gameTags.ageRestrictedTitle')}
          </span>
          <p className={'game-details-subtext'}>
            {t('gameTags.ageRestrictedLong')}
          </p>
        </div>
      )}

      {!!game.mins && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.runTime')}</span>
          {formattedStartTime} - {formattedEndTime} ({game.mins / 60}{' '}
          {t('hours')})
        </div>
      )}

      {game.genres.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.genres')}</span>
          {getGenres(game.genres)}
        </div>
      )}

      {tagsList.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.tags')}</span>
          <ul>{getTags()}</ul>
        </div>
      )}

      {game.description && (
        <div className='game-details-row'>
          <span className='game-details-title'>
            {t('gameInfo.description')}
          </span>
          <p className='game-description'>{game.description}</p>
        </div>
      )}

      {game.gameSystem && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.gamesystem')}</span>
          {game.gameSystem}
        </div>
      )}

      {game.styles.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.gameStyle')}</span>
          {getStyles(game.styles)}
        </div>
      )}

      {game.location && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.location')}</span>
          {game.location}
        </div>
      )}

      {!!game.minAttendance && !!game.maxAttendance && (
        <div className='game-details-row'>
          <span className='game-details-title'>
            {t('gameInfo.numberOfPlayers')}
          </span>
          {game.minAttendance} - {game.maxAttendance}
        </div>
      )}
    </div>
  )
}
