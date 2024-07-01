// ViewProducts.js
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {colors} from '../utils/constants';
import api, {getImageUrl} from '../utils/api';
import {endPoints} from '../utils/endpoints';

const windowHeight = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const PaginationDot = React.memo(({isActive, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={[
        styles.paginationDot,
        isActive ? styles.activeDot : styles.inactiveDot,
      ]}
    />
  </TouchableOpacity>
));

const ProductDetails = ({navigation}) => {
  const [quantity, setQuantity] = useState(0);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [sliders, setSliders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {platform: 'android'};
        const response = await api.post(endPoints.GET_BANNER, data);
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        setSliders(response?.data?.data?.sliders || []);
      } catch (error) {
        console.error('Error fetching sliders:', error);
      }
    };
    fetchData();
  }, []);

  const handleDotPress = useCallback(index => {
    setActiveIndex(index);
    carouselRef.current?.scrollTo({index: index, animated: true});
  }, []);

  const handleSnapToItem = useCallback(index => {
    setActiveIndex(index);
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.carouselItem}>
        <Image
          style={styles.carouselImage}
          source={{uri: getImageUrl(item.image_name)}}
        />
      </View>
    ),
    [],
  );

  const renderVariantItem = (price, quantity, index) => (
    <TouchableOpacity
      key={index}
      style={
        selectedVariant === index
          ? styles.selectedVarientItem
          : styles.varientItem
      }
      onPress={() => setSelectedVariant(index)}>
      <View style={styles.varientPrice}>
        <View style={styles.radioButton}>
          <View
            style={selectedVariant === index ? styles.radioButtonInner : null}
          />
        </View>
        <Text style={styles.price}>₹.{price}</Text>
      </View>
      <Text style={styles.varientQuantity}>{quantity}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.container}>
        {sliders.length > 0 ? (
          <View>
            <Carousel
              ref={carouselRef}
              loop={false}
              style={styles.carousel}
              width={width}
              height={width / 1.1}
              autoPlay={false}
              data={sliders}
              scrollAnimationDuration={100}
              onSnapToItem={handleSnapToItem}
              renderItem={renderItem}
            />
            <View style={styles.paginationContainer}>
              {sliders.map((_, index) => (
                <PaginationDot
                  key={index}
                  isActive={index === activeIndex}
                  onPress={() => handleDotPress(index)}
                />
              ))}
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.loaderContainer,
              isDarkMode && styles.darkBackground,
            ]}>
            <ActivityIndicator size="large" />
            <Text>Loading Data...</Text>
          </View>
        )}
        <View style={styles.detailsView}>
          <Text style={styles.prodTitle}>Product Title</Text>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>
              MRP <Text style={{color: 'black'}}>₹.61</Text>
            </Text>
            <View style={styles.offTag}>
              <Text style={styles.offText}>6% Off</Text>
            </View>
          </View>
          <Text style={styles.quantityText}>@61/kg</Text>
        </View>

        <View style={styles.varientsView}>
          <Text style={styles.varientText}>Select Variant</Text>
          <View style={styles.varientList}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderVariantItem('61', '1Kg', 0)}
              {renderVariantItem('122', '2Kg', 1)}
              {renderVariantItem('183', '3Kg', 2)}
              {renderVariantItem('183', '3Kg', 3)}
            </ScrollView>
          </View>
        </View>
        <View style={styles.addCart}>
          <Text style={styles.addText}>Add To Cart</Text>
          {quantity == 0 ? (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setQuantity(quantity + 1)}>
              <Text style={{color: 'white', fontSize: 17}}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityIndicator}>
              <TouchableOpacity
                style={styles.minusBtn}
                onPress={() => {
                  setQuantity(quantity - 1);
                }}>
                <Text style={styles.minus}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityAdded}>{quantity} added</Text>
              <TouchableOpacity
                style={styles.plusBtn}
                onPress={() => {
                  setQuantity(quantity + 1);
                }}>
                <Text style={styles.add}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  minus: {
    color: colors.primaryColor,
    fontWeight: '800',
    fontSize: 25,
  },
  add: {color: colors.primaryColor, fontWeight: '800', fontSize: 20},
  quantityAdded: {
    width: '60%',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },

  minusBtn: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: colors.blackColor,
    borderRightWidth: 1,
  },
  plusBtn: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftColor: colors.blackColor,
    borderLeftWidth: 1,
  },
  quantityIndicator: {
    flexDirection: 'row',
    marginRight: '5%',
    width: '35%',
    borderRadius: 5,
    borderWidth: 0.7,
    height: 35,
    alignItems: 'center',
    borderColor: colors.blackColor,
  },
  addBtn: {
    marginRight: '5%',
    backgroundColor: '#fc6321',
    width: '35%',
    borderRadius: 5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    marginLeft: '3%',
    fontWeight: '800',
    fontSize: 18,
    color: 'black',
  },
  addCart: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '6%',
    width: '100%',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
  },
  selectedVarientItem: {
    height: 50,
    width: '100%',
    borderWidth: 1.2,
    borderColor: colors.primaryColor,
    borderRadius: 5,
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  varientPrice: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  varientQuantity: {
    marginRight: '5%',
    fontWeight: '700',
    fontSize: 15,
  },
  varientItem: {
    height: 50,
    width: '100%',
    borderWidth: 1.2,
    borderColor: colors.lightBorderColor,
    borderRadius: 5,
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  varientList: {
    marginTop: '1%',
    height: 200,
    width: '100%',
    flexDirection: 'column',
  },
  varientText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
  },
  varientsView: {
    paddingHorizontal: '3%',
    marginTop: '5%',
    borderBottomColor: colors.lightBorderColor,
    borderTopColor: colors.lightBorderColor,
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    height: 'auto',
    paddingVertical: '3%',
  },
  quantityText: {
    alignSelf: 'flex-end',
    fontWeight: '800',
    color: 'grey',
  },
  offText: {
    color: 'white',
    fontWeight: '800',
  },
  offTag: {
    marginLeft: '3%',
    backgroundColor: colors.primaryColor,
    paddingHorizontal: '3%',
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  priceText: {
    color: 'grey',
    fontWeight: '700',
    fontSize: 17,
  },
  priceView: {
    flexDirection: 'row',
    marginTop: '4%',
    justifyContent: 'flex-start',
    height: 29,
    alignItems: 'center',
  },
  prodTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  detailsView: {
    flexDirection: 'column',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  screenContainer: {height: windowHeight},
  container: {
    backgroundColor: colors.whiteColor,
    height: windowHeight - 80,
    flexDirection: 'column',
  },
  carousel: {
    width: '100%',
    marginRight: '2%',
    borderRadius: 1,
  },
  carouselItem: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: '2%',
  },
  carouselImage: {
    width: '100%',
    height: '90%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 6,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primaryColor,
  },
  inactiveDot: {
    backgroundColor: 'black',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: colors.darkBackground,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
});

export default ProductDetails;
