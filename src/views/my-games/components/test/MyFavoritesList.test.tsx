import React from 'react';
import { shallow } from 'enzyme';
import { MyFavoritesList, Props } from '../MyFavoritesList';

const favoritedGames = [];

describe('MyFavoritesList', () => {
  it('should render correctly', () => {
    const props: Props = { favoritedGames };
    const component = shallow(<MyFavoritesList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
