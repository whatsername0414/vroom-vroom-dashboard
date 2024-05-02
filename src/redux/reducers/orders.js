export const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ORDERS_LOADING':
      return { ...state, loading: true };
    case 'GET_ORDERS':
      return { ...state, loading: false, orders: action.payload };
    case 'GET_ORDERS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_LOADING':
      return { ...state, loading: true };
    case 'ORDER':
      return { loading: false, order: action.payload };
    case 'ORDER_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
