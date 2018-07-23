/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { submitGetUser } from 'views/my-games/myGamesActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import MySignupsList from 'views/my-games/components/MySignupsList'
import MyFavoritesList from 'views/my-games/components/MyFavoritesList'
import MyEnteredList from 'views/my-games/components/MyEnteredList'
import addGameInfoById from 'utils/addGameInfoById'

type Props = {
  signedGames: Array<any>,
  favoritedGames: Array<any>,
  enteredGames: Array<any>,
  games: Array<any>,
  onSubmitGetUser: Function,
  username: string,
  onSubmitGetGames: Function,
  t: Function,
  myGames: Object,
}

class MyGamesView extends React.Component<Props> {
  componentDidMount() {
    const { onSubmitGetGames, onSubmitGetUser, username } = this.props

    onSubmitGetGames()
    onSubmitGetUser(username)
  }

  render() {
    const {
      signedGames,
      favoritedGames,
      enteredGames,
      games,
      myGames,
      t,
    } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    addGameInfoById({ games, myGames })

    return (
      <div className="my-games-view">
        <MyFavoritesList favoritedGames={favoritedGames} />
        <MyEnteredList enteredGames={enteredGames} />
        <MySignupsList signedGames={signedGames} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signedGames: state.myGames.signedGames,
    favoritedGames: state.myGames.favoritedGames,
    enteredGames: state.myGames.enteredGames,
    username: state.login.username,
    games: state.allGames.games,
    myGames: state.myGames,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitGetUser: username => dispatch(submitGetUser(username)),
    onSubmitGetGames: () => dispatch(submitGetGames()),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyGamesView)
)
