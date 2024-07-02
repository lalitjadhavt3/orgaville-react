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
  SafeAreaView,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {colors} from '../utils/constants';
import api, {getImageUrl} from '../utils/api';
import {endPoints} from '../utils/endpoints';

const {width, height} = Dimensions.get('window');

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
      style={[
        styles.varientItem,
        selectedVariant === index && styles.selectedVarientItem,
      ]}
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            {sliders.length > 0 ? (
              <View style={styles.carouselContainer}>
                <Carousel
                  ref={carouselRef}
                  loop={false}
                  style={styles.carousel}
                  width={width}
                  height={width * 0.9}
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
              <ScrollView
                style={styles.varientList}
                showsVerticalScrollIndicator={false}>
                {renderVariantItem('61', '1Kg', 0)}
                {renderVariantItem('122', '2Kg', 1)}
                {renderVariantItem('183', '3Kg', 2)}
                {renderVariantItem('183', '3Kg', 3)}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <View style={styles.stickyAddCart}>
          <Text style={styles.addText}>Add To Cart</Text>
          {quantity == 0 ? (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityIndicator}>
              <TouchableOpacity
                style={styles.minusBtn}
                onPress={() => {
                  setQuantity(Math.max(0, quantity - 1));
                }}>
                <Text style={styles.minus}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityAddedContainer}>
                <Text style={styles.quantityAdded}>{quantity} added</Text>
              </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 60, // Reduced from 80 to match new sticky add cart height
  },
  container: {
    backgroundColor: colors.whiteColor,
  },
  carouselContainer: {
    height: width * 0.9,
    width: '100%',
  },
  carousel: {
    width: '100%',
  },
  carouselItem: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    height: width * 0.9,
  },
  darkBackground: {
    backgroundColor: colors.darkBackground,
  },
  detailsView: {
    padding: '5%',
  },
  prodTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  priceView: {
    flexDirection: 'row',
    marginTop: '4%',
    alignItems: 'center',
  },
  priceText: {
    color: 'grey',
    fontWeight: '700',
    fontSize: 17,
  },
  offTag: {
    marginLeft: '3%',
    backgroundColor: colors.primaryColor,
    paddingHorizontal: '3%',
    paddingVertical: 5,
    borderRadius: 5,
  },
  offText: {
    color: 'white',
    fontWeight: '800',
  },
  quantityText: {
    alignSelf: 'flex-end',
    fontWeight: '800',
    color: 'grey',
  },
  varientsView: {
    padding: '5%',
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: colors.lightBorderColor,
  },
  varientText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  varientList: {
    maxHeight: height * 0.3,
  },
  varientItem: {
    height: 50,
    borderWidth: 1.2,
    borderColor: colors.lightBorderColor,
    borderRadius: 5,
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  selectedVarientItem: {
    borderColor: colors.primaryColor,
  },
  varientPrice: {
    flexDirection: 'row',
    alignItems: 'center',
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
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  varientQuantity: {
    fontWeight: '700',
    fontSize: 15,
  },
  stickyAddCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '2%', // Reduced vertical padding
    backgroundColor: colors.whiteColor,
    borderTopWidth: 1,
    borderTopColor: colors.lightBorderColor,
    height: 60, // Reduced height
  },
  addText: {
    fontWeight: '800',
    fontSize: 18,
    color: 'black',
  },
  addBtn: {
    backgroundColor: '#fc6321',
    paddingVertical: 8, // Reduced vertical padding
    paddingHorizontal: 30, // Increased horizontal padding
    borderRadius: 5,
    width: '40%', // Increased width
    alignItems: 'center',
  },
  addBtnText: {
    color: 'white',
    fontSize: 17,
  },
  quantityIndicator: {
    flexDirection: 'row',
    borderWidth: 0.7,
    borderRadius: 5,
    borderColor: colors.blackColor,
    height: 36, // Set a fixed height
    width: '40%', // Match width with addBtn
  },
  minusBtn: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: colors.blackColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  plusBtn: {
    padding: 8,
    borderLeftWidth: 1,
    borderLeftColor: colors.blackColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  quantityAddedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityAdded: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 14,
  },
  minus: {
    color: colors.primaryColor,
    fontWeight: '800',
    fontSize: 20,
  },
  add: {
    color: colors.primaryColor,
    fontWeight: '800',
    fontSize: 20,
  },
});

export default ProductDetails;
