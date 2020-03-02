import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldProps } from 'redux-form';

export const FormField: FC<FieldProps> = (props: FieldProps): ReactElement => {
  const { type } = props;
  const { name, onChange, onBlur, onDragStart, onDrop, onFocus } = props.input;
  const { touched, error } = props.meta;
  const { t } = useTranslation();

  const [fieldType, setFieldType] = React.useState<string>('');

  React.useEffect(() => {
    setFieldType(type);
  }, [type]);

  const classNames = ['form-input'];

  if (type === 'checkbox') {
    classNames.push('checkbox');
  }

  const togglePasswordVisibility = () => {
    if (fieldType === 'password') setFieldType('text');
    else if (fieldType === 'text') setFieldType('password');
  };

  return (
    <>
      <div className='form-row'>
        <div className='form-field'>
          <input
            className={classNames.join(' ')}
            id={name}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
            placeholder={t(name)}
            type={fieldType}
          />
          {type === 'checkbox' && <label htmlFor={name}>{t(name)}</label>}
        </div>

        {type === 'password' && (
          <span className='form-field-icon'>
            <FontAwesomeIcon
              icon={fieldType === 'password' ? 'eye' : 'eye-slash'}
              onClick={togglePasswordVisibility}
            />
          </span>
        )}
      </div>

      {touched && error && (
        <div className='form-field-error'>
          <span className='form-field-error-message'>{t(error)}</span>
        </div>
      )}
    </>
  );
};
