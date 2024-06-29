import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, fontStyles} from '../utils/constants';
import SuccessImage from './../icons/success-order.png'; // Make sure to add a success image in the assets folder
import ArrowIcon from '../icons/ArrowIcon'; // Use an appropriate back icon if necessary

const OrderSuccessScreen = ({navigation, route}) => {
  const {orderId} = route.params;

  const handleBackToHome = () => {
    navigation.navigate('Home'); // Adjust this to your home screen
  };

  return (
    <View style={styles.container}>
      <Image source={SuccessImage} style={styles.image} />
      <Text style={styles.successText}>Order Placed Successfully!</Text>
      <Text style={styles.orderIdText}>Order ID: {orderId}</Text>
      <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  successText: {
    ...fontStyles.header,
    color: colors.primaryColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  orderIdText: {
    ...fontStyles.medium,
    color: colors.blackColor,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.whiteColor,
    ...fontStyles.medium,
    fontSize: 16,
  },
});

export default OrderSuccessScreen;
