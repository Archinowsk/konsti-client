import React from 'react';
import { reduxForm } from 'redux-form';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';

const LoginFormWithReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

describe('LoginForm', () => {
  it('should render correctly', () => {
    const component = shallow(<LoginFormWithReduxForm />);
    expect(component).toMatchSnapshot();
  });
});
