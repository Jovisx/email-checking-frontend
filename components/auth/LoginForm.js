import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'i18n';
import { FormWrapper } from 'layouts/AuthLayout';
import Button from 'components/widgets/Button';
import Checkbox from 'components/widgets/Checkbox';
import Input from 'components/widgets/Input';
import withValidations from 'components/helpers/withValidations';

const LoginForm = ({ form, onSubmit, loginErrors, loginStatus }) => {
  const { t } = useTranslation('language');

  const handleSubmit = e => {
    e.preventDefault();
    const { errors: validationErrors, values } = form.onValidate();
    if (values.status) {
      values.status = 'away';
    } else {
      values.status = 'active'
    }
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };
  const defaultValues = {
    userName: '',
    password: '',
    status: true,
  }

  return (
    <FormWrapper onSubmit={handleSubmit} defaults={defaultValues}>
      <h2>{t('auth.login.title')}</h2>
      <Input
        {...form.InputProps('userName', [
          {
            type: 'required',
            message: t('auth.validations.enter_email'),
          },
        ])}
        placeholder={'User Name'}
        autoFocus
      />
      <Input
        {...form.InputProps('password', [
          {
            type: 'required',
            message: t('auth.validations.enter_password'),
          },
          {
            type: 'minLen',
            param: 6,
            message: t('auth.validations.minlen_6'),
          },
        ])}
        type="password"
        placeholder={t('auth.password')}
      />
      <Checkbox
        {...form.CheckboxProps('status', [])}
      >
        {t('welcome.away')}
      </Checkbox>
      {
        loginErrors && loginErrors.map(error => (
          <p className="error" key={error.code}>
            {t(`errors.${error.message}`)}
          </p>
        ))
      }
      <Button type="submit" disabled={loginStatus === 'running'}>
        {t('auth.login.login_btn')}
      </Button>
    </FormWrapper>
  );
};

LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loginErrors: PropTypes.array,
  loginStatus: PropTypes.string,
};

LoginForm.defaultProps = {
  loginErrors: null,
  loginStatus: null,
};

const formInfo = {
  name: 'login',
};

export default withValidations(formInfo)(LoginForm);
