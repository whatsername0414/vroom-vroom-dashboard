import { combineReducers } from 'redux';
import { ordersReducer, orderReducer } from './orders';
import { paymentsReducer, paymentReducer } from './payments';
import {
  merchantsReducer,
  merchantReducer,
  productReducer,
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
} from './merchants';
import { categoriesReducer } from './categories';
import { authReducer, getAuthCode } from './auth';

export default combineReducers({
  auth: authReducer,
  authCode: getAuthCode,
  orders: ordersReducer,
  order: orderReducer,
  payments: paymentsReducer,
  payment: paymentReducer,
  categories: categoriesReducer,
  merchants: merchantsReducer,
  merchant: merchantReducer,
  data: productReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
});
