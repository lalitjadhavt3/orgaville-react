import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const EmptyCart = ({onShopNow}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/empty-cart.png')} // Replace with your cart image path
        style={styles.cartImage}
      />
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>
        Enjoy up to 50% savings on your first order*
      </Text>
      <TouchableOpacity style={styles.shopNowButton} onPress={onShopNow}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/banner1.png')} // Replace with your banner image path
        style={styles.bannerImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cartImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  shopNowButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  shopNowText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerImage: {
    width: '100%',
    height: 40,
  },
});

export default EmptyCart;
