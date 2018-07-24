/* @flow */
const addGameInfoById = (games: Array<Object>, myGames: Object) => {
  if (!games) return

  games.forEach(game => {
    if (myGames.signedGames) {
      myGames.signedGames.forEach(signedGame => {
        if (game.id === signedGame.id) {
          Object.assign(signedGame, game)
        }
      })
    }

    if (myGames.favoritedGames) {
      myGames.favoritedGames.forEach(favoritedGame => {
        if (game.id === favoritedGame.id) {
          Object.assign(favoritedGame, game)
        }
      })
    }

    if (myGames.enteredGames) {
      myGames.enteredGames.forEach(enteredGame => {
        if (game.id === enteredGame.id) {
          Object.assign(enteredGame, game)
        }
      })
    }
  })
}

export default addGameInfoById
