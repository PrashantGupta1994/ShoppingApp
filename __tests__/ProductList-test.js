import React from 'react';
import {expect} from '@jest/globals';
import {render} from '@testing-library/react-native';
import {ProductsList} from '../src/screens/ProductsList';
import {Provider} from 'react-redux';
import {configureStore} from '../src/redux/store';
import {testDataSheet} from './testData/testDataSheet';
import {productsSuccess} from '../src/redux/actions';

const store = configureStore();

test('Product listing screen with all products', () => {
  store.dispatch(productsSuccess(testDataSheet));
  const component = render(
    <Provider store={store}>
      <ProductsList />
    </Provider>,
  );
  expect(component).toBeTruthy();
});
