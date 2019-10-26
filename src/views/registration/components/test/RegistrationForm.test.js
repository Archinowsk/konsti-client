// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import { shallow } from 'enzyme';
import RegistrationForm from '../RegistrationForm';

const RegistrationFormWithReduxForm = reduxForm({
  form: 'registration',
})(RegistrationForm);

describe('RegistrationForm', () => {
  it('should render correctly', () => {
    const component = shallow(<RegistrationFormWithReduxForm />);
    expect(component).toMatchSnapshot();
  });
});
