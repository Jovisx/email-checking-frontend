import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputWrapper = styled.div`
  text-align: left;
  margin-bottom: 12px;

  .p-small {
    color: var(--color-grey);
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 6px;
  }

  p.error {
    color: var(--color-red);
    margin-top: 5px;
  }
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid var(--color-border-main);
  position: relative;
  transition: all 0.3s;

  input, textarea {
    background: var(--color-bg-input);
    color: var(--color-text-highlight);
    font-size: 14px;
    line-height: 22px;

    border: none;
    outline: none;
    width: 100%;

    &::placeholder {
      color: var(--color-text-main);
    }

    &:disabled {
      color: var(--color-grey-light);
    }
  }

  &.small {
    input, textarea {
      padding: 5px 16px;
    }
  }

  &.medium {
    input, textarea {
      padding: 12px 16px;
    }
  }

  &.hover {
    border-color: var(--color-border-hover);
  }

  &.focus {
    border-color: var(--color-primary);
  }

  &.error {
    border-color: var(--color-red);

    input, textarea {
      caret-color: var(--color-red);
    }
  }

  &.disabled {
    border-color: var(--color-border-main);

    input, textarea {
      background-color: var(--color-bg-main);
    }
  }
`;

const Icon = styled.div`
  cursor: pointer;
  display: flex;
  font-size: 24px;
  position: absolute;
  right: 12px;

  i {
    color: var(--color-text-primary);
    transition: all 0.2s;

    &:active {
      color: var(--color-red);
    }
  }
`;

const Suffix = styled.div`
  position: absolute;
  right: 0;
  text-align: center;
  width: 58px;
  line-height: 100%;
`;

function Input({ icon, suffix, label, type, size, visible, onBlur, pattern, onChange, touched, error, textarea, ...props }) {
  const { disabled } = props;
  const [focus, onFocus] = React.useState(props.autoFocus);
  const [hover, onHover] = React.useState(false);
  const [view, onView] = React.useState(false);
  const option = { disabled, focus, hover, error };
  let wrapperClass = Object.keys(option)
    .filter(key => option[key])
    .join(' ');
  wrapperClass = `${wrapperClass} ${size}`;
  const suffixPR = suffix ? 58 : 16;
  const handleChange = e => {
    if (typeof onChange === 'function') {
      e.persist();
      if (!pattern || pattern.test(e.target.value)) {
        onChange(e);
      }
    }
  };

  return (
    <InputWrapper>
      {label && <p className="p-small">{label}</p>}
      <Field className={wrapperClass}>
        {!textarea ? (
          <input
            {...props}
            type={view ? 'text' : type}
            onBlur={e => {
              onFocus(false);
              onBlur(e);
            }}
            onFocus={() => onFocus(true)}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onChange={handleChange}
            style={{ paddingRight: type === 'password' && visible ? 48 : suffixPR }}
          />
        ) : (
          <textarea
            {...props}
            type={view ? 'text' : type}
            onBlur={e => {
              onFocus(false);
              onBlur(e);
            }}
            onFocus={() => onFocus(true)}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onChange={handleChange}
            style={{ paddingRight: type === 'password' && visible ? 48 : suffixPR }}
          />
        )}
        {type === 'password' && visible && (
          <Icon onClick={() => onView(!view)}>
            <i className={`icon-${view ? 'no-' : ''}eye`} />
          </Icon>
        )}
        {suffix && <Suffix>{suffix}</Suffix>}
      </Field>
      {option.error && <p className="error">{option.error}</p>}
    </InputWrapper>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  visible: PropTypes.bool,
  icon: PropTypes.string,
  suffix: PropTypes.element,
  touched: PropTypes.bool,
  error: PropTypes.string,
  size: PropTypes.string,
  onBlur: PropTypes.func,
  pattern: PropTypes.any,
  onChange: PropTypes.func,
  textarea: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  value: '',
  disabled: false,
  autoFocus: false,
  visible: false,
  icon: null,
  suffix: null,
  touched: false,
  error: '',
  size: 'medium',
  onBlur: () => {},
  pattern: null,
  onChange: () => {},
  textarea: false,
};

export default Input;
