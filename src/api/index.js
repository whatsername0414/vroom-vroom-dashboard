import axios from 'axios';

const url = 'http://localhost:5000/api/v1';

//Authentication
export const login = (body) => axios.post(`${url}/auth/login`, body);
export const register = (body) =>
  axios.post(`${url}/auth/register/admin`, body);
export const getAuthCode = (body) => axios.post(`${url}/auth/email-otp`, body);

//Payments
export const getPayments = (config) => axios.get(`${url}/payments`, config);
export const updatePayment = (id, body, config) =>
  axios.patch(`${url}/payments/${id}`, body, config);

//Order
export const getOrders = (config) => axios.get(`${url}/orders`, config);
export const getOrder = (id, config) =>
  axios.get(`${url}/orders/${id}`, config);
export const confirmOrder = (id, config) =>
  axios.patch(`${url}/orders/${id}`, {}, config);

//Merchant
export const getMerchants = (config) => axios.get(`${url}/merchants`, config);
export const createMerchant = (config) => {
  return axios.post(`${url}/merchants`, {}, config);
};
export const getMerchant = (id, config) =>
  axios.get(`${url}/merchants/${id}`, config);
export const updateMerchant = (id, body, config) =>
  axios.patch(`${url}/merchants/${id}`, body, config);
export const addProductSection = (merchantId, body, config) =>
  axios.post(`${url}/merchants/${merchantId}`, body, config);
export const editProductSection = (
  merchantId,
  productSectionId,
  body,
  config
) =>
  axios.put(`${url}/merchants/${merchantId}/${productSectionId}`, body, config);
export const deleteProductSection = (merchantId, productSectionId, config) =>
  axios.delete(`${url}/merchants/${merchantId}/${productSectionId}`, config);
export const createProduct = (id, productSectionId, body, config) =>
  axios.post(
    `${url}/merchants/${id}/products/${productSectionId}`,
    body,
    config
  );
export const updateProduct = (id, productSectionId, productId, body, config) =>
  axios.put(
    `${url}/merchants/${id}/products/${productSectionId}/${productId}`,
    body,
    config
  );
export const deleteProduct = (id, productSectionId, productId, config) =>
  axios.delete(
    `${url}/merchants/${id}/products/${productSectionId}/${productId}`,
    config
  );
//Category
export const getCategories = (type) =>
  axios.get(`${url}/categories?type=${type}`);

//Upload
export const upload = (data, config) =>
  axios.post(`${url}/upload`, data, config);
