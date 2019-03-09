/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import TimesDropdown from '../TimesDropdown'

describe('TimesDropdown', () => {
  it('should render correctly', () => {
    const component = shallow(<TimesDropdown />)
    expect(component).toMatchSnapshot()
  })
})
