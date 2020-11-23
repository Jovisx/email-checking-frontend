import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Link, useTranslation } from 'i18n';
import Button from 'components/widgets/Button';

const OnboardingLayoutWrapper = styled.div`
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

    button {
      min-width: 230px;
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

  h1 {
    color: var(--color-white);
  }
  p {
    color: var(--color-text-primary);
    margin-top: 16px;
    font-weight: 400;
  }

  @media (max-width: 575px) {
    text-align: left;
    max-width: 100%;
    padding: 0 20px;

    h1 {
      font-size: 32px;
      line-height: 40px;
    }
    p {
      font-size: 16px;
      line-height: 28px;
    }
  }
`;

const OnboardingLayout = () => {
  const { t } = useTranslation('language');
  return (
    <>
      <Head>
        <title>{t('Email Checking')} | {t('welcome.title')}</title>
      </Head>
      <OnboardingLayoutWrapper>
        <ContentWrapper>
          <IntroWrapper>
            <h1>{t('welcome.welcome_title')}</h1>
          </IntroWrapper>
          <div className="nav-btn-wrapper">
            <Link href="/login">
              <a>
                <Button type="info">
                  {t('welcome.login')}
                </Button>
              </a>
            </Link>
          </div>
        </ContentWrapper>
      </OnboardingLayoutWrapper>
    </>
  );
};

export default OnboardingLayout;
