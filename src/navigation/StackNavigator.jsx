import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, ActivityIndicator} from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

//import {AuthContext} from '../context/AuthContext';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginMobileScreen from '../screens/LoginMobileScreen';
import Cart from '../screens/Cart';
import ProfileScreen from '../screens/ProfileScreen';
import CategoriesScreen from '../screens/Categories';
import SubCategoriesScreen from '../screens/SubCategoriesScreen';
const Stack = createStackNavigator();

const StackNavigator = () => {
  //const {user, isLoading} = useContext(AuthContext);
  const [loadingvar, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 800);
  }, []);
  if (loadingvar) {
    return (
      <Stack.Navigator>
        <>
          {/* <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            /> */}

          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="subCategory"
            component={SubCategoriesScreen}
            options={({route}) => ({
              headerTitle: route.params?.categoryName || 'Subcategory',
              headerShown: true,
            })}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginMobile"
            component={LoginMobileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />

          {/* <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewRegister"
              component={NewRegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OTP"
              component={OTPScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AllLectures"
              component={AllLectures}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DeviceUpdate"
              component={DeviceUpdateScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{headerShown: false}}
            /> */}
        </>
      </Stack.Navigator>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 10}}>Loading...</Text>
      </View>
    );
  }
};

export default StackNavigator;
