/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  t: Function,
  games: Array<any>,
}

class AllGamesList extends React.PureComponent<Props> {
  // Sort games by starting time and name
  sortGames = games => {
    const sortedGames = {}
    Object.keys(games)
      .sort()
      .forEach(key => {
        // Sort games by name
        sortedGames[key] = this.sortByNames(games[key])
      })

    return sortedGames
  }

  sortByNames = games => {
    return games.sort((a, b) => {
      const keyA = a.title.toLowerCase()
      const keyB = b.title.toLowerCase()
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
  }

  buildGamesList = games => {
    const { t } = this.props

    // Group all unique starting times
    const groupedGames = games.reduce((acc, sortedGame) => {
      acc[sortedGame['startTime']] = acc[sortedGame['startTime']] || []
      acc[sortedGame['startTime']].push(sortedGame)
      return acc
    }, {})

    const sortedGames = this.sortGames(groupedGames)

    const GamesList = []

    for (const [startTime, games] of Object.entries(sortedGames)) {
      const formattedStartTime = timeFormatter.weekdayAndTime(startTime)
      const { signupStartTime, startTimeException } = timeFormatter.startTime(
        startTime
      )
      const { signupEndTime, endTimeException } = timeFormatter.endTime(
        startTime
      )

      const title = (
        <p key={startTime} className="title">
          {formattedStartTime} ({t('signupOpenBetween')} {signupStartTime}-
          {signupEndTime})
        </p>
      )

      GamesList.push(title)

      // Show exception warning if there are changes in time
      if (startTimeException || endTimeException) {
        const exception = (
          <p key={`${startTime}-exception`} className="exception">
            {' '}
            {t('exceptionInTime')}
          </p>
        )

        GamesList.push(exception)
      }

      /* $FlowFixMe */
      for (let game of games) {
        const gameEntry = (
          <p key={game.id} className="games-list">
            <Link to={`/games/${game.id}`}>{game.title}</Link>
          </p>
        )

        GamesList.push(gameEntry)
      }
    }

    return GamesList
  }

  render() {
    const { games } = this.props
    const GamesList = this.buildGamesList(games)

    return <div className="games-list">{GamesList}</div>
  }
}

export default withNamespaces()(AllGamesList)
