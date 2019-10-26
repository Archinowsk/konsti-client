// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { GroupMembersList } from '../GroupMembersList';
import type { Props } from '../GroupMembersList';

const groupMembers = [];

describe('GroupMembersList', () => {
  it('should render correctly', () => {
    const props: Props = { groupMembers };
    const component = shallow(<GroupMembersList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
