// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { Hidden } from '../Hidden'
import type { Props } from '../Hidden'

const hiddenGames = []

describe('Hidden', () => {
  it('should render correctly', () => {
    const props: Props = { hiddenGames }
    const component = shallow(<Hidden {...props} />)
    expect(component).toMatchSnapshot()
  })
})
