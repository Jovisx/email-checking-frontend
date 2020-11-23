import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fromAuth } from 'store/selectors';
import { Router } from 'i18n';

const withAuth = Component => {
  const AuthComponent = ({ ...props }) => {
    const isAuthenticated = useSelector(fromAuth.isAuthenticated);
    const loginStatus = useSelector(fromAuth.loginStatus);
    const user = useSelector(fromAuth.user);

    useEffect(() => {
      if (loginStatus === 'totp_request') {
        Router.replace(`/login/2fa?redirect=${Router.route}`);
      } else if (!isAuthenticated) {
        if (!Router.route.includes('/login')) {
          Router.replace(`/login?redirect=${Router.route}`);
        }
      }
    }, [loginStatus]);

    return (
      <Component
        {...props}
        user={user}
      />
    );
  };

  AuthComponent.getInitialProps = Component.getInitialProps;

  return AuthComponent;
};

export default withAuth;
