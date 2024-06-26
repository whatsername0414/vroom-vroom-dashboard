export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS_LOADING':
      return { ...state, loading: true };
    case 'GET_USERS':
      return { ...state, loading: false, orders: action.payload };
    case 'GET_USERS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
