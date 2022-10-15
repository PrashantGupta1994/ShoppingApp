import * as ACTION_TYPE from './actionType';

// --- ENCAPSULATED ---

const dispatchProductsSuccess = allProducts => {
  return {
    type: ACTION_TYPE.GET_PRODUCTS_SUCCESS,
    payload: {
      allProducts: allProducts,
    },
  };
};

const dispatchAddProductInCart = product => {
  return {
    type: ACTION_TYPE.ADD_PRODUCT_IN_CART,
    payload: {
      product: product,
    },
  };
};

const dispatchRemoveProductFromCart = (product, removeAll) => {
  return {
    type: ACTION_TYPE.REMOVE_PRODUCT_FROM_CART,
    payload: {
      product: product,
      removeAll: removeAll,
    },
  };
};

// --- END ----

// --- PUBLIC ---

export const getProducts = () => {
  return async dispatch => {
    dispatch(() => {
      return {
        type: ACTION_TYPE.GET_PRODUCTS,
      };
    });
    const data = await fetch(
      'https://my-json-server.typicode.com/benirvingplt/products/products',
    );
    const jsonData = await data.json();
    dispatch(productsSuccess(jsonData));
  };
};

export const productsSuccess = products => {
  return dispatch => {
    dispatch(dispatchProductsSuccess(products));
  };
};

export const addProductToCart = product => {
  return dispatch => {
    dispatch(dispatchAddProductInCart(product));
  };
};

export const removeProductFromCart = (product, removeAll) => {
  return dispatch => {
    dispatch(dispatchRemoveProductFromCart(product, removeAll));
  };
};
