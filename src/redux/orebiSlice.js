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
    moveItemsToOrder: (state, action) => {
      const { items } = action.payload;
      // Remove items from the cart (products)
      state.products = state.products.filter((item) => !items.includes(item));
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
      const { _id, name, price } = action.payload;
      const existingOrder = state.orders[0];
      
      if (existingOrder) {
        existingOrder.quantity++; // Increase the quantity
      } else {
        state.orders.push({ _id, name, price, quantity: 1 }); // Add the product to the order
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
  moveItemsToOrder,
} = orebiSlice.actions;

export default orebiSlice.reducer;
