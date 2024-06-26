import * as api from '../../api';

export const getMerchants = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GET_MERCHANTS_LOADING' });
    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await api.getMerchants(config);
    dispatch({ type: 'GET_MERCHANTS', payload: data.data });
  } catch (error) {
    const message = error?.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'GET_MERCHANTS_ERROR',
      payload: message,
    });
  }
};

export const getMerchant = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'MERCHANT_LOADING' });
    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await api.getMerchant(id, config);
    dispatch({
      type: 'MERCHANT',
      payload: { merchant: data.data, new: false },
    });
  } catch (error) {
    const message = error.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'MERCHANT_ERROR',
      payload: message,
    });
  }
};

export const createMerchant = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'MERCHANT_LOADING' });
    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await api.createMerchant(config);
    dispatch({
      type: 'MERCHANT',
      payload: { merchant: data.data[0], new: true },
    });
  } catch (error) {
    const message = error.response?.data?.data
      ? error.response.data.data.message
      : error.message;
    dispatch({
      type: 'MERCHANT_ERROR',
      payload: message,
    });
  }
};

export const updateMerchant = (id, merchant) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'MERCHANT_LOADING' });
    const {
      auth: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (typeof merchant.image === 'object') {
      const formData = new FormData();
      formData.append('image', merchant.image);
      const {
        data: { data },
      } = await api.upload(formData, config);
      merchant.image = data;
      const { data: updatedMerchant } = await api.updateMerchant(
        id,
        merchant,
        config
      );
      dispatch({
        type: 'MERCHANT',
        payload: { merchant: updatedMerchant.data, new: false },
      });
    } else {
      const { data } = await api.updateMerchant(id, merchant, config);

      dispatch({
        type: 'MERCHANT',
        payload: { merchant: data.data, new: false },
      });
    }
  } catch (error) {
    const message = error.response.data?.data
      ? error.response.data.data.message
      : 'Failed to edit product sections';
    dispatch({
      type: 'MERCHANT_ERROR',
      payload: message,
    });
  }
};

export const editProductSections =
  (merchantId, mode, productSectionId, productSection) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: 'MERCHANT_LOADING' });
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const body = { productSection };
      let res = {};
      if (mode === 'ADD_SECTION') {
        const data = await api.addProductSection(merchantId, body, config);
        res = data.data.data;
      } else if (mode === 'UPDATE_SECTION') {
        const data = await api.editProductSection(
          merchantId,
          productSectionId,
          body,
          config
        );
        res = data.data.data[0];
      } else {
        const data = await api.deleteProductSection(
          merchantId,
          productSectionId,
          config
        );
        res = data.data.data[0];
      }
      dispatch({
        type: 'MERCHANT',
        payload: { merchant: res, new: false },
      });
    } catch (error) {
      const message = error.response.data?.data
        ? error.response.data.data.message
        : 'Failed to edit product sections';
      dispatch({
        type: 'MERCHANT_ERROR',
        payload: message,
      });
    }
  };

export const createProduct =
  (merchantId, productSectionId, product) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'CREATE_PRODUCT_LOADING' });
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (typeof product.image === 'object') {
        const formData = new FormData();
        formData.append('image', product.image);
        const {
          data: { data },
        } = await api.upload(formData, config);
        product.image = data;
        const body = {
          productSectionId: productSectionId,
          product: product,
        };
        const {
          data: { data: productId },
        } = await api.createProduct(merchantId, body, config);
        dispatch({ type: 'CREATE_PRODUCT', payload: productId });
      } else {
        const body = {
          productSectionId: productSectionId,
          product,
        };
        const {
          data: { data: productId },
        } = await api.createProduct(merchantId, body, config);
        dispatch({ type: 'CREATE_PRODUCT', payload: productId });
      }
    } catch (error) {
      const message = error.response.data?.data
        ? error.response.data.data.message
        : 'Failed to create product';
      dispatch({
        type: 'CREATE_PRODUCT_ERROR',
        payload: message,
      });
    }
  };

export const updateProduct =
  (merchantId, product) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'UPDATE_PRODUCT_LOADING' });
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      if (typeof product.image === 'object') {
        const formData = new FormData();
        formData.append('image', product.image);
        const {
          data: { data },
        } = await api.upload(formData, config);
        product.image = data;
        const body = { product };
        const { status } = await api.updateProduct(merchantId, body, config);
        dispatch({ type: 'UPDATE_PRODUCT', payload: status === 200 });
      } else {
        const body = { product };
        const { status } = await api.updateProduct(merchantId, body, config);
        dispatch({ type: 'UPDATE_PRODUCT', payload: status === 200 });
      }
    } catch (error) {
      const message = error.response.data?.data
        ? error.response.data.data.message
        : 'Failed to update product';
      dispatch({
        type: 'UPDATE_PRODUCT_ERROR',
        payload: message,
      });
    }
  };

export const deleteProduct =
  (merchantId, productId, productSectionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'DELETE_PRODUCT_LOADING' });
      const {
        auth: { user },
      } = getState();
      const body = {
        productSectionId: productSectionId,
        productId: productId,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { status } = await api.deleteProduct(merchantId, body, config);
      dispatch({ type: 'DELETE_PRODUCT', payload: status === 204 });
    } catch (error) {
      const message = error.response.data?.data
        ? error.response.data.data.message
        : 'Failed to delete product';
      dispatch({
        type: 'DELETE_PRODUCT_ERROR',
        payload: message,
      });
    }
  };
