import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  border: none;
  background: var(--color-primary);
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
  color: var(--color-white);
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  min-width: 144px;
  outline: none;
  padding: 14px 16px;
  position: relative;
  text-transform: uppercase;
  vertical-align: top;

  &:hover {
    box-shadow: 0 6px 27px -6px var(--color-primary);
  }
  &.medium:hover {
    box-shadow: 0 6px 21px -6px var(--color-primary);
  }
  &.small:hover {
    box-shadow: 0 6px 15px -6px var(--color-primary);
  }

  &.secondary {
    color: var(--color-black);
    background: var(--color-grey-lighter);
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
    box-shadow: none !important;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 8px;
      height: 100%;
      background: var(--color-grey-lighter);
      opacity: 1;
      z-index: 1;
    }

    &:not([disabled]):hover:after {
      background: var(--color-grey-hover);
    }

    &:not([disabled]):active:after {
      background: var(--color-grey-hover);
      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
    }
  }

  &.info {
    background: var(--color-blue);

    &:hover {
      box-shadow: 0 6px 27px -6px var(--color-blue);
    }
    &.medium:hover {
      box-shadow: 0 6px 21px -6px var(--color-blue);
    }
    &.small:hover {
      box-shadow: 0 6px 15px -6px var(--color-blue);
    }
  }

  &.success {
    background: var(--color-green);

    &:hover {
      box-shadow: 0 6px 27px -6px var(--color-green);
    }
    &.medium:hover {
      box-shadow: 0 6px 21px -6px var(--color-green);
    }
    &.small:hover {
      box-shadow: 0 6px 15px -6px var(--color-green);
    }
  }

  &:active {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.medium {
    font-size: 14px;
    line-height: 16px;
    min-width: 100px;
    padding: 10px 8px;
  }

  &.small {
    font-size: 12px;
    line-height: 18px;
    min-width: 100px;
    padding: 6px 10px;
  }

  &.full {
    min-width: unset;
    width: 100%;
  }
`;

function Button({ children, full, size, type, ...props }) {
  const classes = [size, type];
  if (full) classes.push('full');

  return (
    <ButtonWrapper className={classes.join(' ')} {...props}>
      {children}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  children: PropTypes.elementType.isRequired,
  full: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  size: 'large',
  type: 'primary',
  full: false,
};

export default Button;
