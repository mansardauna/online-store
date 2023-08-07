import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  watchlist: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
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
  },
})

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  addToWatchlist,
  removeFromWatchlist,
} = orebiSlice.actions;
export default orebiSlice.reducer;
