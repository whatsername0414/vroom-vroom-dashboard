import * as api from '../../api';

export const getUsers = (type, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GET_USERS_LOADING' });
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
    dispatch({ type: 'GET_USERS', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'GET_USERS_ERROR',
      payload: message,
    });
  }
};
