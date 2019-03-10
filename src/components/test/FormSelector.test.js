/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import FormSelector from '../FormSelector'
import type { Props } from '../FormSelector'

describe('FormSelector', () => {
  it('should render correctly', () => {
    const props: Props = {
      input: null,
      meta: { touched: false, error: null },
      data: [],
      label: '',
    }
    const component = shallow(<FormSelector {...props} />)
    expect(component).toMatchSnapshot()
  })
})
