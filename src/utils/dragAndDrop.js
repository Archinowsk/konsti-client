/* @flow */
import type { Game } from 'flow/game.flow'

// Help with reordering the result
const reorder = (
  list: $ReadOnlyArray<Game>,
  startIndex: number,
  endIndex: number
) => {
  /* $FlowFixMe: Missing type annotation for `A`. `A` is a type parameter declared in  function type [1] and was implicitly instantiated at  call of method `from` [2]. */
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

// Move item from one list to another
const move = (
  source: $ReadOnlyArray<Game>,
  destination: $ReadOnlyArray<Game>,
  droppableSource: Object,
  droppableDestination: Object
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

export { reorder, move }
