/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import Accordion from '../Accordion'

describe('Loading', () => {
  it('should render correctly', () => {
    const component = shallow(<Accordion />)
    expect(component).toMatchSnapshot()
  })
})
