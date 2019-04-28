/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
/* $FlowFixMe: Cannot import `Droppable` because there is no `Droppable` export in `react-beautiful-dnd`. */
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import type { Game } from 'flow/game.flow'

type Props = {
  droppableId: string,
  games: Array<Game>,
  label: string,
}

const DropRow = (props: Props) => {
  const { droppableId, games, label } = props
  const { t } = useTranslation()

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
              <Draggable
                key={game.gameId}
                draggableId={game.gameId}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className='draggable-item'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {game.title}{' '}
                    <Link to={`/games/${game.gameId}`}>({t('details')})</Link>
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

export default DropRow
