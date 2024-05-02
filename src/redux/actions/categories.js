import * as api from '../../api';

export const getCategories = () => async (dispatch, _) => {
  try {
    dispatch({ type: 'GET_CATEGORIES_LOADING' });
    const { data } = await api.getCategories('main');
    dispatch({ type: 'GET_CATEGORIES', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'GET_CATEGORIES_ERROR',
      payload: message,
    });
  }
};
