import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from './redux/store';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsList} from './screens/ProductsList';
import {Cart} from './screens/Cart';
import {CartButton} from './components/CartButton';

const Stack = createNativeStackNavigator();
const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Products"
              component={ProductsList}
              options={({navigation}) => ({
                title: 'Products',
                headerTitleStyle: {fontSize: 20},
                headerRight: () => <CartButton navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={({navigation}) => ({
                title: 'Cart',
                headerBackVisible: true,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
