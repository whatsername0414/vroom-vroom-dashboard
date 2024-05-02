export const merchantsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_MERCHANTS_LOADING':
      return { merchantsLoading: true };
    case 'GET_MERCHANTS':
      return { merchantsLoading: false, merchants: action.payload };
    case 'GET_MERCHANTS_ERROR':
      return { lmerchantsLoading: false, merchantsError: action.payload };
    default:
      return state;
  }
};

export const merchantReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MERCHANT_LOADING':
      return { ...state, merchantLoading: true };
    case 'MERCHANT':
      return {
        merchantLoading: false,
        merchant: action.payload.merchant,
        merchantNew: action.payload.new,
      };
    case 'MERCHANT_ERROR':
      return {
        ...state,
        merchantLoading: false,
        merchantError: action.payload,
      };
    case 'RESET_MERCHANT':
      return {
        ...state,
        merchantLoading: false,
        merchantError: undefined,
        merchantNew: undefined,
      };
    default:
      return state;
  }
};

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PRODUCT':
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT_LOADING':
      return { createLoading: true };
    case 'CREATE_PRODUCT':
      return { createLoading: false, data: action.payload };
    case 'CREATE_PRODUCT_ERROR':
      return { createLoading: false, createError: action.payload };
    case 'RESET':
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT_LOADING':
      return { updateLoading: true };
    case 'UPDATE_PRODUCT':
      return { updateLoading: false, updated: action.payload };
    case 'UPDATE_PRODUCT_ERROR':
      return { updateLoading: false, updateError: action.payload };
    case 'RESET':
      return {};
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT_LOADING':
      return { deleteLoading: true };
    case 'DELETE_PRODUCT':
      return { deleteLoading: false, deleted: true };
    case 'DELETE_PRODUCT_ERROR':
      return { deleteLoading: false, deleteError: action.payload };
    case 'RESET':
      return {};
    default:
      return state;
  }
};
