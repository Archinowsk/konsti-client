import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'utils/store';
import { shallow } from 'enzyme';
import { DragAndDropList, Props } from '../DragAndDropList';

const updateSelectedGames = (): void => {};
const availableGames = [];
const selectedGames = [];

describe('DragAndDropList', () => {
  it('should render correctly', () => {
    const props: Props = {
      updateSelectedGames,
      availableGames,
      selectedGames,
    };
    const component = shallow(
      <Provider store={store}>
        <DragAndDropList {...props} />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
