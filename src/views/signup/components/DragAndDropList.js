/* @flow */
import React from 'react'
/* $FlowFixMe */
import { DragDropContext } from 'react-beautiful-dnd'
import DropRow from 'views/signup/components/DropRow'
import { reorder, move } from 'utils/dragAndDrop'

type Props = {
  games: Array<Object>,
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
    console.log(result)
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
    }
  }

  render() {
    return (
      <div className="drop-rows">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="games-row">
            <DropRow
              droppableId="gameList"
              items={this.state.gameList}
              label="Games"
            />
          </div>
          <div className="priority-row">
            <DropRow
              droppableId="priority1"
              items={this.state.priority1}
              label="Priority 1"
            />
            <DropRow
              droppableId="priority2"
              items={this.state.priority2}
              label="Priority 2"
            />
            <DropRow
              droppableId="priority3"
              items={this.state.priority3}
              label="Priority 3"
            />
          </div>
        </DragDropContext>
      </div>
    )
  }
}

export default DnDList
