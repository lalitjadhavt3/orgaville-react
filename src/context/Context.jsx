import React, {createContext, useReducer, useState} from 'react';

const initialState = {
  cartItems: [],
  cartTotal: 0,
  cartTotalItems: 0, // Added total cart items
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
    case 'ADD_ITEM':
      const newCartItems = [...state.cartItems, action.payload];
      const newCartTotal = calculateTotal(newCartItems);
      const newDiscount = calculateDiscount(newCartItems);
      const newCartTotalItems = calculateTotalItems(newCartItems); // Calculate total items
      return {
        ...state,
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        discount: newDiscount,
        finalTotal: calculateFinalTotal(newCartTotal, newDiscount),
        cartTotalItems: newCartTotalItems, // Update total items
      };
    case 'REMOVE_ITEM':
      const updatedCartItems = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );
      const updatedCartTotal = calculateTotal(updatedCartItems);
      const updatedDiscount1 = calculateDiscount(updatedCartItems);
      const updatedCartTotalItems1 = calculateTotalItems(updatedCartItems); // Calculate total items
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotal: updatedCartTotal,
        discount: updatedDiscount1,
        finalTotal: calculateFinalTotal(updatedCartTotal, updatedDiscount1),
        cartTotalItems: updatedCartTotalItems1, // Update total items
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? {...item, quantity: action.payload.quantity}
          : item,
      );
      const updatedTotal = calculateTotal(updatedItems);
      const updatedDiscount = calculateDiscount(updatedItems);
      const updatedCartTotalItems2 = calculateTotalItems(updatedItems); // Calculate total items
      return {
        ...state,
        cartItems: updatedItems,
        cartTotal: updatedTotal,
        discount: updatedDiscount,
        finalTotal: calculateFinalTotal(updatedTotal, updatedDiscount),
        cartTotalItems: updatedCartTotalItems2, // Update total items
      };
    default:
      return state;
  }
};

export const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [selectedSubCat, setSelectedSubCat] = useState();
  return (
    <CartContext.Provider
      value={{state, dispatch, setSelectedSubCat, selectedSubCat}}>
      {children}
    </CartContext.Provider>
  );
};
