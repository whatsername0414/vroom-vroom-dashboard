import * as api from '../../api';

export const getOrders = (type, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GET_ORDERS_LOADING' });
    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: {
        type: type,
        status: status,
      },
    };
    const { data } = await api.getOrders(config);
    dispatch({ type: 'GET_ORDERS', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'GET_ORDERS_ERROR',
      payload: message,
    });
  }
};

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_LOADING' });

    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await api.getOrder(id, config);
    dispatch({ type: 'ORDER', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    dispatch({
      type: 'ORDER_ERROR',
      payload: message,
    });
  }
};

export const confirmOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_LOADING' });

    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await api.confirmOrder(id, config);
    dispatch({ type: 'ORDER', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }
    dispatch({
      type: 'ORDER_ERROR',
      payload: message,
    });
  }
};
