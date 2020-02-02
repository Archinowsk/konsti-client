import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { Game } from 'typings/game.typings';

export interface Props {
  droppableId: string;
  games: readonly Game[];
  label: string;
  showCount: boolean;
}

export const DropRow: FunctionComponent<Props> = (
  props: Props
): ReactElement<typeof Fragment> => {
  const { droppableId, games, label, showCount } = props;
  const { t } = useTranslation();

  const getListStyle = dragging => {
    if (dragging) return 'dragging';
    else return '';
  };

  const getPopularity = (game: Game): string => {
    if (game.popularity >= game.maxAttendance) return 'high-popularity';
    else if (
      game.popularity >= game.maxAttendance / 2 &&
      game.popularity >= game.minAttendance
    )
      return 'medium-popularity';
    else return 'low-popularity';
  };

  return (
    <Fragment>
      <p>
        {label} {showCount && <span>({games.length}/3)</span>}
      </p>

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
                {provided => (
                  <Link to={`/games/${game.gameId}`}>
                    <div
                      className={`draggable-item ${getPopularity(game)}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className='signup-game-title break-long'>
                        {game.title}
                      </p>
                      <p className='signup-short-description break-long'>
                        {t(`programType.${game.programType}`)}:{' '}
                        {game.shortDescription
                          ? game.shortDescription
                          : game.gameSystem}
                      </p>
                      <p className='signup-popularity'>
                        {t('playerStatus')}: {t(getPopularity(game))}
                      </p>
                    </div>
                  </Link>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  );
};
