/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import MySignupsList from 'views/my-games/components/MySignupsList'
import MyFavoritesList from 'views/my-games/components/MyFavoritesList'
import MyEnteredList from 'views/my-games/components/MyEnteredList'
import { getData } from 'utils/store'
import Loading from 'components/Loading'

type Props = {
  signedGames: Array<any>,
  favoritedGames: Array<any>,
  enteredGames: Array<any>,
}

type State = {
  loading: boolean,
}

class MyGamesView extends React.Component<Props, State> {
  state = {
    loading: true,
  }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  render() {
    const { signedGames, favoritedGames, enteredGames } = this.props
    const { loading } = this.state

    return (
      <div className="my-games-view">
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <MyFavoritesList favoritedGames={favoritedGames} />
            <MySignupsList signedGames={signedGames} />
            <MyEnteredList enteredGames={enteredGames} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signedGames: state.myGames.signedGames,
    favoritedGames: state.myGames.favoritedGames,
    enteredGames: state.myGames.enteredGames,
    games: state.allGames.games,
    myGames: state.myGames,
  }
}

export default connect(
  mapStateToProps,
  null
)(MyGamesView)
