import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen';
const Tab = createBottomTabNavigator();
import {CartIcon, CourseSelect, Home, Person} from '../../icons';
import {colors} from '../../utils/constants';
import CartBottomIcon from '../../icons';
import Cart from '../../screens/Cart';
import CartIcons2 from '../../icons/CartIcons2';
import CategoriesScreen from '../../screens/Categories';
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',

          tabBarLabel: 'Home',
          unmountOnBlur: true,
          tabBarIcon: ({color, size}) => (
            <Home width={20} height={20} fill={color} />
          ),
          tabBarVisible: false,
          tabBarActiveTintColor: colors.primaryColor,

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <CourseSelect width={20} height={20} />
          ),
          tabBarActiveTintColor: colors.primaryColor,
          headerShown: false,
          tabBarLabel: 'Categories',
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: 'white',
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color, size}) => <CartIcons2 width={20} height={20} />,
          tabBarActiveTintColor: colors.primaryColor,
          headerShown: false,
          tabBarLabel: 'Cart',
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: 'white',
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={LoginScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Person width={20} height={20} fill={color} />
          ),
          headerShown: false,
          tabBarLabel: 'Account',
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: 'white',
          },
          tabBarActiveTintColor: colors.primaryColor,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
