import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Product} from '../components/Product';

class CartComp extends Component {
  constructor(props) {
    super(props);
  }

  getTotals = () => {
    const total = this.props.productsOnCart.reduce((acc, item) => {
      return (acc += item.totalPrice);
    }, 0);
    return parseFloat(total).toFixed(2);
  };

  renderTotals = () => {
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {this.getTotals()}</Text>
      </View>
    );
  };

  renderItem = ({item, index}) => {
    return <Product key={index} item={item} showingOnCart={true} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.itemsList}
          data={this.props.productsOnCart}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={this.renderTotals}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text testID="emptyCartMsg" style={styles.emptyMsg}>
                Empty Cart
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartLine: {
    flexDirection: 'row',
  },
  cartLineTotal: {
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: 'bold',
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333',
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
    textAlign: 'right',
  },
  itemsList: {
    padding: 8,
    backgroundColor: '#eeeeee',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  emptyMsg: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
});

const mapStateToProps = state => {
  return {
    productsOnCart: state.productsOnCart,
  };
};

const actionCreators = {};

export const Cart = connect(mapStateToProps, actionCreators)(CartComp);
