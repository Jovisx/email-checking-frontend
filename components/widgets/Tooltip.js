import React from 'react';
import PropTypes from 'prop-types';
import RCTooltip from 'rc-tooltip';

const getTooltipContainer = () => (document.getElementById('tooltip-container'));

const Tooltip = ({ children, overlay, ...props }) => (
  <RCTooltip
    {...props}
    getTooltipContainer={getTooltipContainer}
    overlay={(
      <div data-theme="dark">
        {typeof overlay === 'function' ? overlay() : overlay}
      </div>
    )}
  >
    {children}
  </RCTooltip>
);

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]),
  overlay: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

Tooltip.defaultProps = {
  children: null,
  overlay: null,
};

export default Tooltip;
