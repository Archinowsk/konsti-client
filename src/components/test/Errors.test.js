/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import Errors from '../Errors'

describe('Errors', () => {
  const meta = { touched: null, error: null }

  it('should render correctly', () => {
    const component = shallow(<Errors meta={meta} />)
    expect(component).toMatchSnapshot()
  })
})
