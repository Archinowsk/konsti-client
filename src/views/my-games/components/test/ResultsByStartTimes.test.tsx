import React from 'react';
import { shallow } from 'enzyme';
import { ResultsByStartTimes, Props } from '../ResultsByStartTimes';

const signups = [];
const startTimes = [];
const missedSignups = [];

describe('ResultsByStartTimes', () => {
  it('should render correctly', () => {
    const props: Props = { signups, startTimes, missedSignups };
    const component = shallow(<ResultsByStartTimes {...props} />);
    expect(component).toMatchSnapshot();
  });
});
