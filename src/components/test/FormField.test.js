/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import FormField from '../FormField'
import type { Props } from '../FormField'

describe('FormField', () => {
  it('should render correctly', () => {
    const props: Props = {
      input: null,
      label: '',
      type: '',
      meta: { touched: false, error: null },
      required: false,
      tooltip: false,
    }
    const component = shallow(<FormField {...props} />)
    expect(component).toMatchSnapshot()
  })
})
