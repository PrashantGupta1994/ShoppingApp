import * as ACTION_TYPE from './actionType';

const initialState = {
  allProducts: [],
  productsOnCart: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION_TYPE.GET_PRODUCTS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case ACTION_TYPE.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allProducts: payload.allProducts,
      };
    }

    case ACTION_TYPE.ADD_PRODUCT_IN_CART: {
      let tempProductsOnCart = [];
      const cartItem = state.productsOnCart.find(
        item => item.id === payload.product.id,
      );
      if (!cartItem) {
        tempProductsOnCart = [
          ...state.productsOnCart,
          {
            ...payload.product,
            qty: 1,
            totalPrice: payload.product.price,
          },
        ];
      } else {
        tempProductsOnCart = state.productsOnCart.map(item => {
          if (item.id === payload.product.id) {
            item.qty++;
            item.totalPrice += payload.product.price;
          }
          return item;
        });
      }

      return {
        ...state,
        isLoading: false,
        productsOnCart: tempProductsOnCart,
      };
    }

    case ACTION_TYPE.REMOVE_PRODUCT_FROM_CART: {
      let tempProductsOnCart = [];
      const cartItem = state.productsOnCart.find(
        item => item.id === payload.product.id,
      );
      if (cartItem.qty === 1 || payload.removeAll) {
        tempProductsOnCart = state.productsOnCart.filter(
          p => p.id !== payload.product.id,
        );
      } else {
        tempProductsOnCart = state.productsOnCart.map(p => {
          if (p.id === payload.product.id) {
            p.qty--;
            p.totalPrice -= payload.product.price;
          }
          return p;
        });
      }

      return {
        ...state,
        productsOnCart: tempProductsOnCart,
      };
    }

    default:
      return state;
  }
};
