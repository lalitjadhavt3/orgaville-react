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
} from 'react-native';
import {colors} from '../utils/constants';
const windowHeight = Dimensions.get('window').height;

import api, {BASE_URL} from '../utils/api';
import {endPoints} from '../utils/endpoints';
import SnackMsg from '../components/SnackMsg';
import {useFocusEffect} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
const SubCategoriesScreen = ({navigation, route}) => {
  const {category_id} = route.params;
  const [selectedSubCat, setSelectedSubCat] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSubCategoryPress = subCategory => {
    setSelectedSubCat(subCategory);
    fetchProducts();
  };
  const fetchProducts = async () => {
    try {
      const productsData = await Promise.all(
        subCategories.map(async subCategory => {
          const data = {
            platform: 'android',
            category_id: category_id,
            sub_category_id: subCategory.id,
            no_of_records: 5,
            page_number: 1,
          };
          console.log('req=====>', data);
          const responseProducts = await api.post(endPoints.PRODUCTS, data);
          console.log('resp=====>', responseProducts?.data?.data);
          return responseProducts?.data?.data;
        }),
      );
      setProducts(productsData);
    } catch (error) {
      handleApiError(error);
    }
  };

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
    const data = {
      platform: 'android',
      category_id: category_id,
    };
    api
      .post(endPoints.SUB_CATEGORIES, data)
      .then(response => {
        setSubCategories(response?.data?.data);
      })
      .catch(error => {
        handleApiError(error);
      });
  }, []);
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
                uri: `${BASE_URL}/public${subCategory.cat_image_name}`,
              }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{subCategory.cat_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.productContainer}>
        {console.log('products', products)}
        {/* {products
          .filter(categoryProducts =>
            selectedSubCat
              ? categoryProducts?.category_id === selectedSubCat.id
              : true,
          )
          .map(categoryProducts =>
            console.log('selectedCategoryprods', categoryProducts),
          )} */}
      </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  productContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  subCategoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  productCard: {
    width: 150,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
  },
  viewAllButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    color: colors.blue,
  },
});

export default SubCategoriesScreen;
