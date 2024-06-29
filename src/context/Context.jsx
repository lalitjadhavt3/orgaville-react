import React, {createContext, useReducer, useState} from 'react';

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
  return (
    <CartContext.Provider
      value={{state, dispatch, setSelectedSubCat, selectedSubCat}}>
      {children}
    </CartContext.Provider>
  );
};
