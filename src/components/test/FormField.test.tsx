import React from 'react';
import { shallow } from 'enzyme';
import { FormField } from '../FormField';
import { WrappedFieldProps } from 'redux-form';

describe('FormField', () => {
  it('should render correctly', () => {
    const props: WrappedFieldProps = {
      meta: {
        active: false,
        asyncValidating: false,
        autofilled: false,
        dirty: false,
        // @ts-ignore
        dispatch: () => {},
        error: 'validation.required',
        form: 'registration',
        initial: undefined,
        invalid: true,
        pristine: true,
        submitFailed: true,
        submitting: false,
        touched: true,
        valid: false,
        visited: false,
        warning: undefined,
      },
      input: {
        name: 'password',
        value: '',
        onBlur: () => {},
        onChange: () => {},
        onDragStart: () => {},
        onDrop: () => {},
        onFocus: () => {},
      },
      custom: {},
    };
    const component = shallow(<FormField {...props} />);
    expect(component).toMatchSnapshot();
  });
});
