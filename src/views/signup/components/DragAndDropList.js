/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
/* $FlowFixMe: Cannot import `DragDropContext` because there is no `DragDropContext` export in `react-beautiful-dnd`. */
import { DragDropContext } from 'react-beautiful-dnd'
import _ from 'lodash'
import { DropRow } from 'views/signup/components/DropRow'
import { reorder, move } from 'utils/dragAndDrop'
import { sleep } from 'utils/sleep'
import { config } from 'config'
import type { StatelessFunctionalComponent } from 'react'
import type { Game, UpdatedPositions } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

type Props = {|
  callback: Function,
  games: $ReadOnlyArray<Game>,
  selectedGames: $ReadOnlyArray<Signup>,
  signedGames: $ReadOnlyArray<Signup>,
  signupTime: string,
|}

export const DragAndDropList: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { games, selectedGames, signedGames, signupTime, callback } = props
  const { t } = useTranslation()

  const [gameList, setGameList] = React.useState([])
  ;(gameList: $ReadOnlyArray<Game>)

  const [priority1, setPriority1] = React.useState([])
  ;(priority1: $ReadOnlyArray<Game>)

  const [priority2, setPriority2] = React.useState([])
  ;(priority2: $ReadOnlyArray<Game>)

  const [priority3, setPriority3] = React.useState([])
  ;(priority3: $ReadOnlyArray<Game>)

  const [warningVisible, setWarningVisible] = React.useState(false)
  ;(warningVisible: boolean)

  React.useEffect(() => {
    loadState()
  }, [signupTime])

  React.useEffect(() => {
    resetState()
  }, [signedGames])

  React.useEffect(() => {
    doCallback()
  }, [gameList, priority1, priority2, priority3])

  const resetState = () => {
    const notSelectedGames = games.filter(game => {
      for (let signedGame of signedGames) {
        if (game.gameId === signedGame.gameDetails.gameId) {
          return undefined
        }
      }
      return game
    })

    const gameList = _.sortBy(notSelectedGames, [
      notSelectedGame => notSelectedGame.title.toLowerCase(),
    ])

    const priority1 = []
    const priority2 = []
    const priority3 = []

    for (let signedGame of signedGames) {
      if (signedGame.priority === 1 && signedGame.time === signupTime) {
        priority1.push(signedGame.gameDetails)
      } else if (signedGame.priority === 2 && signedGame.time === signupTime) {
        priority2.push(signedGame.gameDetails)
      } else if (signedGame.priority === 3 && signedGame.time === signupTime) {
        priority3.push(signedGame.gameDetails)
      }
    }

    setGameList(gameList)
    setPriority1(priority1)
    setPriority2(priority2)
    setPriority3(priority3)
  }

  const loadState = () => {
    const notSelectedGames = games.filter(game => {
      for (let selectedGame of selectedGames) {
        if (game.gameId === selectedGame.gameDetails.gameId) {
          return undefined
        }
      }
      return game
    })

    const gameList = _.sortBy(notSelectedGames, [
      notSelectedGame => notSelectedGame.title.toLowerCase(),
    ])

    const priority1 = []
    const priority2 = []
    const priority3 = []

    for (let selectedGame of selectedGames) {
      if (
        selectedGame.priority === 1 &&
        selectedGame.gameDetails.startTime === signupTime
      ) {
        priority1.push(selectedGame.gameDetails)
      } else if (
        selectedGame.priority === 2 &&
        selectedGame.gameDetails.startTime === signupTime
      ) {
        priority2.push(selectedGame.gameDetails)
      } else if (
        selectedGame.priority === 3 &&
        selectedGame.gameDetails.startTime === signupTime
      ) {
        priority3.push(selectedGame.gameDetails)
      }
    }

    setGameList(gameList)
    setPriority1(priority1)
    setPriority2(priority2)
    setPriority3(priority3)
  }

  const getList = (id: string) => {
    if (id === 'gameList') return gameList
    else if (id === 'priority1') return priority1
    else if (id === 'priority2') return priority2
    else if (id === 'priority3') return priority3
  }

  const showWarning = async () => {
    setWarningVisible(true)
    await sleep(config.MESSAGE_DELAY)
    setWarningVisible(false)
  }

  const onDragEnd = (result: Object) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // Dropped to same list
    if (source.droppableId === destination.droppableId) {
      const newOrder = getList(source.droppableId)
      if (!newOrder) return
      const items = reorder(newOrder, source.index, destination.index)

      if (source.droppableId === 'gameList') {
        setGameList(items)
      } else if (source.droppableId === 'priority1') {
        setPriority1(items)
      } else if (source.droppableId === 'priority2') {
        setPriority2(items)
      } else if (source.droppableId === 'priority3') {
        setPriority3(items)
      }
    }
    // Moved to new list
    else {
      const newItemsSource = getList(source.droppableId)
      const newItemsDestination = getList(destination.droppableId)
      if (!newItemsSource || !newItemsDestination) return

      const updatedPositions: UpdatedPositions = move(
        newItemsSource,
        newItemsDestination,
        source,
        destination
      )

      // Only allow one game in each priority
      if (destination.droppableId === 'priority1' && priority1.length >= 1) {
        showWarning()
        return
      } else if (
        destination.droppableId === 'priority2' &&
        priority2.length >= 1
      ) {
        showWarning()
        return
      } else if (
        destination.droppableId === 'priority3' &&
        priority3.length >= 1
      ) {
        showWarning()
        return
      }

      if (updatedPositions.gameList) {
        setGameList(updatedPositions.gameList)
      }

      if (updatedPositions.priority1) {
        setPriority1(updatedPositions.priority1)
      }

      if (updatedPositions.priority2) {
        setPriority2(updatedPositions.priority2)
      }

      if (updatedPositions.priority3) {
        setPriority3(updatedPositions.priority3)
      }
    }
  }

  // Send changes to parent
  const doCallback = () => {
    const selectedGames = []
    for (let game of priority1) {
      selectedGames.push({
        gameDetails: { ...game },
        priority: 1,
        time: signupTime,
      })
    }

    for (let game of priority2) {
      selectedGames.push({
        gameDetails: { ...game },
        priority: 2,
        time: signupTime,
      })
    }

    for (let game of priority3) {
      selectedGames.push({
        gameDetails: { ...game },
        priority: 3,
        time: signupTime,
      })
    }

    callback(selectedGames)
  }

  return (
    <React.Fragment>
      {warningVisible && <p className='error'>{t('onlyOneGameWarning')}</p>}
      <div className='drop-rows'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='games-row'>
            <DropRow
              droppableId='gameList'
              games={gameList}
              label={t('signupView.signupOpenGames')}
            />
          </div>
          <div className='priority-row'>
            <DropRow
              droppableId='priority1'
              games={priority1}
              label={t('signupView.priority1')}
            />
            <DropRow
              droppableId='priority2'
              games={priority2}
              label={t('signupView.priority2')}
            />
            <DropRow
              droppableId='priority3'
              games={priority3}
              label={t('signupView.priority3')}
            />
          </div>
        </DragDropContext>
      </div>
    </React.Fragment>
  )
}
