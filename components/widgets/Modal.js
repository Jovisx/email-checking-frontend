import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  background: #d5d3d7;
  opacity: .8;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`;

const ModalPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  max-height: 100vh;
  min-height: 100vh;
  overflow: auto;
  padding: 50px 0;
  width: 100%;
`;

const ModalContent = styled.div`
  background: var(--color-white);
  margin: auto;
  max-width: calc(100% - 40px);
  padding: 30px;
  position: relative;
  text-align: center;
  height: 100%;
  width: 440px;
  z-index: 1;

  @media all and (max-width: 575px) {
    padding: 20px;
  }

  &.large {
    width: 598px;
  }

  &.small {
    width: 426px;
  }

  > p {
    font-size: 16px;
    line-height: 24px;
  }

  hr {
    border-bottom: 0;
    border-top: 1px solid var(--color-grey-lighter);
    margin: 0 -30px;

    @media all and (max-width: 575px) {
      margin: 0 -20px;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  margin-top: 30px;

  @media all and (max-width: 575px) {
    margin-top: 20px;
  }

  @media all and (max-width: 420px) {
    flex-direction: column;
  }

  button {
    width: 100%;

    &:not(:first-child) {
      margin-left: 16px;

      @media all and (max-width: 420px) {
        margin-top: 16px;
        margin-left: 0;
      }
    }
  }
`;

const CloseIcon = styled.div`
  background: var(--color-grey-bright);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  padding: 4px;
  position: absolute;
  right: -16px;
  top: -16px;

  i {
    color: var(--color-grey);
    font-size: 24px;
  }
`;

const Title = styled.h4`
  color: var(--color-black);
  line-height: 32px;
  margin-bottom: 8px;

  span {
    color: var(--color-blue);
    white-space: nowrap;
  }
`;

function Modal({
  children,
  isOpened,
  size,
  title,
  confirmLabel,
  cancelLabel,
  clearable,
  confirmable,
  cancelable,
  onConfirm,
  onCancel,
  ...props
}) {
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'auto';
  });

  const noFooter = !cancelable && !confirmable;

  return isOpened ? (
    <ModalWrapper data-theme="light" {...props}>
      <ModalPlaceholder
        name="placeholder"
        onClick={({ target }) => clearable && target.getAttribute('name') === 'placeholder' && onCancel()}
      >
        <ModalOverlay name="overlay" />
        <ModalContent className={size}>
          <CloseIcon onClick={onCancel}>
            <i className="icon-close" />
          </CloseIcon>
          {title && <Title>{title}</Title>}
          {children}
          {!noFooter && (
            <ModalFooter>
              {cancelable && <Button type="secondary" onClick={onCancel}>{cancelLabel}</Button>}
              {confirmable && <Button onClick={onConfirm}>{confirmLabel}</Button>}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalPlaceholder>
    </ModalWrapper>
  ) : null;
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isOpened: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  clearable: PropTypes.bool,
  confirmable: PropTypes.bool,
  cancelable: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: null,
  size: 'normal',
  title: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  clearable: true,
  confirmable: true,
  cancelable: true,
  onConfirm: () => { },
};

export default Modal;
