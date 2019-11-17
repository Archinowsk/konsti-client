// @flow
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
/* $FlowFixMe: Cannot import `DragDropContext` because there is no `DragDropContext` export in `react-beautiful-dnd`. */
import { DragDropContext } from 'react-beautiful-dnd';
import { DropRow } from 'views/signup/components/DropRow';
import { reorder, move } from 'utils/dragAndDrop';
import { sleep } from 'utils/sleep';
import { config } from 'config';
import type { GroupMember } from 'flow/group.flow';
import type { StatelessFunctionalComponent, Element } from 'react';
import type { Game, DnDUpdatedPositions } from 'flow/game.flow';

export type Props = {|
  updateSelectedGames: Function,
  // updateAvailableGames: Function,
  availableGames: $ReadOnlyArray<Game>,
  selectedGames: $ReadOnlyArray<Game>,
|};

export const DragAndDropList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const {
    availableGames,
    selectedGames,
    updateSelectedGames,
    // updateAvailableGames,
  } = props;
  const { t } = useTranslation();

  const groupCode: string = useSelector(state => state.login.groupCode);
  const groupMembers: $ReadOnlyArray<GroupMember> = useSelector(
    state => state.login.groupMembers
  );

  const [warningVisible, setWarningVisible] = React.useState(false);
  (warningVisible: boolean);

  const [warning, setWarning] = React.useState('');
  (warning: string);

  const getList = (id: string) => {
    if (id === 'availableGames') return availableGames;
    else if (id === 'selectedGames') return selectedGames;
  };

  const showWarning = async (message: string): Promise<void> => {
    setWarning(message);
    setWarningVisible(true);
    await sleep(config.MESSAGE_DELAY);
    setWarningVisible(false);
    setWarning('');
  };

  const onDragEnd = (result: Object) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped to same list
    if (source.droppableId === destination.droppableId) {
      const newOrder = getList(source.droppableId);
      if (!newOrder) return;
      const updatedPositions = reorder(
        newOrder,
        source.index,
        destination.index
      );

      if (source.droppableId === 'availableGames') {
        // updateAvailableGames(updatedPositions);
      } else if (source.droppableId === 'selectedGames') {
        updateSelectedGames(updatedPositions);
      }
    }

    // Moved to new list
    else {
      const newItemsSource = getList(source.droppableId);
      const newItemsDestination = getList(destination.droppableId);

      if (!newItemsSource || !newItemsDestination) return;

      const updatedPositions: DnDUpdatedPositions = move(
        newItemsSource,
        newItemsDestination,
        source,
        destination
      );

      if (
        destination.droppableId === 'selectedGames' &&
        selectedGames.length >= 3
      ) {
        showWarning('gameLimitWarning');
        return;
      }

      if (
        groupCode !== '0' &&
        updatedPositions.selectedGames &&
        destination.droppableId === 'selectedGames' &&
        updatedPositions.selectedGames[destination.index].maxAttendance <
          groupMembers.length
      ) {
        showWarning('groupTooBigWarning');
        return;
      }

      if (updatedPositions.availableGames) {
        // updateAvailableGames(updatedPositions.availableGames);
      }

      if (updatedPositions.selectedGames) {
        updateSelectedGames(updatedPositions.selectedGames);
      }
    }
  };

  return (
    <Fragment>
      {warningVisible && <p className='error'>{t(warning)}</p>}
      <div className='drop-rows'>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='available-games-row'>
            <DropRow
              droppableId='availableGames'
              games={availableGames}
              label={t('signupView.signupOpenGames')}
              showCount={false}
            />
          </div>
          <div className='selected-games-row'>
            <DropRow
              droppableId='selectedGames'
              games={selectedGames}
              label={t('signupView.selectedGames')}
              showCount
            />
          </div>
        </DragDropContext>
      </div>
    </Fragment>
  );
};
