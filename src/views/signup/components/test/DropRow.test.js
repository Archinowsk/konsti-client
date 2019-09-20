// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { DropRow } from '../DropRow'
import type { Props } from '../DropRow'

const droppableId = 'testId'
const games = []
const label = 'test label'
const showCount = true

describe('DropRow', () => {
  it('should render correctly', () => {
    const props: Props = {
      droppableId,
      games,
      label,
      showCount,
    }
    const component = shallow(<DropRow {...props} />)
    expect(component).toMatchSnapshot()
  })
})
