import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'i18n';

const logoImages = {
  icon: '/static/img/icons/logo.png',
  white: '/static/img/icons/logo_white.png',
  black: '/static/img/icons/logo_black.png',
};

const LogoWrap = styled.a`
  display: inline-block;
  height: 30px;
`;

const Logo = ({ type, href, as, ...props }) => (
  <Link href={href} as={as}>
    {/* <LogoWrap {...props}><img src={logoImages[type]} alt="EMAIL CHECHK Admin LOGO" type={type} /></LogoWrap> */}
    <LogoWrap {...props}></LogoWrap>
  </Link>
);

Logo.propTypes = {
  type: PropTypes.oneOf(['icon', 'white', 'black']),
  href: PropTypes.string,
  as: PropTypes.string,
};
Logo.defaultProps = {
  type: 'icon',
  href: '/',
  as: undefined,
};

export default Logo;
