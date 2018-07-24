/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
/* $FlowFixMe */
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'

type Props = {
  t: Function,
  droppableId: string,
  items: Array<Object>,
  label: string,
}
const DropRow = (props: Props) => {
  const { droppableId, items, label, t } = props
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div className={`drop-row ${droppableId}`} ref={provided.innerRef}>
          <p>{label}</p>

          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item.title}{' '}
                  <Link to={`/games/${item.id}`}>({t('details')})</Link>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default translate()(DropRow)
