const validate = (values, props) => {
  const { t } = props;
  const errors = {};

  if (!values.username) {
    errors.username = t('validation.required');
  }

  if (!values.password) {
    errors.password = t('validation.required');
  }

  /*
  if (!values.fullName) {
    errors.fullName = i18n.t('validation.required');
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = i18n.t('validation.required');
  }

  if (!values.email) {
    errors.email = i18n.t('validation.required');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18n.t('validation.invalidEmail');
  }

  if (!values.teamName) {
    errors.favoriteColor = i18n.t('validation.required');
  }

  if (!values.teamSize) {
    errors.favoriteColor = i18n.t('validation.required');
  }

  if (!values.language) {
    errors.favoriteColor = i18n.t('validation.required');
  }
  */

  return errors;
};

export default validate;
