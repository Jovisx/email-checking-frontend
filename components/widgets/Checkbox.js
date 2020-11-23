import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Icon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${props => (props.size === 'small' ? 16 : 22)}px;
  min-width: ${props => (props.size === 'small' ? 16 : 22)}px;
  height: ${props => (props.size === 'small' ? 16 : 22)}px;
  background-color: ${props => (props.check ? 'var(--color-red)' : 'var(--color-bg-input)')};
  border: ${props => (props.check ? 'none' : '2px solid var(--color-border-hover)')};

  &.error {
    border: 2px solid var(--color-red);
  }
  
  >span:after {
    content: "";
    position: absolute;
    left: ${props => (props.size === 'small' ? 5 : 8)}px;
    top: ${props => (props.size === 'small' ? 2 : 4)}px;
    width: ${props => (props.size === 'small' ? 3 : 4)}px;
    height: ${props => (props.size === 'small' ? 7 : 9)}px;
    border: solid var(--color-white);
    transition: all .2s;
    border-width: 0 2px 2px 0;
    transform: rotate(35deg);
  }
`;

const Label = styled.div`
  margin-right: ${props => (props.align === 'right' ? 12 : 0)}px;
  margin-left: ${props => (props.align === 'left' ? 12 : 0)}px;
  order: ${props => (props.align === 'right' ? -1 : 1)};
  color: ${props => (props.checked ? 'var(--color-text-highlight)' : 'var(--color-text-main)')};
  >* {
    color: ${props => (props.checked ? 'var(--color-text-highlight)' : 'var(--color-text-main)')};
  }

  user-select: none;

  > * {
    color: ${props => (props.checked ? 'var(--color-text-highlight)' : 'var(--color-text-main)')};
  }

  &.large {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }

  &.small {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

const Checkbox = ({ children, size, labelSize, checked, align, disabled, touched, error, ...props }) => {
  const classes = [labelSize || size];
  const onChange = () => {
    if (disabled) {
      return;
    }
    props.onChange(!checked);
  };

  return (
    <CheckboxWrapper
      {...props}
      onClick={() => onChange()}
      disabled={disabled}
    >
      <Icon
        className={touched && error ? 'error' : ''}
        size={size}
        check={checked}
        align={align}
        disabled={disabled}
      >
        { checked && <span /> }
      </Icon>
      {children ? (
        <Label
          align={align}
          className={classes.join(' ')}
          checked={checked}
        >
          {children}
        </Label>
      ) : null }
    </CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
  size: PropTypes.string,
  labelSize: PropTypes.string,
  checked: PropTypes.bool,
  align: PropTypes.string,
  disabled: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  children: null,
  size: 'large',
  labelSize: 'large',
  checked: false,
  disabled: false,
  touched: false,
  error: '',
  align: 'left',
  onChange: () => { },
};

export default Checkbox;
