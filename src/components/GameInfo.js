/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'

export type Props = {
  game: Game,
}

const GameInfo = (props: Props) => {
  const { game } = props
  const { t } = useTranslation()

  if (!game) return <p />

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
        <li key={'ageRestricted'}>
          {t(`gameTags.ageRestricted`)} ({t(`gameTags.ageRestrictedLong`)})
        </li>
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

  const getGenres = () => {
    let genresList = []
    if (game.genres) {
      genresList = game.genres.map(genre => (
        <li key={genre}>{t(`genre.${genre}`)}</li>
      ))
    }

    return genresList
  }

  const getStyles = () => {
    let stylesList = []
    if (game.styles) {
      stylesList = game.styles.map(style => (
        <li key={style}>{t(`gameStyle.${style}`)}</li>
      ))
    }

    return stylesList
  }

  const tagsList = getTags()
  const genresList = getGenres()
  const stylesList = getStyles()
  const formattedStartTime = timeFormatter.weekdayAndTime(game.startTime)
  const formattedEndTime = timeFormatter.timeOnly(game.endTime)

  return (
    <div>
      {game.title && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.title')}</span>
          {game.title}
        </div>
      )}
      {game.people && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.gamemaster')}</span>
          {game.people}
        </div>
      )}
      {genresList.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.genres')}</span>
          <ul>{genresList}</ul>
        </div>
      )}
      {tagsList.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.tags')}</span>
          <ul>{tagsList}</ul>
        </div>
      )}
      {game.mins && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.runTime')}</span>
          {formattedStartTime} - {formattedEndTime} ({game.mins / 60}{' '}
          {t('hours')})
        </div>
      )}
      {game.description && (
        <div className='game-details-row'>
          <span className='game-details-title'>
            {t('gameInfo.description')}
          </span>
          {game.description}
        </div>
      )}
      {game.gameSystem && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.gamesystem')}</span>
          {game.gameSystem}
        </div>
      )}
      {stylesList.length > 0 && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.gameStyle')}</span>
          <ul>{stylesList}</ul>
        </div>
      )}
      {game.location && (
        <div className='game-details-row'>
          <span className='game-details-title'>{t('gameInfo.location')}</span>
          {game.location}
        </div>
      )}
      {game.minAttendance && game.maxAttendance && (
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

export default GameInfo
