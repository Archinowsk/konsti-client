const addGameById = ({ games, myGames }) => {
  games.forEach(game => {
    myGames.signedGames.forEach(signedGame => {
      if (game.id === signedGame.id) {
        Object.assign(signedGame, game)
      }
    })

    myGames.favoritedGames.forEach(favoritedGame => {
      if (game.id === favoritedGame.id) {
        Object.assign(favoritedGame, game)
      }
    })

    myGames.enteredGames.forEach(enteredGame => {
      if (game.id === enteredGame.id) {
        Object.assign(enteredGame, game)
      }
    })
  })
}

export default addGameById
