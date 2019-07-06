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
  initialSelectedGames: $ReadOnlyArray<Signup>,
  signedGames: $ReadOnlyArray<Signup>,
  signupTime: string,
|}

export const DragAndDropList: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const {
    games,
    initialSelectedGames,
    signedGames,
    signupTime,
    callback,
  } = props
  const { t } = useTranslation()

  const [availableGames, setAvailableGames] = React.useState([])
  ;(availableGames: $ReadOnlyArray<Game>)

  const [selectedGames, setSelectedGames] = React.useState([])
  ;(selectedGames: $ReadOnlyArray<Game>)

  const [warningVisible, setWarningVisible] = React.useState(false)
  ;(warningVisible: boolean)

  React.useEffect(() => {
    loadState()
  }, [signupTime])

  React.useEffect(() => {
    reloadState()
  }, [signedGames])

  React.useEffect(() => {
    doCallback()
  }, [availableGames, selectedGames])

  const reloadState = () => {
    const notSelectedGames = games.filter(game => {
      for (let signedGame of signedGames) {
        if (game.gameId === signedGame.gameDetails.gameId) {
          return undefined
        }
      }
      return game
    })

    const availableGames = _.sortBy(notSelectedGames, [
      notSelectedGame => notSelectedGame.title.toLowerCase(),
    ])

    const selectedGames = []

    for (let signedGame of signedGames) {
      if (signedGame.time === signupTime) {
        selectedGames.push(signedGame.gameDetails)
      }
    }

    setAvailableGames(availableGames)
    setSelectedGames(selectedGames)
  }

  const loadState = () => {
    const notSelectedGames = games.filter(game => {
      for (let selectedGame of initialSelectedGames) {
        if (game.gameId === selectedGame.gameDetails.gameId) {
          return undefined
        }
      }
      return game
    })

    const availableGames = _.sortBy(notSelectedGames, [
      notSelectedGame => notSelectedGame.title.toLowerCase(),
    ])

    const selectedGames = []

    for (let selectedGame of initialSelectedGames) {
      if (selectedGame.gameDetails.startTime === signupTime) {
        selectedGames.push(selectedGame.gameDetails)
      }
    }

    setAvailableGames(availableGames)
    setSelectedGames(selectedGames)
  }

  const getList = (id: string) => {
    if (id === 'availableGames') return availableGames
    else if (id === 'selectedGames') return selectedGames
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

      if (source.droppableId === 'availableGames') {
        setAvailableGames(items)
      } else if (source.droppableId === 'selectedGames') {
        setSelectedGames(items)
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

      if (
        destination.droppableId === 'selectedGames' &&
        selectedGames.length >= 3
      ) {
        showWarning()
        return
      }

      if (updatedPositions.availableGames) {
        setAvailableGames(updatedPositions.availableGames)
      }

      if (updatedPositions.selectedGames) {
        setSelectedGames(updatedPositions.selectedGames)
      }
    }
  }

  // Send changes to parent
  const doCallback = () => {
    callback(
      selectedGames.map(selectedGame => {
        return {
          gameDetails: { ...selectedGame },
          priority: selectedGames.indexOf(selectedGame) + 1,
          time: signupTime,
        }
      })
    )
  }

  return (
    <React.Fragment>
      {warningVisible && <p className='error'>{t('gameLimitWarning')}</p>}
      <div className='drop-rows'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='available-games-row'>
            <DropRow
              droppableId='availableGames'
              games={availableGames}
              label={t('signupView.signupOpenGames')}
            />
          </div>
          <div className='selected-games-row'>
            <DropRow
              droppableId='selectedGames'
              games={selectedGames}
              label={t('signupView.selectedGames')}
            />
          </div>
        </DragDropContext>
      </div>
    </React.Fragment>
  )
}
