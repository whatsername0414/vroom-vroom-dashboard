import * as api from '../../api';

export const login = (body) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOADING' });
    const { data } = await api.login(body);
    dispatch({ type: 'USER', payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'USER_ERROR',
      payload: message,
    });
  }
};
export const register = (body) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOADING' });
    const { data } = await api.register({
      ...body,
    });
    dispatch({ type: 'USER', payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'USER_ERROR',
      payload: message,
    });
  }
};
export const registerRider = (body) => async (dispatch) => {
  console.log(body);
  try {
    dispatch({ type: 'REGISTER_RIDER_LOADING' });
    const { data } = await api.register({
      ...body,
    });
    dispatch({ type: 'REGISTER_RIDER', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'REGISTER_RIDER_ERROR',
      payload: message,
    });
  }
};
export const getAuthCode = () => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_CODE_LOADING' });
    const body = {
      emailAddress: 'mebanas@highlysucceed.com',
      isAdmin: true,
    };
    const { status } = await api.getAuthCode(body);
    dispatch({ type: 'AUTH_CODE', payload: status === 200 });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'AUTH_CODE_ERROR',
      payload: message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'LOGOUT' });
};
