/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
/* $FlowFixMe */
import { DragDropContext } from 'react-beautiful-dnd'
import DropRow from 'views/signup/components/DropRow'
import { reorder, move } from 'utils/dragAndDrop'

type Props = {
  games: Array<Object>,
  callback: Function,
  signedGames: Array<Object>,
  signupTime: Date,
  t: Function,
}

type State = {
  gameList: Array<Object>,
  priority1: Array<Object>,
  priority2: Array<Object>,
  priority3: Array<Object>,
}

class DnDList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { games } = this.props

    this.state = {
      gameList: games,
      priority1: [],
      priority2: [],
      priority3: [],
    }
  }

  // Load existing state from store
  componentDidMount() {
    const { signedGames, signupTime } = this.props

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
      priority1,
      priority2,
      priority3,
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

  onDragEnd = (result: Object) => {
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
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )

      const state = { ...this.state, ...result }
      this.setState(state)

      this.doCallback()
    }
  }

  // Send changes to parent
  doCallback = () => {
    const { callback } = this.props
    const { priority1, priority2, priority3 } = this.state

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
    return (
      <div className="drop-rows">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="games-row">
            <DropRow
              droppableId="gameList"
              items={this.state.gameList}
              label={t('signupView.signupOpenGames')}
            />
          </div>
          <div className="priority-row">
            <DropRow
              droppableId="priority1"
              items={this.state.priority1}
              label={t('signupView.priority1')}
            />
            <DropRow
              droppableId="priority2"
              items={this.state.priority2}
              label={t('signupView.priority2')}
            />
            <DropRow
              droppableId="priority3"
              items={this.state.priority3}
              label={t('signupView.priority3')}
            />
          </div>
        </DragDropContext>
      </div>
    )
  }
}

export default translate()(DnDList)
