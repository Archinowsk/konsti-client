/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import GameInfo from '../GameInfo'

describe('GameInfo', () => {
  it('should render correctly', () => {
    const component = shallow(<GameInfo />)
    expect(component).toMatchSnapshot()
  })
})
