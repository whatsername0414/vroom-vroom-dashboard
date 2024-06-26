import { combineReducers } from 'redux';
import { ordersReducer, orderReducer } from './orders';
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
import { usersReducer } from './users';

export default combineReducers({
  auth: authReducer,
  authCode: getAuthCode,
  users: usersReducer,
  orders: ordersReducer,
  order: orderReducer,
  categories: categoriesReducer,
  merchants: merchantsReducer,
  merchant: merchantReducer,
  data: productReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
});
