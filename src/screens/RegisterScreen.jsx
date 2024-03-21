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
const RegisterScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Registration</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Full Name"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Mobile Number"
            inputMode="numeric"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            inputMode="email"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter Password"
            secureTextEntry={true}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Confim Password"
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              /* Handle Sign In */
            }}>
            <Text style={styles.buttonLabel}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.socialLogin}>
            <Text style={styles.newAccount}>Already Have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.forgotPassword}>Click here to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 5,
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
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    textDecorationLine: 'underline',
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
    fontSize: 16,
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
    flexDirection: 'row',
    alignContent: 'center',
  },
});

export default RegisterScreen;
