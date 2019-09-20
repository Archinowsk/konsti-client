// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'utils/store'
import { shallow } from 'enzyme'
import { Routes } from '../Routes'
import type { Props } from '../Routes'

const onlyAdminLoginAllowed = false

describe('Routes', () => {
  it('should render correctly', () => {
    const props: Props = { onlyAdminLoginAllowed }
    const component = shallow(
      <Provider store={store}>
        <Routes {...props} />
      </Provider>
    )
    expect(component).toMatchSnapshot()
  })
})
