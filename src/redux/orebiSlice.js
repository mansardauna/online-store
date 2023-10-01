import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Store the products in the cart
  watchlist: [], 
  orders: [], 
  orderHistory: [],

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
      const { _id, img, productName, price } = action.payload;
      const existingOrder = state.orders[0]
    
      if (existingOrder) {
        existingOrder.quantity += 1;
      } else {
        state.orders.push({ _id, productName,img, price, quantity: 1 });
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
  

  addToOrderHistory: (state, action) => {
    const itemIndex = state.orderHistory.findIndex(
      (item) => item._id === action.payload._id
    );

    if (itemIndex !== -1) {
    
      state.orderHistory[itemIndex].quantity += 1
    } else {
      state.orderHistory.push({...action.payload, quantity: 1 });
  }
},
  removeOrderHistory: (state, action) => {
    state.orderHistory = state.orderHistory.filter(
      (item) => item._id !== action.payload
    );
  },
}
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
  addToOrderHistory
} = orebiSlice.actions;

export default orebiSlice.reducer;
