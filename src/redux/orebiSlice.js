import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  watchlist: [],
  order: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    // cart slice
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
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
    drecreaseQuantity: (state, action) => {
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

    // watchlist slice
    addToWatchlist: (state, action) => {
      const itemInWatchlist = state.watchlist.find(
        (item) => item._id === action.payload._id
      );
      if (!itemInWatchlist) {
        state.watchlist.push(action.payload);
      }
    },

    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (item) => item._id !== action.payload
      );
    },

    //order slice
    addOrder: (state, action) => {
      const itemInWatchlist = state.order.find(
        (item) => item._id === action.payload._id
      );
      if (!itemInWatchlist) {
        state.order.push(action.payload);
      }
    },


    removeOrder: (state, action) => {
      state.order = state.order.filter(
        (item) => item._id !== action.payload
      );
    },
  },
})

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  addOrder,
  removeOrder,
  addToWatchlist,
  removeFromWatchlist,
} = orebiSlice.actions;
export default orebiSlice.reducer;
