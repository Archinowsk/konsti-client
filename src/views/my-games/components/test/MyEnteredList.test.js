// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'utils/store'
import { shallow } from 'enzyme'
import { MyEnteredList } from '../MyEnteredList'
import type { Props } from '../MyEnteredList'

const enteredGames = []
const signedGames = []

describe('MyEnteredList', () => {
  it('should render correctly', () => {
    const props: Props = { enteredGames, signedGames }
    const component = shallow(
      <Provider store={store}>
        <MyEnteredList {...props} />
      </Provider>
    )
    expect(component).toMatchSnapshot()
  })
})
