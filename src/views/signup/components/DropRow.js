/* @flow */
import React from 'react'
import { withTranslation } from 'react-i18next'
/* $FlowFixMe: Cannot import `Droppable` because there is no `Droppable` export in `react-beautiful-dnd`. */
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'

type Props = {
  t: Function,
  droppableId: string,
  games: Array<Object>,
  label: string,
}

const DropRow = (props: Props) => {
  const { droppableId, games, label, t } = props

  const getListStyle = dragging => {
    if (dragging) return 'dragging'
    else return ''
  }

  return (
    <React.Fragment>
      <p>{label}</p>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            className={`drop-row ${droppableId} ${getListStyle(
              snapshot.isDraggingOver
            )}`}
            ref={provided.innerRef}
          >
            {games.map((game, index) => (
              <Draggable key={game.id} draggableId={game.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className='draggable-item'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {game.title}{' '}
                    <Link to={`/games/${game.id}`}>({t('details')})</Link>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </React.Fragment>
  )
}

export default withTranslation()(DropRow)
