/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import GameInfo from '../GameInfo'
import type { Props } from '../GameInfo'

describe('GameInfo', () => {
  it('should render correctly', () => {
    const props: Props = { game: null }
    const component = shallow(<GameInfo {...props} />)
    expect(component).toMatchSnapshot()
  })
})
