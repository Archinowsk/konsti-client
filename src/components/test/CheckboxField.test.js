/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import CheckboxField from '../CheckboxField'
import type { Props } from '../CheckboxField'

describe('CheckboxField', () => {
  it('should render correctly', () => {
    const props: Props = {
      input: null,
      label: '',
      type: '',
      meta: { touched: false, error: null },
    }
    const component = shallow(<CheckboxField {...props} />)
    expect(component).toMatchSnapshot()
  })
})
