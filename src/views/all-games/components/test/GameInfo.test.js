// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { testGame } from 'test/test-data/testGame'
import { GameInfo } from '../GameInfo'
import type { Props } from '../GameInfo'

describe('GameInfo', () => {
  it('should render correctly', () => {
    const props: Props = { game: testGame }
    const component = shallow(<GameInfo {...props} />)
    expect(component).toMatchSnapshot()
  })
})
