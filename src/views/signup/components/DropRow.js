/* @flow */
import React from 'react'
/* $FlowFixMe */
import { Droppable, Draggable } from 'react-beautiful-dnd'

type Props = {
  droppableId: string,
  items: Array<Object>,
  label: string,
}
const DropRow = (props: Props) => {
  const { droppableId, items, label } = props
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
                  {item.title}
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

export default DropRow
