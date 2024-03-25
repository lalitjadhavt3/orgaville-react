import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../utils/constants';
const windowHeight = Dimensions.get('window').height;
import api, {BASE_URL, getImageUrl} from '../utils/api';
import {endPoints} from '../utils/endpoints';
import Snackbar from 'react-native-snackbar';
import FastImage from 'react-native-fast-image';
import {CartContext} from '../context/Context';
import SelectDropdown from 'react-native-select-dropdown';
const SubCategoriesScreen = ({navigation, route}) => {
  const {category_id} = route.params;
  const {state, dispatch} = useContext(CartContext);
  const {cartItems} = state;
  const [selectedSubCat, setSelectedSubCat] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const handleSubCategoryPress = subCategory => {
    setSelectedSubCat(subCategory);
  };
  const cartItemQuantity = prod => {
    const cartItem = cartItems.find(item => item.id === prod.id);
    console.log(
      '== ~ cartItemQuantity ~ cartItem:',
      cartItem ? cartItem.quantity : 0,
    );
    return cartItem ? cartItem.quantity : 0;
  };
  const handleAddToCart = product => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id,
    );
    if (existingItemIndex !== -1) {
      // Item already exists in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          id: product.id,
          quantity: updatedCartItems[existingItemIndex].quantity,
        },
      });
    } else {
      // Item does not exist in the cart, add it

      const newItem = {
        id: product?.id,
        title: product?.product_name,
        discountedPrice: parseFloat(product?.product_units[0]?.selling_price),
        price: parseFloat(product?.product_units[0]?.selling_price),
        quantity: 1,
        image: getImageUrl(product.product_images[0]?.image_name),
      };

      dispatch({type: 'ADD_ITEM', payload: newItem});
    }
    Snackbar.show({
      text: 'Item added to cart!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  const decreaseQuantity = product => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id,
    );
    if (existingItemIndex !== -1) {
      // Item already exists in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity--;
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          id: product.id,
          quantity: updatedCartItems[existingItemIndex].quantity,
        },
      });
    }
    Snackbar.show({
      text: 'Quantity Updated!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };
  const fetchProducts = async () => {
    try {
      const data = {
        platform: 'android',
        category_id: category_id,
        no_of_records: 5, //doesn't matter for now
        page_number: 1, //doesn't matter for now
      };
      const responseProducts = await api.post(endPoints.PRODUCTS, data, {
        responseType: 'json',
      });
      setProducts(responseProducts?.data?.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false); // Set loading to false whether the request succeeds or fails
    }
  };
  const getSubCats = async () => {
    try {
      const data = {
        platform: 'android',
        category_id: category_id,
      };
      const responseSubCats = await api.post(endPoints.SUB_CATEGORIES, data);
      setSubCategories(responseSubCats?.data?.data);
    } catch (error) {
      handleApiError(error);
    }
  };
  useEffect(() => {
    getSubCats();
    fetchProducts();
  }, []);
  const handleApiError = error => {
    if (error.response && error.response.status === 429) {
      // If error status is 429 (Too Many Requests), show a Snackbar with a message
      Snackbar.show({
        text: 'Too many requests. Please try again later.',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      // For other errors, show a general error message
      Snackbar.show({
        text: `An error occurred. ${error}.`,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  useEffect(() => {
    console.log('selectedSubCat', selectedSubCat);
  }, [selectedSubCat]);

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        stickyHeaderIndices={true}
        style={styles.categoryScrollView}
        showsHorizontalScrollIndicator={true}>
        {subCategories.map((subCategory, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryCard,
              selectedSubCat?.id === subCategory.id && styles.selectedSubCat,
            ]}
            onPress={() => handleSubCategoryPress(subCategory)}>
            <Image
              source={{
                uri: getImageUrl(subCategory?.cat_image_name),
              }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{subCategory.cat_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loading ? ( // Display activity indicator if loading is true
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={colors.primaryColor} />
        </View>
      ) : (
        <View style={styles.productContainer}>
          {products
            ?.filter(categoryProducts =>
              selectedSubCat
                ? categoryProducts?.category_id === selectedSubCat.id
                : true,
            )
            .map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productCard}
                onPress={() => {
                  /* handle product press */
                }}>
                {/* Product Image Slider */}

                {product?.product_images ? (
                  product.product_images.map((image, index) => {
                    return (
                      <FastImage
                        key={index}
                        style={{width: '95%', height: 200}}
                        source={{
                          uri: getImageUrl(image.image_name),
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    );
                  })
                ) : (
                  <View style={styles.noImageAvailable}>
                    <Text>No image available.</Text>
                  </View>
                )}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.product_name}</Text>
                  <View style={styles.variantPicker}>
                    {/* <Picker
                      selectedValue={selectedVariant}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedVariant(itemValue)
                      }>
                      {product.product_units.map((variant, index) => (
                        <Picker.Item
                          key={index}
                          label={variant.unit}
                          value={variant}
                        />
                      ))}
                    </Picker> */}
                  </View>

                  {cartItemQuantity(product) > 0 ? (
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => decreaseQuantity(product)}>
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text>{cartItemQuantity(product)}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleAddToCart(product)}>
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => handleAddToCart(product)}>
                      <Text style={styles.addToCartButtonText}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? '10%' : 0,
    backgroundColor: colors.backgroundColor,
  },
  container: {
    backgroundColor: colors.whiteColor,
  },
  header: {
    padding: 20,
    alignContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.blackColor,
  },
  categories: {
    paddingHorizontal: 10,
    height: windowHeight - 120,
  },
  categoryScrollView: {
    width: '90%',
    marginBottom: '3%',
    marginHorizontal: '5%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '2%',
  },
  catContainer: {
    width: '50%',
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: '90%',
    aspectRatio: 1, // Ensure the image keeps its original aspect ratio
    borderRadius: 10,
    marginBottom: 5,
  },
  catName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryCard: {
    padding: 10,
    marginRight: 10,
    backgroundColor: colors.inactiveColor,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSubCat: {
    backgroundColor: colors.primaryColor,
  },
  categoryText: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: colors.whiteColor,
  },
  categoryImage: {
    width: 30, // Adjust as needed
    height: 30, // Adjust as needed
    borderRadius: 15, // To make it circular
  },
  productContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  subCategoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  productCard: {
    width: '48%', // Adjust as needed to fit 2 cards per row
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageSliderContainer: {
    height: 150, // Adjust the height of the image slider
    overflow: 'hidden',
    borderRadius: 10,
    width: '49%',
  },
  prodImage: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: colors.blue,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: colors.whiteColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewAllButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    color: colors.blue,
  },
  variantPicker: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    marginBottom: 10,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
  },
  quantityButton: {
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SubCategoriesScreen;
