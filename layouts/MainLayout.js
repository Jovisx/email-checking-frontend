import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled, { withTheme } from 'styled-components';
import Header from 'layouts/Header';

const MainLayoutWrapper = styled.div`
  background: var(--color-bg-main);
  margin: 0 auto;
  
  #content-outer {
    margin-top: 80px;
    padding: 40px 20px;
    margin-left: 300px;

    #content-inner {
      margin: auto;
      min-height: calc(100vh - 160px);
    }

    @media (max-width: 1023px) {
      padding: 40px 20px;

      #content-inner {
        min-height: calc(100vh - 160px);
      }
    }
  }
`;

function MainLayout ({ children, title, theme }) {
  return (
    <MainLayoutWrapper data-theme={theme.name}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div id="content-outer">
        <div id="content-inner">
          {children}
        </div>
      </div>
    </MainLayoutWrapper>
  );
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  theme: PropTypes.object,
};

MainLayout.defaultProps = {
  children: null,
  title: 'Admin',
  theme: {},
};

export default withTheme(MainLayout);
