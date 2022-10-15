import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Product} from '../components/Product';

import * as Action from '../redux/actions';

class ProductsListComp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProductsFromServer();
  }

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              style={styles.activityIndicator}
              color={'#E8A035'}
              size={'large'}
            />
          </View>
        ) : (
          <FlatList
            style={styles.productsList}
            contentContainerStyle={styles.productsListContainer}
            keyExtractor={item => item.id.toString()}
            data={this.props.allProducts}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <Product key={index} item={item} />;
            }}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#f7f8f9',
  },
  productsListContainer: {
    backgroundColor: '#f7f8f9',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  activityIndicator: {
    top: '45%',
  },
});

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts,
    productsOnCart: state.productsOnCart,
    isLoading: state.isLoading,
  };
};

const actionCreators = {
  getProductsFromServer: Action.getProducts,
};

export const ProductsList = connect(
  mapStateToProps,
  actionCreators,
)(ProductsListComp);
