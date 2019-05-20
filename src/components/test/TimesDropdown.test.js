/* @flow */
import React from 'react'
import { shallow } from 'enzyme'
import TimesDropdown from '../TimesDropdown'
import type { Props } from '../TimesDropdown'

describe('TimesDropdown', () => {
  it('should render correctly', () => {
    const props: Props = { games: [], onChange: () => {}, signupTime: '' }
    const component = shallow(<TimesDropdown {...props} />)
    expect(component).toMatchSnapshot()
  })
})
