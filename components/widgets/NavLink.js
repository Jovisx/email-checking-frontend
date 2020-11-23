import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Link } from 'i18n';
import matchPath from 'utils/matchPath';

const NavLink = ({ router, children, ...props }) => {
  const child = Children.only(children);
  let className = child.props.className || null;

  if (typeof props.activeClassName === 'string' && props.activeClassName) {
    const isMatched = matchPath(router.route, {
      path: props.as || props.href,
    });
    if (isMatched) {
      className = `${className !== null ? className : ''} ${props.activeClassName}`.trim();
    }
  }

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};


NavLink.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
  activeClassName: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
};

NavLink.defaultProps = {
  children: null,
  router: PropTypes.object,
  activeClassName: 'active',
  href: undefined,
  as: undefined,
};
export default withRouter(NavLink);
