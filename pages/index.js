import React from 'react';
import OnboardingLayout from 'layouts/OnboardingLayout';

const IndexPage = () => (
  <OnboardingLayout />
);

IndexPage.getInitialProps = async() => ({
  namespacesRequired: ['language'],
});

export default IndexPage;
