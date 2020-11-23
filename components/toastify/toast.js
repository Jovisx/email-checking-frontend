import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast as toastify } from 'react-toastify';

import Icon from './Icon';

const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  background: var(--color-white);
  border-left: 2px solid var(--color-green);
  box-shadow: 0 12px 30px rgba(79, 75, 108, 0.159282);
  min-height: 80px;
  padding: 0 20px;

  &.error {
    border-left-color: var(--color-red);
  }
  
  &.info {
    border-left-color: var(--color-blue);
  }
  
  &--default {
    margin-top: 12px;
  }
`;

const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: var(--color-grey);
    font-size: 14px;
    line-height: 18px;
    word-break: break-all;
  }

  .Title {
    color: var(--color-black);
    font-weight: 500;
    line-height: 17px;
    word-break: break-all;
  }
`;

export function Toast({ title, label, type, ...props }) {
  return (
    <ToastWrapper {...props} className={type}>
      <Icon style={{ marginRight: 20 }} name={type} />
      <ToastContainer>
        {title && <p className="Title">{title}</p>}
        {label && <p>{label}</p>}
      </ToastContainer>
    </ToastWrapper>
  );
}

Toast.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(['success', 'info', 'error']),
};

Toast.defaultProps = {
  title: '',
  label: '',
  type: 'success',
};

function toast({ title, label, type = 'success', ...props }, options = {}) {
  toastify(<Toast title={title} label={label} type={type} {...props} />, options);
}

toast.info = (content, options) => toast({ ...content, type: 'info' }, options);
toast.error = (content, options) => toast({ ...content, type: 'error' }, options);
toast.success = (content, options) => toast({ ...content, type: 'success' }, options);

export default toast;
