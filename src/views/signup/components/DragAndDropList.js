/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
/* $FlowFixMe */
import { DragDropContext } from 'react-beautiful-dnd'
import DropRow from 'views/signup/components/DropRow'
import { reorder, move } from 'utils/dragAndDrop'
import sleep from 'utils/sleep'
import addGameInfoById from 'utils/addGameInfoById'
import config from 'config'

type Props = {
  callback: Function,
  t: Function,
}

type State = {
  gameList: Array<Object>,
  priority1: Array<Object>,
  priority2: Array<Object>,
  priority3: Array<Object>,
  showWarning: boolean,
}

class DragAndDropList extends React.Component<Props, State> {
  state = {
    gameList: [],
    priority1: [],
    priority2: [],
    priority3: [],
    showWarning: false,
  }

  componentDidMount() {
    // Load existing state from store
    this.loadState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadState(nextProps)
  }

  loadState = props => {
    const { games, signedGames, signupTime } = props

    // Fill game info
    const myGames = { signedGames }
    addGameInfoById(games, myGames)

    const filteredGames = games.filter(game => {
      for (let signedGame of signedGames) {
        if (game.id === signedGame.id) {
          return undefined
        }
      }
      return game
    })

    const gameList = this.sortGames(filteredGames)
    const priority1 = []
    const priority2 = []
    const priority3 = []

    for (let signedGame of signedGames) {
      if (signedGame.priority === 1 && signedGame.startTime === signupTime) {
        priority1.push(signedGame)
      } else if (
        signedGame.priority === 2 &&
        signedGame.startTime === signupTime
      ) {
        priority2.push(signedGame)
      } else if (
        signedGame.priority === 3 &&
        signedGame.startTime === signupTime
      ) {
        priority3.push(signedGame)
      }
    }

    this.setState({
      gameList,
      priority1,
      priority2,
      priority3,
    })
  }

  sortGames = games => {
    // Sort games by name
    return games.sort((a, b) => {
      const keyA = a.title.toLowerCase()
      const keyB = b.title.toLowerCase()
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    gameList: 'gameList',
    priority1: 'priority1',
    priority2: 'priority2',
    priority3: 'priority3',
  }

  getList = (id: string) => {
    return this.state[this.id2List[id]]
  }

  showWarning = async () => {
    this.setState({ showWarning: true })
    await sleep(config.MESSAGE_DELAY)
    this.setState({ showWarning: false })
  }

  onDragEnd = (result: Object) => {
    const { priority1, priority2, priority3 } = this.state
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // Dropped to same list
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      )

      let state = null
      if (source.droppableId === 'gameList') {
        state = { gameList: items }
      } else if (source.droppableId === 'priority1') {
        state = { priority1: items }
      } else if (source.droppableId === 'priority2') {
        state = { priority2: items }
      } else if (source.droppableId === 'priority3') {
        state = { priority3: items }
      }

      this.setState(state)
    }
    // Moved to new list
    else {
      let result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )

      /*
      // Sort games by name
      if (destination.droppableId === 'gameList') {
        result.gameList = this.sortGames(result.gameList)
      }
      */

      // Only allow one game in each priority
      if (destination.droppableId === 'priority1' && priority1.length >= 1) {
        this.showWarning()
        return
      } else if (
        destination.droppableId === 'priority2' &&
        priority2.length >= 1
      ) {
        this.showWarning()
        return
      } else if (
        destination.droppableId === 'priority3' &&
        priority3.length >= 1
      ) {
        this.showWarning()
        return
      }

      const state = { ...this.state, ...result }
      this.doCallback(state)
      this.setState(state)
    }
  }

  // Send changes to parent
  doCallback = state => {
    const { callback } = this.props
    const { priority1, priority2, priority3 } = state

    const selectedGames = []
    for (let game of priority1) {
      selectedGames.push({ id: game.id, priority: 1 })
    }

    for (let game of priority2) {
      selectedGames.push({ id: game.id, priority: 2 })
    }

    for (let game of priority3) {
      selectedGames.push({ id: game.id, priority: 3 })
    }

    callback(selectedGames)
  }

  render() {
    const { t } = this.props
    const {
      gameList,
      priority1,
      priority2,
      priority3,
      showWarning,
    } = this.state
    return (
      <React.Fragment>
        {showWarning && <p className="error">{t('onlyOneGameWarning')}</p>}
        <div className="drop-rows">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="games-row">
              <DropRow
                droppableId="gameList"
                items={gameList}
                label={t('signupView.signupOpenGames')}
              />
            </div>
            <div className="priority-row">
              <DropRow
                droppableId="priority1"
                items={priority1}
                label={t('signupView.priority1')}
              />
              <DropRow
                droppableId="priority2"
                items={priority2}
                label={t('signupView.priority2')}
              />
              <DropRow
                droppableId="priority3"
                items={priority3}
                label={t('signupView.priority3')}
              />
            </div>
          </DragDropContext>
        </div>
      </React.Fragment>
    )
  }
}

export default translate()(DragAndDropList)
