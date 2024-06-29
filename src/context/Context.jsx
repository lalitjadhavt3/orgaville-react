import React, {createContext, useReducer, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  cartItems: [],
  cartTotal: 0,
  cartTotalItems: 0,
  discount: 0,
  finalTotal: 0,
};

export const CartContext = createContext(initialState);

const calculateTotal = cartItems => {
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }
  return total;
};

const calculateDiscount = cartItems => {
  let discount = 0;
  for (const item of cartItems) {
    discount += (item.price - item.discountedPrice) * item.quantity;
  }
  return discount;
};

const calculateFinalTotal = (cartTotal, discount) => {
  return cartTotal - discount;
};

const calculateTotalItems = cartItems => {
  let totalItems = 0;
  for (const item of cartItems) {
    totalItems += item.quantity;
  }
  return totalItems;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload,
        cartTotal: calculateTotal(action.payload),
        discount: calculateDiscount(action.payload),
        finalTotal: calculateFinalTotal(
          calculateTotal(action.payload),
          calculateDiscount(action.payload),
        ),
        cartTotalItems: calculateTotalItems(action.payload),
      };
    case 'ADD_ITEM':
      const existingItemIndex = state.cartItems.findIndex(
        item =>
          item.id === action.payload.id &&
          item.unitId === action.payload.unitId,
      );
      let newCartItems;
      if (existingItemIndex !== -1) {
        newCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      } else {
        newCartItems = [...state.cartItems, {...action.payload, quantity: 1}];
      }
      const newCartTotal = calculateTotal(newCartItems);
      const newDiscount = calculateDiscount(newCartItems);
      const newCartTotalItems = calculateTotalItems(newCartItems);
      return {
        ...state,
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        discount: newDiscount,
        finalTotal: calculateFinalTotal(newCartTotal, newDiscount),
        cartTotalItems: newCartTotalItems,
      };
    case 'REMOVE_ITEM':
      const updatedCartItems = state.cartItems.filter(
        item =>
          !(
            item.id === action.payload.id &&
            item.unitId === action.payload.unitId
          ),
      );
      const updatedCartTotal = calculateTotal(updatedCartItems);
      const updatedDiscount = calculateDiscount(updatedCartItems);
      const updatedCartTotalItems = calculateTotalItems(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotal: updatedCartTotal,
        discount: updatedDiscount,
        finalTotal: calculateFinalTotal(updatedCartTotal, updatedDiscount),
        cartTotalItems: updatedCartTotalItems,
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.id && item.unitId === action.payload.unitId
          ? {...item, quantity: action.payload.quantity}
          : item,
      );
      const updatedTotal = calculateTotal(updatedItems);
      const updatedDiscount2 = calculateDiscount(updatedItems);
      const updatedCartTotalItems2 = calculateTotalItems(updatedItems);
      return {
        ...state,
        cartItems: updatedItems,
        cartTotal: updatedTotal,
        discount: updatedDiscount2,
        finalTotal: calculateFinalTotal(updatedTotal, updatedDiscount2),
        cartTotalItems: updatedCartTotalItems2,
      };
    default:
      return state;
  }
};

export const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [selectedSubCat, setSelectedSubCat] = useState();
  const userId = 13; // Temporary user ID

  const saveCartToStorage = async cart => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      console.error('Failed to load cart from storage:', e);
      return [];
    }
  };

  const fetchCartFromServer = async () => {
    try {
      const response = await fetch(`https://yourapi.com/api/cart/${userId}`);
      const data = await response.json();
      return data.cartItems || [];
    } catch (e) {
      console.error('Failed to fetch cart from server:', e);
      return [];
    }
  };

  const syncCartWithServer = async cartItems => {
    try {
      await fetch(`https://yourapi.com/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          cartItems,
        }),
      });
    } catch (e) {
      console.error('Failed to sync cart with server:', e);
    }
  };

  const initializeCart = async () => {
    const localCart = await loadCartFromStorage();
    if (localCart.length > 0) {
      dispatch({type: 'SET_CART', payload: localCart});
    } else {
      const serverCart = await fetchCartFromServer();
      dispatch({type: 'SET_CART', payload: serverCart});
      saveCartToStorage(serverCart);
    }
  };

  useEffect(() => {
    initializeCart();
  }, []);

  useEffect(() => {
    if (state.cartItems.length > 0) {
      saveCartToStorage(state.cartItems);
      syncCartWithServer(state.cartItems);
    }
  }, [state.cartItems]);

  return (
    <CartContext.Provider
      value={{state, dispatch, setSelectedSubCat, selectedSubCat}}>
      {children}
    </CartContext.Provider>
  );
};
