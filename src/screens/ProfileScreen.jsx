import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utils/constants';
const windowHeight = Dimensions.get('window').height;

import RightArrow from '../icons/RightArrow';
import PrimaryBtn from '../components/PrimaryBtn';

const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.avatarsDefaultWithBackdropParent}>
        <Image
          style={styles.avatarsDefaultWithBackdrop}
          resizeMode="cover"
          source={require('../assets/avatar.png')}
        />
        <View style={styles.userName}>
          <Text style={[styles.userGreet]}>Hello lalit</Text>
          <Text style={styles.userEmail}>abc@gmail.com</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('Orders');
            }}>
            <Image source={require('../icons/cart.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>Orders </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../icons/return.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>Returns </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../icons/edit.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>Edit Details </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Address')}>
            <Image source={require('../icons/contact.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>Address </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../icons/offer.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>Offers </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../icons/card.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>Payment Methods </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../icons/question.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>Help </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../icons/info.png')} />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuText}>About </Text>
              <RightArrow width={24} height={24} />
            </View>
          </TouchableOpacity>
          <View style={styles.logoutBtn}>
            <PrimaryBtn
              text="Logout"
              icon={'Logout'}
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    marginVertical: '5%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  btnStyle: {},
  screenContainer: {},
  avatarsDefaultWithBackdropParent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '5%',
  },
  avatarsDefaultWithBackdrop: {
    width: 60,
    height: 60,
  },
  userGreet: {
    marginLeft: '5%',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontWeight: 'bold',
  },
  userEmail: {fontSize: 15, marginLeft: '5%'},
  iconlyWrapper: {
    padding: 3,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    backgroundColor: 'red',
    flex: 1,
    zIndex: 199,
  },
  menuItemTextContainer: {
    width: '96%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuContainer: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  container: {
    paddingVertical: '5%',
    backgroundColor: colors.whiteColor,
    height: windowHeight - 100,

    flexDirection: 'row',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: '#888',
  },
  form: {
    flex: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ceefeb',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: '5%',
  },
  forgotPassword: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  button: {
    height: 40,
    backgroundColor: colors.backgroundColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonLabel: {
    color: colors.whiteColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  newAccount: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  orLoginWith: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  socialLogin: {
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default ProfileScreen;
