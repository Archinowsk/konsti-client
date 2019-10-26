// @flow
import _ from 'lodash';
import { moveArrayItem, insertByIndex } from 'utils/array';
import type { Game, DnDUpdatedPositions, DnDMove } from 'flow/game.flow';

export const reorder = (
  list: $ReadOnlyArray<Game>,
  startIndex: number,
  endIndex: number
): $ReadOnlyArray<Game> => {
  return moveArrayItem(list, startIndex, endIndex);
};

export const move = (
  sourceList: $ReadOnlyArray<Game>,
  destinationList: $ReadOnlyArray<Game>,
  sourceMove: DnDMove,
  destinationMove: DnDMove
): DnDUpdatedPositions => {
  return {
    [sourceMove.droppableId]: _.without(
      sourceList,
      sourceList[sourceMove.index]
    ),

    [destinationMove.droppableId]: insertByIndex(
      destinationList,
      sourceList[sourceMove.index],
      destinationMove.index
    ),
  };
};
