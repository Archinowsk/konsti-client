// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { ResultsByUsername } from '../ResultsByUsername'
import type { Props } from '../ResultsByUsername'

const results = []

describe('ResultsByUsername', () => {
  it('should render correctly', () => {
    const props: Props = { results }
    const component = shallow(<ResultsByUsername {...props} />)
    expect(component).toMatchSnapshot()
  })
})
