import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'i18n';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  
  .label {
    font-weight: 500;
    margin-right: 10px;
    line-height: 16px;

    &.green { color: var(--color-primary); }
    &.red { color: var(--color-red); }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 26px;
    height: 16px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-primary);
    border: 1px solid var(--color-primary);
    transition: .4s;
    
    &:before {
      position: absolute;
      content: "";
      height: 10px;
      width: 10px;
      top: 2px;
      left: 2px;
      bottom: 3px;
      background-color: var(--color-white);
      -webkit-transition: .4s;
      transition: .4s;
    }

    &.off {
      background-color: transparent;
      border: 1px solid var(--color-grey-bg);

      &:before {
        background-color: var(--color-red);
      }
    }
  }

  input {
    &:checked + .slider:before {
      transform: translateX(10px);
    }
  }
`;

function Toggle({ isOn, onChange, labels: [on, off], ...props }) {
  const { t } = useTranslation('language');
  const handleChange = () => {
    onChange(!isOn);
  };

  return (
    <ToggleWrapper {...props}>
      <p className={`label p-xsmall ${isOn ? 'green' : 'red'}`}>
        {isOn ? (on || t('statuses.enabled')) : (off || t('statuses.disabled'))}
      </p>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={handleChange} />
        <span className={`slider ${isOn ? 'on' : 'off'}`} />
      </label>
    </ToggleWrapper>
  );
}

Toggle.propTypes = {
  isOn: PropTypes.bool,
  onChange: PropTypes.func,
  labels: PropTypes.array,
};

Toggle.defaultProps = {
  isOn: false,
  labels: [],
  onChange: () => {},
};

export default Toggle;
