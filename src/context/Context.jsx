// CartContext.js
import React, {createContext, useReducer, useState} from 'react';

const initialState = {
  cartItems: [
    // {
    //   id: 59,
    //   title: 'Spring and summershoes',
    //   discountedPrice: 20,
    //   quantity: 1,
    //   discountPercentage: 8.71,
    //   price: 55,
    //   image: 'https://cdn.dummyjson.com/product-images/59/thumbnail.jpg',
    // },
    // {
    //   id: 88,
    //   title: 'TC Reusable Silicone Magic Washing Gloves',
    //   discountedPrice: 20,
    //   quantity: 1,
    //   discountPercentage: 3.19,
    //   price: 40,
    //   image: 'https://cdn.dummyjson.com/product-images/88/thumbnail.jpg',
    // },
    // {
    //   id: 18,
    //   title: 'Oil Free Moisturizer 100ml',
    //   discountedPrice: 40,
    //   quantity: 1,
    //   discountPercentage: 13.1,
    //   price: 70,
    //   image: 'https://cdn.dummyjson.com/product-images/18/thumbnail.jpg',
    // },
    // {
    //   id: 95,
    //   title: 'Wholesale cargo lashing Belt',
    //   discountedPrice: 40,
    //   quantity: 0,
    //   discountPercentage: 17.67,
    //   price: 50,
    //   image: 'https://cdn.dummyjson.com/product-images/95/thumbnail.jpg',
    // },
  ],
  cartTotal: 0,
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
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Add logic to add item to cart
      const newCartItems = [...state.cartItems, action.payload];
      const newCartTotal = calculateTotal(newCartItems);
      const newDiscount = calculateDiscount(newCartItems);
      return {
        ...state,
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        discount: newDiscount,
        finalTotal: calculateFinalTotal(newCartTotal, newDiscount),
      };
    case 'REMOVE_ITEM':
      // Add logic to remove item from cart
      const updatedCartItems = state.cartItems.filter(
        item => item.id !== action.payload.id,
      );
      const updatedCartTotal = calculateTotal(updatedCartItems);
      const updatedDiscount1 = calculateDiscount(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotal: updatedCartTotal,
        discount: updatedDiscount1,
        finalTotal: calculateFinalTotal(updatedCartTotal, updatedDiscount1),
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? {...item, quantity: action.payload.quantity}
          : item,
      );
      const updatedTotal = calculateTotal(updatedItems);
      const updatedDiscount = calculateDiscount(updatedItems);
      return {
        ...state,
        cartItems: updatedItems,
        cartTotal: updatedTotal,
        discount: updatedDiscount,
        finalTotal: calculateFinalTotal(updatedTotal, updatedDiscount),
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
