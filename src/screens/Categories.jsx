import React, {useLayoutEffect, useState} from 'react';
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

import api, {BASE_URL, getImageUrl} from '../utils/api';
import {endPoints} from '../utils/endpoints';

const CategoriesScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    const data = {
      platform: 'android',
    };
    api.post(endPoints.GET_CATEGORIES, data).then(response => {
      setCategories(response?.data?.data);
    });
  }, []);

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
        </View>
        <View style={styles.categories}>
          <View style={styles.row}>
            {categories?.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.catContainer}
                onPress={() => {
                  navigation.navigate('subCategory', {
                    category_id: category.id,
                    categoryName: category.cat_name,
                  });
                }}>
                <Image
                  source={{uri: getImageUrl(category.cat_image_name)}}
                  style={styles.categoryImage}
                />
                <Text style={styles.catName}>{category.cat_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? '10%' : 0,
    backgroundColor: colors.whiteColor,
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
});

export default CategoriesScreen;
