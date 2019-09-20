// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'utils/store'
import { shallow } from 'enzyme'
import { SignupList } from '../SignupList'
import type { Props } from '../SignupList'

const games = []
const signupTimes = []
const leader = true

describe('SignupList', () => {
  it('should render correctly', () => {
    const props: Props = {
      games,
      signupTimes,
      leader,
    }
    const component = shallow(
      <Provider store={store}>
        <SignupList {...props} />
      </Provider>
    )
    expect(component).toMatchSnapshot()
  })
})
