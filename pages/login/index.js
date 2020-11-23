import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, useTranslation } from 'i18n';
import { authActions } from 'store/actions';
import { fromAuth } from 'store/selectors';
import AuthLayout, {
  FooterLinkWrapper,
} from 'layouts/AuthLayout';
import LoginForm from 'components/auth/LoginForm';

const LoginPage = ({
  initValues,
  loginUser,
  loginErrors,
  loginStatus,
}) => {
  const { t } = useTranslation('language');

  const onSubmit = userInfo => {
    loginUser(userInfo);
  };

  useEffect(() => {
    initValues(['loginErrors']);
  }, []);

  useEffect(() => {
    if (loginStatus === 'success') {
      if (Router.query && Router.query.redirect) {
        Router.push(Router.query.redirect);
      } else {
        Router.push('/email');
      }
    }
  }, [loginStatus, loginErrors]);

  return (
    <AuthLayout browserTitle={t('auth.login.title')}>
      <LoginForm onSubmit={onSubmit} loginErrors={loginErrors} loginStatus={loginStatus} />
      <FooterLinkWrapper>
      </FooterLinkWrapper>
    </AuthLayout>
  );
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['language'],
});

LoginPage.propTypes = {
  initValues: PropTypes.func.isRequired,
  loginErrors: PropTypes.array,
  loginStatus: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  loginErrors: null,
  loginStatus: null,
};

const mapStateToProps = state => ({
  loginErrors: fromAuth.loginErrors(state),
  loginStatus: fromAuth.loginStatus(state),
});

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(authActions.loginUserRequest(payload)),
  initValues: payload => dispatch(authActions.initValues(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
