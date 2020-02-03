import React from 'react';
import { shallow } from 'enzyme';
import { GamesByStartTimes, Props } from '../GamesByStartTimes';

const games = [];
const startTimes = [];

describe('GamesByStartTimes', () => {
  it('should render correctly', () => {
    const props: Props = { games, startTimes };
    const component = shallow(<GamesByStartTimes {...props} />);
    expect(component).toMatchSnapshot();
  });
});
