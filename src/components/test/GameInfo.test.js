/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import { GameInfo } from '../GameInfo'
import type { Props } from '../GameInfo'

const game = {
  gameId: 'p2106',
  title: 'Test game',
  description: 'Test game description',
  location: 'Test location',
  startTime: '2018-07-28T16:00:00.000Z',
  mins: 240,
  tags: [
    'aloittelijaystävällinen',
    'english',
    'lapsiystävällinen',
    'pöytäpelit',
  ],
  genres: ['fantasy', 'war', 'exploration', 'mystery', 'drama'],
  styles: ['serious', 'story_driven', 'character_driven'],
  language: 'fi',
  endTime: '2018-07-28T20:00:00.000Z',
  people: 'Test GM',
  minAttendance: 2,
  maxAttendance: 4,
  gameSystem: 'Test gamesystem',
  noLanguage: false,
  englishOk: false,
  childrenFriendly: false,
  ageRestricted: false,
  beginnerFriendly: false,
  intendedForExperiencedParticipants: false,
}

describe('GameInfo', () => {
  it('should render correctly', () => {
    const props: Props = { game }
    const component = shallow(<GameInfo {...props} />)
    expect(component).toMatchSnapshot()
  })
})
