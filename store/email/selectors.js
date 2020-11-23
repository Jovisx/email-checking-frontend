export const initialState = {
  email: {},
  assignStatus: 'idle',
  assignErrors: null,
  processStatus: 'idle'
};

export const email = (state = initialState) => (
  state.email || initialState.email
);
export const assignStatus = (state = initialState) => (
  state.assignStatus || initialState.assignStatus
);
export const assignErrors = (state = initialState) => (
  state.assignErrors || initialState.assignErrors
);
export const processStatus = (state = initialState) => (
  state.processStatus || initialState.processStatus
);
