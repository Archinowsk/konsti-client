/* @flow */
import React, { Fragment } from 'react'
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
      tagsList.push(`noLanguage`)
    }

    if (game.englishOk || game.tags.includes('in-english')) {
      tagsList.push(`englishOk`)
    }

    if (game.childrenFriendly) {
      tagsList.push(`childrenFriendly`)
    }

    if (game.ageRestricted) {
      tagsList.push(`ageRestricted`)
    }

    if (game.beginnerFriendly) {
      tagsList.push(`beginnerFriendly`)
    }

    if (game.intendedForExperiencedParticipants) {
      tagsList.push(`intendedForExperiencedParticipants`)
    }

    return tagsList.map(tag => t(`gameTags.${tag}`)).join(', ')
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
        <div className='game-details-row game-details-row-with-subtext'>
          <h3 className='game-details-title'>{game.title}</h3>
        </div>
      )}

      {game.shortDescription && (
        <div className='game-details-row game-details-subtext'>
          <span className='game-details-text-indent italic'>
            {game.shortDescription}
          </span>
        </div>
      )}

      {game.people && (
        <div className='game-details-row game-details-row-with-gap'>
          <span className='game-details-text-indent'>{game.people}</span>
        </div>
      )}

      {game.revolvingDoor && (
        <Fragment>
          <div className='game-details-row game-details-row-with-subtext'>
            <span className='game-details-title'>
              {t('gameInfo.revolvingDoor')}
            </span>
          </div>

          <div className='game-details-row game-details-subtext game-details-row-with-gap'>
            <span className='game-details-text-indent'>
              {t('gameInfo.revolvingDoorDescription')}
            </span>
          </div>
        </Fragment>
      )}

      {game.ageRestricted && (
        <Fragment>
          <div className='game-details-row game-details-row-with-subtext'>
            <span className='game-details-title'>
              {t('gameTags.ageRestrictedTitle')}
            </span>
          </div>

          <div className='game-details-row game-details-subtext game-details-row-with-gap'>
            <span className='game-details-text-indent'>
              {t('gameTags.ageRestrictedLong')}
            </span>
          </div>
        </Fragment>
      )}

      {!!game.mins && (
        <div className='game-details-row'>
          <span className='game-details-title game-details-two-columns'>
            {t('gameInfo.runTime')}
          </span>
          <span className='game-details-value'>
            {formattedStartTime} - {formattedEndTime} ({game.mins / 60}{' '}
            {t('hours')})
          </span>
        </div>
      )}

      {game.genres.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title game-details-two-columns'>
            {t('gameInfo.genres')}
          </span>
          <span className='game-details-value'>{getGenres(game.genres)}</span>
        </div>
      )}

      {tagsList.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title game-details-two-columns'>
            {t('gameInfo.tags')}
          </span>
          <span className='game-details-value'>{t(tagsList)}</span>
        </div>
      )}

      {game.description && (
        <Fragment>
          <div className='game-details-row'>
            <span className='game-details-title'>
              {t('gameInfo.description')}
            </span>
          </div>
          <div className='game-details-row game-details-row-with-gap'>
            <span>{game.description}</span>
          </div>
        </Fragment>
      )}

      {game.gameSystem && (
        <div className='game-details-row'>
          <span className='game-details-title game-details-two-columns'>
            {t('gameInfo.gamesystem')}
          </span>
          <span className='game-details-value'>{game.gameSystem}</span>
        </div>
      )}

      {game.styles.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title game-details-two-columns'>
            {t('gameInfo.gameStyle')}
          </span>
          <span className='game-details-value'>{getStyles(game.styles)}</span>
        </div>
      )}

      {game.location && (
        <div className='game-details-row'>
          <span className='game-details-title game-details-two-columns'>
            {t('gameInfo.location')}
          </span>
          <span className='game-details-value'>{game.location}</span>
        </div>
      )}

      {!!game.minAttendance && !!game.maxAttendance && (
        <div className='game-details-row'>
          <span className='game-details-title game-details-two-columns'>
            {t('gameInfo.numberOfPlayers')}
          </span>
          <span className='game-details-value'>
            {game.minAttendance} - {game.maxAttendance}
          </span>
        </div>
      )}
    </div>
  )
}
