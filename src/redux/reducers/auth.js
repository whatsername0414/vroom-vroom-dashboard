export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOADING':
      return { loading: true };
    case 'USER':
      return { loading: false, user: action.payload };
    case 'USER_ERROR':
      return { loading: false, error: action.payload };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
export const registerRiderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_RIDER_LOADING':
      return { loading: true };
    case 'REGISTER_RIDER':
      return { loading: false, rider: action.payload };
    case 'REGISTER_RIDER_ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getAuthCode = (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_CODE_LOADING':
      return { authCodeLoading: true };
    case 'AUTH_CODE':
      return { authCodeLoading: false, sent: action.payload };
    case 'AUTH_CODE_ERROR':
      return { authCodeLoading: false, authCodeError: action.payload };
    default:
      return state;
  }
};
