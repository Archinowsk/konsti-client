// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { MySignupsList } from '../MySignupsList'
import type { Props } from '../MySignupsList'

const signedGames = []

describe('MySignupsList', () => {
  it('should render correctly', () => {
    const props: Props = { signedGames }
    const component = shallow(<MySignupsList {...props} />)
    expect(component).toMatchSnapshot()
  })
})
