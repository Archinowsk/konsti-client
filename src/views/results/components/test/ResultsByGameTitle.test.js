// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { ResultsByGameTitle } from '../ResultsByGameTitle'
import type { Props } from '../ResultsByGameTitle'

const results = []

describe('ResultsByGameTitle', () => {
  it('should render correctly', () => {
    const props: Props = { results }
    const component = shallow(<ResultsByGameTitle {...props} />)
    expect(component).toMatchSnapshot()
  })
})
