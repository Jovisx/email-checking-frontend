import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { authActions } from 'store/actions';
import { fromAuth } from 'store/selectors';
import matchPath from 'utils/matchPath';
import { Link } from 'i18n';
import Logo from 'components/widgets/Logo';


const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  top: 0;
  background-color: var(--color-bg-primary);
  z-index: 100;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0,0,0,.2);

  .urnp-logo {
    width: 300px;
    height: 80px;
    display: flex;
    align-items: center;
    background: var(--color-bg-primary);
    cursor: pointer;
    padding: 20px;
  }

  @media(max-width: 767px) {
    .urnp-logo {
      width: 80px;
    }
  }
`;

const MobileMenuWrapper = styled.div`
  display: none;

  .selected-menu {
    cursor: pointer;
    display: flex;
    align-items: center;

    i {
      font-size: 20px;
      color: var(--color-red);
    }

    a {
      color: var(--color-white);
      margin-left: 6px;
      margin-top: 2px;
      user-select: none;
    }

    .icon-triangle {
      transform: ${props => (props.collapsed ? 'rotate(180deg)' : 'rotate(0deg)')};
    }
  }

  .menu-list {
    position: absolute;
    min-width: 220px;
    background-color: var(--color-black);
    top: 64px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s;

    .list-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 20px 0px;
      user-select: none;
      justify-content: center;

      i {
        font-size: 20px;
        color: var(--color-text-primary);
        margin-right: 8px;
      }

      a {
        margin-top: 2px;
      }
    }
  }

  @media (max-width: 767px) {
    display: flex;
  }
`;

const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  position: relative;
  cursor: pointer;

  .user-menu-toggle {
    display: flex;
    align-items: center;

    i {
      font-size: 20px;
      color: var(--color-text-primary);
    }

    .icon-triangle {
      color: var(--color-red);
      transform: ${props => (props.collapsed ? 'rotate(180deg)' : 'rotate(0deg)')};
    }
  }

  .user-menu-dropdown {
    position: absolute;
    width: 220px;
    top: 100%;
    right: 0;
    box-shadow: 0px 4px 16px rgba(22, 20, 45, 0.12);

    .menu-item {
      display: block;
      padding: 14px 20px;
      text-align: center;
      background-color: var(--color-bg-primary);
    }
  }

  @media (max-width: 767px) {
    padding-left: 20px;
    padding-right: 20px;

    .user-menu-toggle {
      .icon-triangle {
        display: none;
      }
    }
  }
`;

export const menuItems = {
  email: {
    label: 'EMAIL POOL',
    icon: 'icon-market',
    link: true,
    href: '/email',
  },
  process: {
    label: 'PROCESS POOL',
    icon: 'icon-coins',
    link: true,
    href: '/processes',
  }
};

export const getMenuTypeFromRoute = route => {
  const location = matchPath(route, { path: '/:menu' });
  if (location && location.params.menu) {
    return location.params.menu;
  }
  return null;
};

const Header = ({
  logout,
  loginStatus,
}) => {
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [userMenuCollapsed, setUserMenuCollapsed] = useState(true);
  const router = useRouter();
  const selectedMenu = getMenuTypeFromRoute(router.route) || 'email';

  const handleToggleNav = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setNavCollapsed(!navCollapsed);
  };

  const handleToggleUserMenu = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setUserMenuCollapsed(!userMenuCollapsed);
  };

  const handleLogOut = e => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    const handleMouseDown = () => {
      setNavCollapsed(true);
      setUserMenuCollapsed(true);
    };
    document.addEventListener('click', handleMouseDown);
    return () => {
      document.removeEventListener('click', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (loginStatus === 'failure') {
      router.push({
        pathname: '/login',
        query: { redirect: router.asPath },
      });
    }
  }, [loginStatus]);

  const mobileMenu = (
    <MobileMenuWrapper collapsed={navCollapsed}>
      {!navCollapsed && (
        <div className="menu-list">
          {Object.keys(menuItems).map(key => {
            if (key !== selectedMenu) {
              const item = menuItems[key];
              return (
                <Link key={key} href={item.href}>
                  <div className="list-item" onClick={handleToggleNav}>
                    <i className={menuItems[key].icon} />
                    <a>{menuItems[key].label}</a>
                  </div>
                </Link>
              );
            }
            return null;
          })}
        </div>
      )}
    </MobileMenuWrapper>
  );

  const userMenu = (
    <UserMenuWrapper collapsed={userMenuCollapsed}>
      <a className="user-menu-toggle" onClick={handleToggleUserMenu}>
        <i className="icon-user" />
        <i className="icon-triangle" />
      </a>
      {!userMenuCollapsed && (
        <div className="user-menu-dropdown">
          <a className="menu-item" onClick={handleLogOut}>
            Sign Out
          </a>
        </div>
      )}
    </UserMenuWrapper>
  );

  return (
    <HeaderWrapper>
      <Logo href="#" className="urnp-logo" type="icon" />
      {mobileMenu}
      {userMenu}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  loginStatus: PropTypes.string.isRequired,
};

Header.defaultProps = {
};

const mapStateToProps = state => ({
  loginStatus: fromAuth.loginStatus(state),
});

const mapDispatchToProps = dispatch => ({
  logout: payload => dispatch(authActions.logoutRequest(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
