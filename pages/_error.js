import React from 'react';
import styled from 'styled-components';

import { useTranslation } from 'i18n';
import Logo from 'components/widgets/Logo';
import Button from 'components/widgets/Button';

const Content = styled.div`
  margin: 0 auto;
  
  #content-outer {
    margin: 100px auto;
    width: 400px;
    max-width: 100%;
    text-align: center;

    .info {
      p {
        font-size: 14px;
        padding: 50px 0;
      }

      .redirect {
        display: block;
      }
    }
  }
`;


const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Content>
      <div id="content-outer">
        <Logo id="logo-black" className="urnp-logo" type="black" />

        <div className="info">
          <p>{`${t('notfound.error')}`}</p>
          <div className="redirect" onClick={() => window.history.back()}>
            <Button type="error">{`${t('notfound.homepage')}`}</Button>
          </div>
        </div>
      </div>
    </Content>
  );
};

ErrorPage.getInitialProps = async () => ({
  namespacesRequired: ['language'],
});

export default ErrorPage;
