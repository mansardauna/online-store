import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [], // Store the products in the cart
  watchlist: [], // Store the products in the watchlist
  orders: [], // Store the ordered products
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    // Cart slice
    addToCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        // If the product is already in the cart, increase the quantity
        state.products[itemIndex].quantity += action.payload.quantity;
      } else {
        // If the product is not in the cart, add it
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },

    // Watchlist slice
    addToWatchlist: (state, action) => {
      const itemIndex = state.watchlist.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex === -1) {
        // If the product is not in the watchlist, add it
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (item) => item._id !== action.payload
      );
    },
    // Orders slice (plural)
    addOrder: (state, action) => {
      const itemIndex = state.orders.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        state.orders[itemIndex].quantity += action.payload.quantity;
      } else {
        state.orders.push(action.payload);
      }
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (item) => item._id !== action.payload
      );
    },
    increaseOrderQuantity: (state, action) => {
      const item = state.orders.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseOrderQuantity: (state, action) => {
      const item = state.orders.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (item) => item._id !== action.payload
      );
    },
    resetOrders: (state) => {
      state.orders = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  addToWatchlist,
  removeFromWatchlist,
  addOrder,
  removeOrder,
  increaseOrderQuantity,
  decreaseOrderQuantity,
  resetOrders,
  deleteOrder,
} = orebiSlice.actions;

export default orebiSlice.reducer;
