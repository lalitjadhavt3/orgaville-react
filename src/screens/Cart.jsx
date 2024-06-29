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
import DeliveryLocation from '../components/DeliveryLocation';
import AddressModal from '../components/AddressModal';
import EmptyCart from '../components/EmptyCart';
const windowHeight = Dimensions.get('window').height;

const Cart = ({navigation, route}) => {
  const {state, dispatch} = useContext(CartContext);
  console.log('🚀 ~ state:', state);
  const {cartTotal, discount, finalTotal, cartTotalItems} = state;

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
  const [modalVisible, setModalVisible] = useState(false);
  const addresses = [
    'John Doe\n123 Main St, Apt 4B, New York, NY 10001',
    'Jane Smith\n456 Park Ave, Suite 23, San Francisco, CA 94102',
    'Michael Johnson\n789 Broadway, Los Angeles, CA 90001',
    'Emily Davis\n101 Elm St, Boston, MA 02101',
    'William Brown\n202 Oak St, Chicago, IL 60601',
  ];

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = (selectedAddress, pincode) => {
    console.log('Selected Address:', selectedAddress);
    console.log('Entered Pincode:', pincode);
    setModalVisible(false);
  };
  const updateQuantity = (item, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {id: item.id, unitId: item.unitId, quantity},
    });
  };
  const goToCheckout = async () => {
    //if (loggedIn) {
    if (1) {
      navigation.navigate('OrderSummary');
    }
  };
  const getProductDetails = (id, unitId) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const unit = product.product_units.find(u => u.id === unitId);
      return {
        productName: product.product_name,
        unit: unit.unit,
        price: parseFloat(unit.selling_price),
        discountedPrice: parseFloat(unit.special_price),
      };
    }
    return {};
  };
  return (
    <View style={styles.container}>
      {cartTotalItems > 0 ? (
        <>
          <View style={styles.deliveryContainer}>
            <DeliveryLocation onPress={() => setModalVisible(true)} />
          </View>
          <ScrollView style={{height: 200, backgroundColor: 'white'}}>
            {state?.cartItems?.map(item => {
              return (
                <View
                  key={`${item.id}-${item.unitId}`}
                  style={styles.itemContainer}>
                  <View style={styles.itemRow}>
                    <View style={styles.itemImageContainer}>
                      <Image source={{uri: item.image}} style={styles.image} />
                    </View>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.title}</Text>
                      <Text style={styles.itemVariant}>{item.variant}</Text>
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
                          <Text style={styles.quantityText}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              updateQuantity(item, item.quantity + 1);
                            }}
                            style={styles.buttonCart}>
                            <Text style={styles.buttonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.quantityContainer}>
                          <Text style={styles.price}>
                            ₹ {item.discountedPrice}
                          </Text>
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
              );
            })}

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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.goBackBtn}>
              <PrimaryBtn
                text={` Go Back `}
                buttonStyle={{
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  backgroundColor: colors.secondaryColor,
                }}
                textStyle={{
                  color: colors.whiteColor,
                  fontSize: 18,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <View style={styles.checkoutBtn}>
              <PrimaryBtn
                onPress={goToCheckout}
                text={` Continue `}
                buttonStyle={{
                  width: '100%',
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                }}
                textStyle={{
                  color: colors.whiteColor,
                  fontSize: 18,
                }}
                //secondaryText={`₹ ${cartTotal} `}
              />
            </View>
          </View>
          <AddressModal
            visible={modalVisible}
            onClose={handleModalClose}
            addresses={addresses}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <View>
          <EmptyCart
            onShopNow={() => {
              navigation.navigate('Categories');
            }}
          />
        </View>
      )}
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
  deliveryContainer: {
    marginVertical: '2%',
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
  goBackBtn: {
    width: '43%',
    marginBottom: '3%',
  },
  checkoutBtn: {
    width: '55%',
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
