import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-green);
  border-radius: 50%;
  position: relative;
  flex: 0 0 36px;
  height: 36px;
  z-index: 1;

  &.error {
    background: var(--color-red);
    &:not(.close):after {
      background: var(--color-red);
    }
  }

  &.info {
    background: var(--color-blue);
    &:not(.close):after {
      background: var(--color-blue);
    }
  }

  &.close {
    position: absolute;
    top: -12px;
    right: -12px;
    background: var(--color-grey-bright);
    box-shadow: 0 12px 30px rgba(79, 75, 108, 0.159282);
    width: 24px;
    height: 24px;
  }

  &:not(.close):after {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-green);
    border-radius: 50%;
    filter: blur(21.7463px);
    opacity: .3;
    z-index: -1;
  }
`;

function Icon({ name, ...props }) {
  return (
    <IconWrapper className={name} {...props}>
      <img src={`/static/img/icons/${name}.svg`} alt="" />
    </IconWrapper>
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(['success', 'info', 'error', 'close']),
};

Icon.defaultProps = {
  name: 'success',
};

export default Icon;
