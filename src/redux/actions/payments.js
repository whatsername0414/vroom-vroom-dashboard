import * as api from '../../api';

export const getPayments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GET_PAYMENTS_LOADING' });
    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await api.getPayments(config);
    dispatch({ type: 'GET_PAYMENTS', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'GET_PAYMENTS_ERROR',
      payload: message,
    });
  }
};
export const updatePayment = (id, body) => async (dispatch, getState) => {
  console.log(body);
  try {
    dispatch({ type: 'PAYMENT_LOADING' });
    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await api.updatePayment(id, body, config);
    dispatch({ type: 'PAYMENT', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'PAYMENT_ERROR',
      payload: message,
    });
  }
};
