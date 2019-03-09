/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import FormSelector from '../FormSelector'

describe('FormSelector', () => {
  it('should render correctly', () => {
    const component = shallow(<FormSelector />)
    expect(component).toMatchSnapshot()
  })
})
