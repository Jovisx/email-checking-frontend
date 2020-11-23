import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.div``;

const Container = styled.div`
  padding: 0;
  max-width: unset;

  .row {
    margin: 0 -${props => (props.gutter || 20) / 2}px;
  }
  .row .balance {
    margin: 0 -${props => (props.gutter || 20) / 2}px;
    width: 100%;
  }

  .col-12 {
    padding: 0 ${props => (props.gutter || 20) / 2}px;
  }

  .col-12 > div:not(.row) {
    margin-bottom: ${props => props.gutter || 20}px;
  }
`;

function gridClasses(props = {}) {
  const { xl, lg, md, sm } = props;
  const list = { xl, lg, md, sm };
  const classes = Object.keys(list)
    .filter(key => list[key])
    .map(key => `col-${key}-${list[key]}`)
    .join(' ');
  return `col-12 ${classes}`;
}

const GridContainer = ({ children, ...props }) => (
  <Container className="container" {...props}>
    {children}
  </Container>
);
const Row = ({ className, children }) => <Section className={`row ${className}`}>{children}</Section>;
const Col = ({ className, children, ...props }) => <Section className={`${gridClasses(props)} ${className}`}>{children}</Section>;

/* eslint-disable react/require-default-props */
const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
/* eslint-enable react/require-default-props */

const defaultProps = {
  className: '',
  children: null,
};

GridContainer.propTypes = propTypes;
Row.propTypes = propTypes;
Col.propTypes = propTypes;

GridContainer.defaultProps = defaultProps;

export { GridContainer, Row, Col };
