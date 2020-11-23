import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Head from 'next/head';
import { useTranslation } from 'i18n';

const AuthLayoutWrapper = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
`;

const RightWrapper = styled.div`
  position: relative;
  flex: 1;
  background: var(--color-bg-main);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  #right-privacy-terms {
    display: none;
  }
  @media (max-width: 767px) {
    #right-privacy-terms {
      display: flex;
    }
  }
  @media (max-width: 576px) {
    #right-privacy-terms {
      display: none;
    }
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  padding: 40px 50px 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 1023px) {
    padding: 40px 40px 120px;
  }
  @media (max-width: 767px) {
    padding: 40px 20px 100px;
  }
`;

export const AuthImageWrapper = styled.div`
  margin-bottom: 50px;
`;

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 388px;
  text-align: center;
  h2 {
    margin-bottom: 12px;
  }
  > p {
    margin-bottom: 40px;
  }
  button {
    margin-top: 30px;
    min-width: 180px;
  }
  > p.error {
    color: var(--color-red);
    margin-bottom: 10px;
    text-align: left;
  }
  > p.success {
    color: var(--color-green);
    margin-bottom: 10px;
  }
`;

export const FooterLinkWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  bottom: 0px;
  a {
    cursor: pointer;
    color: var(--color-primary);
  }
  @media (max-width: 767px) {
    height: 56px;
  }
`;

const AuthLayout = ({ children, browserTitle }) => {
  const { t } = useTranslation('language');

  return (
    <>
      <Head>
        <title>{t('email_check')} | {browserTitle}</title>
      </Head>
      <AuthLayoutWrapper>
        <RightWrapper>
          <ContentWrapper>{children}</ContentWrapper>
        </RightWrapper>
      </AuthLayoutWrapper>
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  browserTitle: PropTypes.string,
};

AuthLayout.defaultProps = {
  children: null,
  browserTitle: '',
};

export default AuthLayout;
