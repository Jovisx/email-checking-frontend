import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import cookies from 'next-cookies';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Router } from 'i18n';

import configureStore from 'store/configureStore';
import { authActions } from 'store/actions';
import { appWithTranslation } from 'i18n';
import { getTheme } from 'utils/theme';
import { setCookie } from 'utils/cookie';

import { Icon } from 'components/toastify';

import MobileLayout from 'layouts/MobileLayout';

class EMAILApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get user last visited information from cookie and set to redux
    const { theme } = cookies(ctx);

    return { pageProps, theme: theme || 'light' };
  }

  constructor(props) {
    super(props);
    const { theme: themeName } = this.props;
    this.state = {
      theme: this.generateThemeObject(themeName),
      isMobile: false,
    };
    this.mobileAndTabletCheck = this.mobileAndTabletCheck.bind(this);
  }

  componentDidMount() {
    this.mobileAndTabletCheck();
    axios.interceptors.response.use(response => response, error => {
			if (error.response && error.response.status === 401) {
				if (this.props.profileStatus !== 'running') {
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('accessToken');
          }
					this.props.store.dispatch(authActions.logoutSuccess());
          Router.push({
            pathname: '/login',
          });
				}
			}
			return Promise.reject(error);
		});
  }

  handleChangeTheme = () => {
    const { theme } = this.state;
    const newThemeName = (theme && theme.name) === 'light' ? 'dark' : 'light';
    setCookie('theme', newThemeName, 30);
    this.setState({ theme: this.generateThemeObject(newThemeName) });
  }

  generateThemeObject = themeName => {
    const theme = getTheme(themeName);
    theme.changeTheme = this.handleChangeTheme;
    return theme;
  }
  
  mobileAndTabletCheck = () => {
    let isMobile = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) isMobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
    this.setState({isMobile});
  };

  render() {
    const { Component, pageProps, store } = this.props;
    if (this.state.isMobile) {
      return (
        <MobileLayout />
      )
    }
    // Commented until we have multiple theme UI
    // const { theme } = this.state;
    const theme = { name: 'light' };

    return (
      <Container>
        <Head>
          <title>Email Check</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta charSet="utf-8" />
        </Head>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
        <ToastContainer
          autoClose={5000}
          closeButton={<Icon name="close" />}
          hideProgressBar
          newestOnTop
        />
        <div id="tooltip-container" data-theme={theme.name} />
      </Container>
    );
  }
}

export default withRedux(configureStore)(
  withReduxSaga(
    appWithTranslation(EMAILApp),
  ),
);
