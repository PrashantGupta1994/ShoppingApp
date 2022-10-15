import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class CartButtonComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View testID={'cartButton'} style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Cart');
          }}>
          <Text testID={'cartButtonText'} style={styles.text}>
            Cart ({this.props.productsOnCart.length})
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: '#E8A035',
    height: 32,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    productsOnCart: state.productsOnCart,
  };
};

const actionCreators = {};

export const CartButton = connect(
  mapStateToProps,
  actionCreators,
)(CartButtonComp);
