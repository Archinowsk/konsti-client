/* @flow */
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
/* $FlowFixMe: Cannot import `Droppable` because there is no `Droppable` export in `react-beautiful-dnd`. */
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {|
  droppableId: string,
  games: $ReadOnlyArray<Game>,
  label: string,
  showCount: boolean,
|}

export const DropRow: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const { droppableId, games, label, showCount } = props
  const { t } = useTranslation()

  const getListStyle = dragging => {
    if (dragging) return 'dragging'
    else return ''
  }

  const getPopularity = (game: Game): string => {
    if (game.popularity >= game.maxAttendance) return 'high-popularity'
    else if (
      game.popularity >= game.maxAttendance / 2 &&
      game.popularity >= game.minAttendance
    )
      return 'medium-popularity'
    else return ''
  }

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
                {(provided, snapshot) => (
                  <div
                    className={`draggable-item ${getPopularity(game)}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <p className='signup-game-title'>{game.title}</p>
                    <p className='signup-popularity'>
                      {t(getPopularity(game))}
                    </p>
                    <p className='signup-short-description'>
                      {game.shortDescription
                        ? game.shortDescription
                        : game.gameSystem}

                      {' - '}
                      <Link to={`/games/${game.gameId}`}>{t('details')}</Link>
                    </p>
                    <p>
                      {game.popularity} / {game.maxAttendance} (min:{' '}
                      {game.minAttendance})
                    </p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  )
}
