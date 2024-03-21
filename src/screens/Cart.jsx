// Cart.js
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {CartContext} from '../context/Context';
import {colors} from '../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';
import PrimaryBtn from '../components/PrimaryBtn';
const windowHeight = Dimensions.get('window').height;

const Cart = ({navigation}) => {
  const {state, dispatch} = useContext(CartContext);
  const {cartTotal, discount, finalTotal} = state;

  const removeItem = item => {
    Alert.alert(
      'Do You want to remove this item?',
      `${item.title}`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => dispatch({type: 'REMOVE_ITEM', payload: item}),
        },
      ],
      {cancelable: false},
    );
  };

  const updateQuantity = (item, quantity) => {
    dispatch({type: 'UPDATE_QUANTITY', payload: {id: item.id, quantity}});
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <ScrollView style={{height: 200, backgroundColor: 'white'}}>
          {state?.cartItems?.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <View style={styles.itemImageContainer}>
                  <Image source={{uri: item.image}} style={styles.image} />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text style={styles.itemVariant}>1kg</Text>
                  <View style={styles.quantityPriceContainer}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          updateQuantity(item, item.quantity - 1);
                        }}
                        style={[
                          item.quantity <= 1
                            ? styles.disabledButton
                            : styles.buttonCart,
                        ]}
                        disabled={item.quantity <= 1}>
                        <Text
                          style={[
                            item.quantity <= 1
                              ? styles.disabledButtonText
                              : styles.buttonText,
                          ]}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          updateQuantity(item, item.quantity + 1);
                        }}
                        style={styles.buttonCart}>
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.quantityContainer}>
                      <Text style={styles.price}>₹ {item.discountedPrice}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    color={colors.secondaryColor}
                    title="X"
                    onPress={() => removeItem(item)}
                  />
                </View>
              </View>
            </View>
          ))}

          <View style={styles.footerContainer}>
            <Text style={styles.totalName}>Cart Total</Text>
            <View style={styles.totalRow}>
              <View style={styles.totalDetails}>
                <Text style={styles.totalText}>
                  MRP ({state?.cartItems?.length} items)
                </Text>
                <Text style={styles.totalText}>{cartTotal}</Text>
              </View>
              <View style={styles.totalDetails}>
                <Text style={styles.totalText}>Product Discount</Text>
                <Text style={styles.totalText}>{discount}</Text>
              </View>
              <View style={styles.totalDetails}>
                <Text style={styles.totalText}>Delivery Fee</Text>
                <Text style={styles.totalText}>9</Text>
              </View>
              <View style={styles.finalTotal}>
                <Text style={styles.finalTotalText}>Total Amount</Text>
                <Text style={styles.finalTotalText}>{finalTotal}</Text>
              </View>
              <View style={styles.discountInfo}>
                <Text style={styles.discountText}>
                  You will save 50% on this order.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.checkoutContainer}>
          <PrimaryBtn
            text={` Checkout `}
            buttonStyle={{
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            textStyle={{
              color: colors.whiteColor,
              fontSize: 20,
            }}
            secondaryText={`₹ ${cartTotal} `}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? '25%' : 0,
    backgroundColor: colors.backgroundColor,
    height: windowHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fffff1',
    paddingTop: '10%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.lightBorderColor,
    borderRadius: 5,
    padding: '2%',
  },
  totalName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.blackColor,
    marginBottom: '2%',
  },
  finalTotal: {
    borderTopColor: colors.lightBorderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.lightBorderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  finalTotalText: {
    fontWeight: 'bold',
    color: colors.blackColor,
  },
  totalRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  totalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: colors.blackColor,
  },
  totalText: {color: colors.blackColor},
  discountText: {color: colors.primaryColor},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  checkoutContainer: {
    width: '100%',
    marginBottom: '3%',
  },
  removeItem: {
    backgroundColor: colors.secondaryColor,
    color: colors.whiteColor,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLabel: {
    marginBottom: 10,
    color: 'blue',
  },
  itemContainer: {
    marginBottom: 20,
    borderBottomColor: colors.lightBorderColor,
    borderBottomWidth: 1,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImageContainer: {
    width: '25%',
  },
  image: {
    width: '90%',
    height: 80,

    borderRadius: 5,
    marginVertical: '5%',
  },
  itemDetails: {
    width: '60%',
  },
  itemName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.blackColor,
  },
  itemVariant: {
    fontSize: 15,
    color: 'gray',
    marginVertical: '1%',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginBottom: 5,
    width: '13%',
    alignItems: 'center',
    height: '90%',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  quantityPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: '10%',
    fontWeight: 'bold',
    color: colors.blackColor,
  },
  itemDecrease: {
    flexDirection: 'column',
    width: 40,
    borderColor: colors.lightBorderColor,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    paddingVertical: '0%',
    height: 50,
  },

  buttonCart: {
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.lightBorderColor,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  disabledButton: {
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBorderColor, // Background color for disabled state
  },
  disabledButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackColor, // Text color for disabled state
  },
});

export default Cart;
