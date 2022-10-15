import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Product} from '../src/components/Product';
import {Provider} from 'react-redux';
import {configureStore} from '../src/redux/store';
import {testDataSheet} from './testData/testDataSheet';

const store = configureStore();
const item = testDataSheet[0];

test('Product item rendered', async () => {
  const component = render(
    <Provider store={store}>
      <Product item={item} showingOnCart={false} />
    </Provider>,
  );
  expect(component).toBeTruthy();
});

test('Product item rendered with all the data', async () => {
  const {getByTestId} = render(
    <Provider store={store}>
      <Product item={item} showingOnCart={false} />
    </Provider>,
  );
  expect(getByTestId('productColour').children[0]).toBe(item.colour);
  expect(getByTestId('productName').children[0]).toBe(item.name);
  expect(parseInt(getByTestId('productPrice').children[1], 10)).toBe(
    item.price,
  );
  fireEvent(getByTestId('productButton'), 'onPress');
});

test('Product item show ONLY counter ui on cart', async () => {
  const {getByTestId, queryByTestId} = render(
    <Provider store={store}>
      <Product item={item} showingOnCart={true} />
    </Provider>,
  );

  expect(getByTestId('productButtonCounter')).toBeTruthy();
  expect(queryByTestId('productButton')).toBeFalsy();
});
