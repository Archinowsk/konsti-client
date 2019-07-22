/* @flow */
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GameDetails from 'views/all-games/components/GameDetails'
import { AllGamesList } from 'views/all-games/components/AllGamesList'
import { getUpcomingGames } from 'utils/getUpcomingGames'
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

  const [showAllGames, setShowAllGames] = React.useState(false)
  ;(showAllGames: boolean)

  const [selectedTag, setSelectedTag] = React.useState('')
  ;(selectedTag: string)

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

    if (showAllGames) return visibleGames

    return getUpcomingGames(visibleGames, testTime)
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

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path='/games'
          render={() => (
            <Fragment>
              <div className='all-games-visibility-bar'>
                <div className='all-games-toggle-visibility'>
                  <button
                    onClick={() => setShowAllGames(false)}
                    disabled={!showAllGames}
                  >
                    {t('upcomingGames')}
                  </button>

                  <button
                    onClick={() => setShowAllGames(true)}
                    disabled={showAllGames}
                  >
                    {t('allGames')}
                  </button>
                </div>

                <div className='tags-dropdown'>
                  <span>{t('chooseTag')} </span>
                  <select
                    onChange={event => setSelectedTag(event.target.value)}
                    value={selectedTag}
                  >
                    <option value=''>{t('allGames')}</option>
                    {tagsList()}
                  </select>
                </div>
              </div>
              <AllGamesList games={getVisibleGames(games)} />
            </Fragment>
          )}
        />
        <Route path='/games/:id' render={() => <GameDetails />} />
      </Switch>
    </Fragment>
  )
}
