import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {colors} from '../utils/constants';
const windowHeight = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native';
import PrimaryBtn from '../components/PrimaryBtn';
const LoginMobileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subTitle}>
            Online Supermarket for all your daily needs.
          </Text>
          <Text style={styles.description}>
            You are just One Click away from your all needs at your door step.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Login to Your Account</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Mobile Number"
            inputMode="email"
          />
          <View style={styles.socialLogin}>
            <PrimaryBtn
              text={'Generate OTP'}
              onPress={() => navigation.navigate('OTP')}
            />
          </View>

          <Text style={styles.newAccount}>OR</Text>
          <View style={styles.socialLogin}>
            <PrimaryBtn
              text={'Register'}
              buttonStyle={{backgroundColor: colors.secondaryColor}}
              onPress={() => navigation.navigate('Register')}
              icon={' '}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    backgroundColor: colors.backgroundColor,
  },
  container: {
    padding: '5%',
    backgroundColor: colors.whiteColor,
    height: windowHeight,
    marginTop: '15%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    marginHorizontal: 'auto',
  },
});

export default LoginMobileScreen;
