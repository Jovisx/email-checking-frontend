import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

const Wrapper = styled.div`
  width: 100%;

  .p-small {
    color: var(--color-grey);
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 6px;
  }

  .error {
    color: var(--color-red);
    margin-top: 5px;
    text-align: left;
  }

  &.suffix {
    margin-bottom: 0;

    * {
      border: 0;
    }
  }
`;

const colourStyles = (hasError = false, isSuffix = false) => ({
  menu: base => ({ ...base, borderRadius: 0, marginTop: 0, border: '2px solid var(--color-border-main)', boxShadow: 'none' }),
  menuList: base => ({ ...base, padding: 0, marginTop: isSuffix ? -8 : 0 }),
  control: (styles, { isFocused }) => {
    const border = isFocused ? '2px solid var(--color-primary)' : '2px solid var(--color-border-main)';
    return {
      ...styles,
      backgroundColor: isSuffix ? 'transparent' : 'var(--color-bg-input)',
      border: hasError ? '2px solid var(--color-red)' : border,
      borderRadius: 0,
      boxShadow: 'none',
      minHeight: isSuffix ? 'inherit' : 36,
      ':hover': {
        borderColor: isFocused ? 'var(--color-blue)' : 'var(--color-border-hover)',
      },
    };
  },
  option: (styles, { isFocused, isSelected, isDisabled }) => ({
    ...styles,
    backgroundColor: isFocused ? 'var(--color-bg-backdrop)' : 'var(--color-bg-primary)',
    color: isSelected && !isDisabled ? 'var(--color-text-highlight)' : 'var(--color-text-main)',
    cursor: 'pointer',
    fontWeight: isDisabled ? 400 : 500,
    fontStyle: isDisabled ? 'italic' : 'normal',
    padding: '10px 16px',
    ':active': {
      ...styles[':active'],
      backgroundColor: 'var(--color-bg-primary)',
    },
    textAlign: 'center',
  }),
  noOptionsMessage: styles => ({ ...styles, backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-main)', padding: '10px 16px' }),
  input: styles => ({ ...styles, margin: 0, padding: 0, color: 'var(--color-text-main)' }),
  placeholder: styles => ({ ...styles, color: 'var(--color-text-main)', margin: 0 }),
  valueContainer: styles => ({ ...styles, padding: isSuffix ? '12px 14px 12px 18px' : '7px 8px', height: isSuffix ? 46 : 'auto', display: 'block' }),
  singleValue: styles => ({ ...styles, color: 'var(--color-text-highlight)', margin: 0, fontWeight: 500 }),
  indicatorSeparator: () => ({ display: 'none' }),
  indicatorsContainer: styles => ({ ...styles, ...(isSuffix ? { position: 'absolute', top: 12 } : {}) }),
});

const Field = styled(Select)`
  font-size: 11px;
  line-height: 16px;
`;

const Indicator = styled.i`
  font-size: 24px;
  margin-right: 10px;

  &.suffix {
    font-size: 12px;
    margin-left: 5px;
    line-height: 20px;
  }
`;

/* eslint-disable react/prop-types */
const IconIndicator = isSuffix => ({ selectProps }) => (
  <Indicator
    className={`icon-triangle ${isSuffix ? 'suffix' : ''}`}
    style={{ color: 'var(--color-red)', transform: selectProps.menuIsOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
  />
);
/* eslint-enable react/prop-types */

function Dropdown({ id, label, options, error, className, ...props }) {
  const isSuffix = className.includes('suffix');
  const DropdownIndicator = IconIndicator(isSuffix);

  return (
    <Wrapper className={className}>
      {label && <p className="p-small">{label}</p>}
      <Field
        instanceId={`dropdown-${id}`}
        inputId={`dropdown-input-${id}`}
        options={options}
        components={{ DropdownIndicator }}
        isSearchable
        styles={colourStyles(error, isSuffix)}
        {...props}
      />
      {error && <p className="error">{error}</p>}
    </Wrapper>
  );
}

Dropdown.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  error: PropTypes.string,
};

Dropdown.defaultProps = {
  id: 'default',
  label: '',
  className: '',
  error: '',
};

export default Dropdown;
