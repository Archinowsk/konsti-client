// @flow
import React, { Fragment } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { AllGamesList } from 'views/all-games/components/AllGamesList'
import { getUpcomingGames } from 'utils/getUpcomingGames'
import { loadGames } from 'utils/loadData'
import { config } from 'config'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const AllGamesView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const { t } = useTranslation()

  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const testTime: string = useSelector(state => state.admin.testTime)
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  )

  const [selectedView, setSelectedView] = React.useState('upcoming')
  ;(selectedView: string)

  const [selectedTag, setSelectedTag] = React.useState('')
  ;(selectedTag: string)

  const [loading, setLoading] = React.useState(false)
  ;(loading: boolean)

  const store = useStore()

  React.useEffect(() => {
    setLoading(true)
    const fetchData = async (): Promise<any> => {
      await loadGames(store)
      setLoading(false)
    }
    fetchData()
  }, [store])

  const getVisibleGames = (
    games: $ReadOnlyArray<Game>
  ): $ReadOnlyArray<Game> => {
    const filteredGames = getTagFilteredGames(games)

    const visibleGames = filteredGames.filter(game => {
      const hidden = hiddenGames.find(
        hiddenGame => game.gameId === hiddenGame.gameId
      )
      if (!hidden) return game
    })

    if (selectedView === 'upcoming') {
      return getUpcomingGames(visibleGames, testTime)
    } else if (selectedView === 'revolving-door') {
      return getUpcomingGames(visibleGames, testTime).filter(
        game => game.revolvingDoor
      )
    }

    return visibleGames
  }

  const getTagFilteredGames = (
    games: $ReadOnlyArray<Game>
  ): $ReadOnlyArray<Game> => {
    if (!selectedTag) return games
    return games.filter(game => game.tags.includes(selectedTag))
  }

  const tags = ['in-english', 'aloittelijaystavallinen', 'sopii-lapsille']

  const tagsList = () => {
    return tags.map(tag => {
      return (
        <option key={tag} value={tag}>
          {tag === 'in-english' && t(`gameTags.inEnglish`)}
          {tag === 'aloittelijaystavallinen' && t(`gameTags.beginnerFriendly`)}
          {tag === 'sopii-lapsille' && t(`gameTags.childrenFriendly`)}
        </option>
      )
    })
  }

  const getRunningRevolvingDoorGames = (games: $ReadOnlyArray<Game>) => {
    const { useTestTime } = config
    const timeNow = useTestTime ? moment(testTime) : moment()
    const runningGames = games.filter(game => {
      return (
        game.revolvingDoor &&
        moment(game.startTime).isBefore(timeNow) &&
        moment(game.endTime).isAfter(timeNow)
      )
    })

    if (!runningGames || runningGames.length === 0) {
      return <p>{t('noCurrentlyRunningGames')}</p>
    }
    return runningGames.map(game => {
      return (
        <div key={game.gameId} className='games-list'>
          <Link to={`/games/${game.gameId}`}>{game.title}</Link>{' '}
          <p className='game-list-short-description'>
            {game.shortDescription ? game.shortDescription : game.gameSystem}
          </p>
        </div>
      )
    })
  }

  return (
    <Fragment>
      <div className='all-games-visibility-bar'>
        <div className='all-games-toggle-visibility'>
          <button
            onClick={() => setSelectedView('upcoming')}
            disabled={selectedView === 'upcoming'}
          >
            {t('upcomingGames')}
          </button>

          <button
            onClick={() => setSelectedView('all')}
            disabled={selectedView === 'all'}
          >
            {t('allGames')}
          </button>

          <button
            onClick={() => setSelectedView('revolving-door')}
            disabled={selectedView === 'revolving-door'}
          >
            {t('revolvingDoor')}
          </button>
        </div>

        <div className='tags-dropdown'>
          <span className={'choose-tag-instruction'}>{t('chooseTag')} </span>
          <select
            onChange={event => setSelectedTag(event.target.value)}
            value={selectedTag}
          >
            <option value=''>{t('allGames')}</option>
            {tagsList()}
          </select>
        </div>
      </div>

      {selectedView === 'revolving-door' && (
        <Fragment>
          <div className='revolving-door-instruction'>
            {t('revolvingDoorInstruction')}
          </div>
          <div className='running-revolving-door-games'>
            <h3>{t('currentlyRunningRevolvingDoor')}</h3>
            {getRunningRevolvingDoorGames(games)}
          </div>
        </Fragment>
      )}

      <AllGamesList games={getVisibleGames(games)} />
    </Fragment>
  )
}
