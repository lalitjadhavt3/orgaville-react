import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  Button,
  Dimensions,
} from 'react-native';
import {Person, Cart} from '../assets/icons';
import {colors} from '../utils/constants';
import Carousel from 'react-native-reanimated-carousel';
import api, {BASE_URL} from '../utils/api';
import {endPoints} from '../utils/endpoints';
const width = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    const data = {
      platform: 'android',
    };
    api.post(endPoints.GET_BANNER, data).then(response => {
      setSliders(response?.data?.data?.sliders);
    });
  }, []);

  return (
    <ScrollView style={[styles.home, isDarkMode && styles.darkBackground]}>
      <View style={[styles.frameParent, styles.frameParentFlexBox]}>
        <View style={styles.avatarsDefaultWithBackdropParent}>
          <Image
            style={styles.avatarsDefaultWithBackdrop}
            resizeMode="cover"
            source={require('../assets/avatar.png')}
          />
          <Text
            style={[styles.halloFahmiHaecal, isDarkMode && styles.darkText]}>
            Hello lalit
          </Text>
        </View>
        <View style={[styles.iconlyWrapper, styles.iconlyFlexBox]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <Image
              style={[styles.iconly, styles.iconlyLayout]}
              resizeMode="cover"
              source={require('../assets/address.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {sliders?.length > 0 ? (
        <Carousel
          loop
          style={{
            marginVertical: '5%',
            width: '95%',
            marginLeft: '2%',
            marginRight: '5%',
            borderRadius: 10,
          }}
          width={width}
          height={width / 2}
          autoPlay={true}
          data={sliders}
          scrollAnimationDuration={2000}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                justifyContent: 'center',
                marginHorizontal: '2%',
              }}>
              <Image
                style={{width: '95%', height: '90%', borderRadius: 10}}
                source={{uri: `${BASE_URL}/public${item.image_name}`}}
              />
            </View>
          )}
        />
      ) : (
        <View
          style={[styles.loaderContainer, isDarkMode && styles.darkBackground]}>
          <ActivityIndicator size="large" />
          <Text>Loading Data...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  darkBackground: {
    backgroundColor: '#000',
  },
  frameParentFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  avatarsDefaultWithBackdropParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarsDefaultWithBackdrop: {
    width: 40,
    height: 40,
  },
  halloFahmiHaecal: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  iconlyWrapper: {
    padding: 3,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  iconly: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  findACourse: {
    marginTop: '2%',
    fontSize: 22,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  frameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  seeMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    marginBottom: 10,
    marginEnd: 30,
    color: 'red',
  },
  seeMoreText: {
    color: 'tomato',
  },
  learnflexWrapper: {
    flex: 1,
  },
  learnflex: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',

    color: 'black',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F4F4F',
  },
  frameView: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  frameParentShadowBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  bottomView: {
    width: '100%',
    height: 30,
    backgroundColor: colors.primaryColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: '15%',
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    alignContent: 'flex-start',
    fontWeight: 500,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: '2%',
  },
  image19Wrapper: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image19Icon: {
    width: 32,
    height: 32,
  },
  frontEndHtmlCssParent: {
    marginTop: 12,
  },
  frontEndHtml: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  frameParent2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconlyFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconly2: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#828282',
  },
  text1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  scrollView: {
    paddingHorizontal: 10,
    marginBottom: 16,
    marginHorizontal: 10,
    paddingRight: 50,
  },
  scrollBanner: {
    paddingHorizontal: 10,
    marginBottom: 16,
    marginHorizontal: 10,
    paddingRight: 50,
    marginTop: '10%',
  },
  coursesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  PopularCourseCard: {
    marginRight: 12,
    width: 190,
    height: 260,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 0,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  courseCard: {
    marginRight: 12,
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#F4F4F4',
    padding: 12,
  },
  freeTag: {
    position: 'absolute',
    top: '2%',
    right: 0,
    zIndex: 1,
    width: '50%',
    height: 20,
    left: '70%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  PopularCourseCardTitle: {
    marginTop: 5,
    fontSize: 18,
    marginHorizontal: '10%',
    lineHeight: 25,
    textAlign: 'left',
    flexWrap: 'wrap',
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontWeight: 200,
  },
  courseScrollTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  courseTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  moreLectures: {
    fontSize: 14,
    textAlign: 'right',
    color: 'skyblue',
  },
  darkText: {
    color: '#fff',
  },
  darkText2: {
    color: '#fff',
  },
  staffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  staffCard: {
    marginRight: 16,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
    marginBottom: 60,
    borderWidth: 5,
  },
  staffImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  staffTitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    flexShrink: 1,
    color: 'black',
  },
  staffedu: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'center',
  },
  modalContainer1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  modalContainerdark: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#007FFF',
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 80,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalStaffImage: {
    width: 400,
    height: 400,
    borderBottomWidth: 70,
    alignItems: 'center',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  modalStaffTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 18,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  modalStaffEdu: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    textAlign: 'center',
    marginTop: 2,
    color: 'black',
  },
  modalStaffsub: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: '2%',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
