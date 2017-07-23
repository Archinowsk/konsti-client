const validate = (values, props) => {
  const { t } = props;
  const errors = {};

  if (!values.username) {
    errors.username = t('validation.required');
  }

  if (!values.password) {
    errors.password = t('validation.required');
  }

  if (!values.serial) {
    errors.serial = t('validation.required');
  }

  return errors;
};

export default validate;
