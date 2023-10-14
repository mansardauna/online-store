import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: number;
  img: string;
  productName: string;
  price: number;
  quantity: number; // Add the quantity property here

}

interface OrebiState {
  products: Product[];
  watchlist: Product[];
  orders: Product[];
  orderHistory: Product[];
}

const initialState: OrebiState = {
  products: [],
  watchlist: [],
  orders: [],
  orderHistory: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ _id: number }>) => {
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ _id: number }>) => {
      const item = state.products.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((item) => item._id !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
    // Watchlist slice
    addToWatchlist: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.watchlist.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex === -1) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlist = state.watchlist.filter((item) => item._id !== action.payload);
    },
    // Orders slice (plural)
    addOrder: (state, action: PayloadAction<Product>) => {
      const item = state.orders.find((item) => item._id === action.payload._id);

      if (item) {
        item.quantity += 1;
      } else {
        state.orders.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((item) => item._id !== action.payload);
    },
    increaseOrderQuantity: (state, action: PayloadAction<{ _id: number }>) => {
      const item = state.orders.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseOrderQuantity: (state, action: PayloadAction<{ _id: number }>) => {
      const item = state.orders.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((item) => item._id !== action.payload);
    },
    resetOrders: (state) => {
      state.orders = [];
    },
    addToOrderHistory: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.orderHistory.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex !== -1) {
        state.orderHistory[itemIndex].quantity += 1;
      } else {
        state.orderHistory.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOrderHistory: (state, action: PayloadAction<number>) => {
      state.orderHistory = state.orderHistory.filter((item) => item._id !== action.payload);
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
  removeOrderHistory,
  addToOrderHistory,
} = orebiSlice.actions;

export default orebiSlice.reducer;
