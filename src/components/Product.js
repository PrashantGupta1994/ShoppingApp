import React, {PureComponent} from 'react';
import {Text, Image, View, StyleSheet, Pressable} from 'react-native';
import {connect} from 'react-redux';
import * as Action from '../redux/actions';

class ProductComp extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    const onCart = this.props.productsOnCart.some(p => p.id === item.id);
    const text = onCart ? 'Remove' : 'Add';
    const action = onCart
      ? this.props.removeProductFromCart
      : this.props.addProductToCart;
    return (
      <View style={styles.card}>
        <Image
          testID="productImage"
          style={styles.thumb}
          source={{uri: item.img}}
          resizeMode={'contain'}
        />
        <View style={styles.infoContainer}>
          <Text testID="productName" style={styles.name}>
            {item.name}
          </Text>
          <Text testID="productColour" style={styles.colour}>
            {item.colour}
          </Text>
          <Text testID="productPrice" style={styles.price}>
            $ {item.price}
          </Text>
          {this.props.showingOnCart ? (
            <View testID="productButtonCounter" style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => this.props.removeProductFromCart(item)}>
                <Text style={styles.buttonText}>{'-'}</Text>
              </Pressable>
              <Text testID="productQtyValue" style={styles.qtyText}>
                {item.qty || 0}
              </Text>
              <Pressable
                style={styles.button}
                onPress={() => this.props.addProductToCart(item)}>
                <Text style={styles.buttonText}>{'+'}</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              testID="productButton"
              style={styles.displayButton}
              onPress={() => action(item, true)}>
              <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
  },
  thumb: {
    flex: 1,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 2,
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colour: {
    fontSize: 14,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#E8A035',
    width: 40,
    height: 25,
    borderRadius: 2,
  },
  qtyText: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  displayButton: {
    backgroundColor: '#E8A035',
    padding: 4,
    borderRadius: 4,
  },
});

const mapStateToProps = state => {
  return {
    productsOnCart: state.productsOnCart,
  };
};

const actionCreators = {
  addProductToCart: Action.addProductToCart,
  removeProductFromCart: Action.removeProductFromCart,
};

export const Product = connect(mapStateToProps, actionCreators)(ProductComp);
