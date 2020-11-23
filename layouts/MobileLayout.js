import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useTranslation } from 'i18n';

const MobileLayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  background: var(--color-black);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  #left-privacy-terms {
    justify-content: center;
  }
`;

const ContentWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .nav-btn-wrapper {
    margin-top: 80px;

    .info {
      margin-right: 20px;
    }
  }

  @media (max-width: 575px) {
    .nav-btn-wrapper {
      width: 100%;
      padding: 0 20px;
      margin-top: 60px;

      .info {
        margin-right: 0px;
        margin-bottom: 16px;
      }

      button {
        min-width: 100%;
      }
    }
  }
`;

const IntroWrapper = styled.div`
  max-width: 480px;
  text-align: center;

  h3 {
    color: var(--color-white);
  }
  p {
    color: var(--color-text-primary);
    margin-top: 16px;
    font-weight: 400;
  }

  @media (max-width: 575px) {
    text-align: center;
    max-width: 100%;
    padding: 0 20px;

    h3 {
      font-size: 32px;
      line-height: 40px;
    }
  }
`;


const MobileLayout = () => {
  const { t } = useTranslation('language');
  return (
    <>
      <Head>
        <title>'Email Checking | Warning</title>
      </Head>
      <MobileLayoutWrapper>
        <ContentWrapper>
          <IntroWrapper>
            <h3>We recommend you login via PC web browser for security.</h3>
          </IntroWrapper>
        </ContentWrapper>
      </MobileLayoutWrapper>
    </>
  );
};

export default MobileLayout;
