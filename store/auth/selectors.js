export const initialState = {
  loginStatus: 'idle',
  user: null,
  loginErrors: [],
  logoutStatus: 'idle',
  logoutErrors: null,
};

export const user = (state = initialState) => (
  state.user || initialState.user
);
export const loginStatus = (state = initialState) => (
  state.loginStatus || initialState.loginStatus
);
export const loginErrors = (state = initialState) => (
  state.loginErrors || initialState.loginErrors
);
export const logoutStatus = (state = initialState) => (
  state.logoutStatus || initialState.logoutStatus
);
export const logoutErrors = (state = initialState) => (
  state.logoutErrors || initialState.logoutErrors
);