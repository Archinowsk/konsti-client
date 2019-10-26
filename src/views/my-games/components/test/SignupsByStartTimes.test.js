// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { SignupsByStartTimes } from '../SignupsByStartTimes';
import type { Props } from '../SignupsByStartTimes';

const signups = [];
const startTimes = [];

describe('SignupsByStartTimes', () => {
  it('should render correctly', () => {
    const props: Props = { signups, startTimes };
    const component = shallow(<SignupsByStartTimes {...props} />);
    expect(component).toMatchSnapshot();
  });
});
