/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import { submitGetUser } from './myGamesActions'
import { submitGetGames } from '~/views/all-games/allGamesActions'

import MySignupsList from '~/views/my-games/components/MySignupsList'
import MyFavoritesList from '~/views/my-games/components/MyFavoritesList'
import MyEnteredList from '~/views/my-games/components/MyEnteredList'

type Props = {
  signedGames: Array<any>,
  favoritedGames: Array<any>,
  enteredGames: Array<any>,
  games: Array<any>,
  onSubmitGetUser: Function,
  username: string,
  onSubmitGetGames: Function,
  t: Function,
}

class MyGamesView extends React.Component<Props> {
  props: Props
  componentDidMount() {
    /*
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    */
    this.props.onSubmitGetGames()
    this.props.onSubmitGetUser(this.props.username)
  }

  render() {
    const { signedGames, favoritedGames, enteredGames, games, t } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    games.forEach(game => {
      signedGames.forEach(signedGame => {
        if (game.id === signedGame.id) {
          Object.assign(signedGame, game)
        }
      })

      favoritedGames.forEach(favoritedGame => {
        if (game.id === favoritedGame.id) {
          Object.assign(favoritedGame, game)
        }
      })

      enteredGames.forEach(enteredGame => {
        if (game.id === enteredGame.id) {
          Object.assign(enteredGame, game)
        }
      })
    })

    return (
      <div>
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
