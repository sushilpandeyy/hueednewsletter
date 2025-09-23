import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, size, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        item => item.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          size,
          quantity,
          cartId: `${product.id}-${size}`,
        });
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (total, item) => total + (parseFloat(item.price) * item.quantity),
        0
      );
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      state.items = state.items.filter(item => item.cartId !== cartId);
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (total, item) => total + (parseFloat(item.price) * item.quantity),
        0
      );
    },
    updateQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;
      const item = state.items.find(item => item.cartId === cartId);
      
      if (item) {
        item.quantity = quantity;
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce(
        (total, item) => total + (parseFloat(item.price) * item.quantity),
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;