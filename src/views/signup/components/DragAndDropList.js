/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
/* $FlowFixMe: Cannot import `DragDropContext` because there is no `DragDropContext` export in `react-beautiful-dnd`. */
import { DragDropContext } from 'react-beautiful-dnd'
import DropRow from 'views/signup/components/DropRow'
import { reorder, move } from 'utils/dragAndDrop'
import sleep from 'utils/sleep'
import config from 'config'
import { sortArrayByKey } from 'utils/sort'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  callback: Function,
  games: Array<Game>,
  selectedGames: Array<Game>,
  signupTime: string,
}

type State = {
  gameList: Array<Game>,
  priority1: Array<Game>,
  priority2: Array<Game>,
  priority3: Array<Game>,
  warningVisible: boolean,
}

type UpdatedPositions = {
  gameList?: Array<Game>,
  priority1?: Array<Game>,
  priority2?: Array<Game>,
  priority3?: Array<Game>,
}

const DragAndDropList: StatelessFunctionalComponent<Props> = (
  props: Props,
  state: State
) => {
  const { games, selectedGames, signupTime, callback } = props
  const { t } = useTranslation()

  const [gameList, setGameList] = React.useState([])
  const [priority1, setPriority1] = React.useState([])
  const [priority2, setPriority2] = React.useState([])
  const [priority3, setPriority3] = React.useState([])
  const [warningVisible, setWarningVisible] = React.useState(false)

  React.useEffect(() => {
    loadState()
  }, [signupTime])

  React.useEffect(() => {
    doCallback()
  }, [gameList, priority1, priority2, priority3])

  const loadState = () => {
    const filteredGames = games.filter(game => {
      for (let selectedGame of selectedGames) {
        if (game.gameId === selectedGame.gameId) {
          return undefined
        }
      }
      return game
    })

    const gameList = sortArrayByKey(filteredGames, 'title')
    const priority1 = []
    const priority2 = []
    const priority3 = []

    for (let selectedGame of selectedGames) {
      if (
        selectedGame.priority === 1 &&
        selectedGame.startTime === signupTime
      ) {
        priority1.push(selectedGame)
      } else if (
        selectedGame.priority === 2 &&
        selectedGame.startTime === signupTime
      ) {
        priority2.push(selectedGame)
      } else if (
        selectedGame.priority === 3 &&
        selectedGame.startTime === signupTime
      ) {
        priority3.push(selectedGame)
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
      selectedGames.push({ ...game, priority: 1 })
    }

    for (let game of priority2) {
      selectedGames.push({ ...game, priority: 2 })
    }

    for (let game of priority3) {
      selectedGames.push({ ...game, priority: 3 })
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

export default DragAndDropList
