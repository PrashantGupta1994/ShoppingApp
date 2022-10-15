import React from 'react';
import {expect} from '@jest/globals';
import {cleanup, render} from '@testing-library/react-native';
import {CartButton} from '../src/components/CartButton';
import {Provider} from 'react-redux';
import {configureStore} from '../src/redux/store';
import {testDataSheet} from './testData/testDataSheet';
import {addProductToCart, removeProductFromCart} from '../src/redux/actions';

const store = configureStore();

test('Cart Button rendered', () => {
  const component = render(
    <Provider store={store}>
      <CartButton />
    </Provider>,
  );
  expect(component).toBeTruthy();
});

test('Cart Button should be 0 at start', () => {
  const component = render(
    <Provider store={store}>
      <CartButton />
    </Provider>,
  );
  const {getByTestId} = component;
  expect(getByTestId('cartButtonText').children[1]).toBe('0');
});

test('Cart Button value should increase on each product add', () => {
  store.dispatch(addProductToCart(testDataSheet[0]));
  store.dispatch(addProductToCart(testDataSheet[1]));
  const component = render(
    <Provider store={store}>
      <CartButton />
    </Provider>,
  );
  const {getByTestId} = component;
  expect(getByTestId('cartButtonText').children[1]).toBe('2');
});

test('Cart Button value should decrease on each product remove', () => {
  store.dispatch(removeProductFromCart(testDataSheet[0]));

  const component = render(
    <Provider store={store}>
      <CartButton />
    </Provider>,
  );
  const {getByTestId} = component;
  expect(getByTestId('cartButtonText').children[1]).toBe('1');
});
