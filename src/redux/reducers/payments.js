export const paymentsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PAYMENTS_LOADING':
      return { ...state, loading: true };
    case 'GET_PAYMENTS':
      return { loading: false, payments: action.payload };
    case 'GET_PAYMENTS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PAYMENT_LOADING':
      return { ...state, loading: true };
    case 'PAYMENT':
      return { loading: false, payment: action.payload };
    case 'PAYMENT_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
