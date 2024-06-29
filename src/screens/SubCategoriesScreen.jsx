import React, {useContext, useEffect, useState} from 'react';
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
import {MicOff, MicOn} from '../icons';

const SubCategoriesScreen = ({navigation, route}) => {
  const {category_id} = route.params;
  const {state, dispatch} = useContext(CartContext);
  const {cartItems} = state;
  const [selectedSubCat, setSelectedSubCat] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleSubCategoryPress = subCategory => {
    setSelectedSubCat(subCategory);
  };
  const truncateProductName = name => {
    if (name.includes('/')) {
      const [english, marathi] = name.split('/').map(part => part.trim());
      const truncatedEnglish =
        english.length > 10 ? english.slice(0, 10) + '...' : english;
      const truncatedMarathi =
        marathi.length > 10 ? marathi.slice(0, 10) + '...' : marathi;
      return `${truncatedEnglish} / ${truncatedMarathi}`;
    } else {
      return name.length > 20 ? name.slice(0, 20) + '...' : name;
    }
  };
  const cartItemQuantity = (prod, unitId) => {
    const cartItem = cartItems.find(
      item => item.id === prod.id && item.unitId === unitId,
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product, unit) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.unitId === unit.id,
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          id: product.id,
          unitId: unit.id,
          quantity: updatedCartItems[existingItemIndex].quantity,
        },
      });
      Snackbar.show({
        text: 'Quantity Updated!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Go to Cart',
          textColor: 'green',
          backgroundColor: colors.primaryColor,
          onPress: () => {
            navigation.navigate('Cart');
          },
        },
      });
    } else {
      const newItem = {
        id: product.id,
        unitId: unit.id,
        title: product.product_name,
        variant: unit.unit,
        discountedPrice: parseFloat(unit.selling_price),
        price: parseFloat(unit.selling_price),
        quantity: 1,
        image: getImageUrl(product.product_images[0]?.image_name),
      };
      dispatch({type: 'ADD_ITEM', payload: newItem});
      Snackbar.show({
        text: 'Item Added to Cart!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Go to Cart',
          textColor: 'green',
          backgroundColor: colors.primaryColor,
          onPress: () => {
            navigation.navigate('Cart');
          },
        },
      });
    }
  };

  const decreaseQuantity = (product, unit) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.unitId === unit.id,
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity--;
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          id: product.id,
          unitId: unit.id,
          quantity: updatedCartItems[existingItemIndex].quantity,
        },
      });
      Snackbar.show({
        text: 'Quantity Updated!',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Go to Cart',
          textColor: 'green',
          backgroundColor: colors.primaryColor,
          onPress: () => {
            navigation.navigate('Cart');
          },
        },
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const data = {
        platform: 'android',
        category_id: category_id,
        no_of_records: 5,
        page_number: 1,
      };
      const responseProducts = await api.post(endPoints.PRODUCTS, data, {
        responseType: 'json',
      });
      setProducts(responseProducts?.data?.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
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
      Snackbar.show({
        text: 'Too many requests. Please try again later.',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      Snackbar.show({
        text: `An error occurred. ${error}.`,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handleVariantChange = (product, unit) => {
    setSelectedVariants({
      ...selectedVariants,
      [product.id]: unit,
    });
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
      {loading ? (
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
            .map((product, index) => {
              const selectedVariant =
                selectedVariants[product.id] || product.product_units[0];
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.productCard}
                  onPress={() => {
                    /* handle product press */
                  }}>
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
                    <Text style={styles.productName}>
                      {truncateProductName(product.product_name)}
                      {/* {product.product_name} */}
                    </Text>
                    {product.product_units.length > 1 ? (
                      <SelectDropdown
                        data={product.product_units}
                        onSelect={(selectedItem, index) =>
                          handleVariantChange(product, selectedItem)
                        }
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem.unit;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item.unit;
                        }}
                        defaultButtonText={selectedVariant.unit}
                        buttonStyle={styles.dropdownButton}
                        buttonTextStyle={styles.dropdownButtonText}
                        dropdownStyle={styles.dropdown}
                        rowStyle={styles.dropdownRow}
                        rowTextStyle={styles.dropdownRowText}
                        renderDropdownIcon={isOpened => {
                          isOpened ? '>' : '<';
                        }}
                        //dropdownIconPosition={'right'}
                      />
                    ) : (
                      <View style={styles.noVariantTextContainer}>
                        <Text style={styles.noVariantTextTitle}>
                          {product.product_units[0].unit}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.productPrice}>
                      Price: ₹ {selectedVariant.selling_price}
                    </Text>
                    {cartItemQuantity(product, selectedVariant.id) > 0 ? (
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() =>
                            decreaseQuantity(product, selectedVariant)
                          }>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>
                          {cartItemQuantity(product, selectedVariant.id)}
                        </Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() =>
                            handleAddToCart(product, selectedVariant)
                          }>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={() =>
                          handleAddToCart(product, selectedVariant)
                        }>
                        <Text style={styles.addToCartButtonText}>
                          Add to Cart
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
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
    aspectRatio: 1,
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
    width: 30,
    height: 30,
    borderRadius: 15,
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
    width: '48%',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageSliderContainer: {
    height: 150,
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
    fontSize: 14,
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
    paddingVertical: '8%',
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
    height: 30,
  },
  quantityButton: {
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    marginHorizontal: '10%',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  quantityButtonText: {
    fontSize: 25,
    color: colors.whiteColor,
  },
  quantityText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageAvailable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: '95%',
  },
  dropdownButton: {
    width: '100%',
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownButtonText: {
    color: '#444',
    textAlign: 'left',
    fontSize: 14,
  },
  noVariantTextContainer: {
    width: '100%',
    height: 30,
    backgroundColor: 'lightgrey',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVariantTextTitle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 14,
  },

  dropdown: {
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444',
    marginTop: -60, // Adjust this to fine-tune the vertical position
  },
  dropdownRow: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowText: {
    color: '#444',
    textAlign: 'left',
    fontSize: 14,
  },
});

export default SubCategoriesScreen;
