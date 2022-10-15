import React from 'react';
import {expect} from '@jest/globals';
import {render} from '@testing-library/react-native';
import {Cart} from '../src/screens/Cart';
import {Provider} from 'react-redux';
import {configureStore} from '../src/redux/store';
import {testDataSheet} from './testData/testDataSheet';
import {addProductToCart} from '../src/redux/actions';

const store = configureStore();

test('Cart screen rendered', () => {
  const component = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
  expect(component).toBeTruthy();
});

test('Cart should show empty message when empty', () => {
  const component = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
  const {getByTestId} = component;
  expect(getByTestId('emptyCartMsg')).toBeTruthy();
});

test('Cart should NOT show empty message when filled with data', () => {
  store.dispatch(addProductToCart(testDataSheet[0]));
  store.dispatch(addProductToCart(testDataSheet[1]));
  const component = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
  const {queryByTestId} = component;
  expect(queryByTestId('emptyCartMsg')).toBeFalsy();
});
