// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { ResultsList } from '../ResultsList'
import type { Props } from '../ResultsList'

const results = []

describe('ResultsList', () => {
  it('should render correctly', () => {
    const props: Props = { results }
    const component = shallow(<ResultsList {...props} />)
    expect(component).toMatchSnapshot()
  })
})
