import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'utils/store';
import { shallow } from 'enzyme';
import { ResultsList } from '../ResultsList';

describe('ResultsList', () => {
  it('should render correctly', () => {
    const component = shallow(
      <Provider store={store}>
        <ResultsList />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
