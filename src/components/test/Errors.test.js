// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { Error } from '../Error'

describe('Errors', () => {
  const meta = { touched: null, error: null }

  it('should render correctly', () => {
    const component = shallow(<Error meta={meta} />)
    expect(component).toMatchSnapshot()
  })
})
