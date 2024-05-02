export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_LOADING':
      return { categoriesLoading: true };
    case 'GET_CATEGORIES':
      return { categoriesLoading: false, categories: action.payload };
    case 'GET_CATEGORIES_ERROR':
      return { categoriesLoading: false, categoriesError: action.payload };
    default:
      return state;
  }
};
