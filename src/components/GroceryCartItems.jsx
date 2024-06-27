import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import {CartContext} from '../context/Context';

const GroceryCartItems = () => {
  const {state, dispatch} = useContext(CartContext);
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Cart Items</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {state?.cartItems?.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: item?.image}} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  imageContainer: {
    marginHorizontal: 5,
  },
  image: {
    resizeMode: 'cover',
    width: 100,
    height: 80,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
});

export default GroceryCartItems;
