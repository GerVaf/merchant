/* eslint-disable no-unused-vars */
//src/store/prodPkgStore.jsx
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  products: {},
  packages: {},
  loading: false,
  error: null,
  editingProduct: null,
  editingPackage: null,
};

// Create product slice
const productSlice = createSlice({
  name: "products",
  initialState: initialState.products,
  reducers: {
    setEditingProduct: (state, action) => {
      return action.payload;
    },
    clearEditingProduct: (state) => {
      return null;
    },
  },
});

// Create package slice
const packageSlice = createSlice({
  name: "packages",
  initialState: initialState.packages,
  reducers: {
    setEditingPackage: (state, action) => {
      return action.payload;
    },
    clearEditingPackage: (state) => {
      return null;
    },
  },
});

// Create a slice for global state management
const globalSlice = createSlice({
  name: "global",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setProducts, setEditingProduct, clearEditingProduct } =
  productSlice.actions;

export const { setPackages, setEditingPackage, clearEditingPackage } =
  packageSlice.actions;

export const { setLoading, setError } = globalSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    packages: packageSlice.reducer,
    global: globalSlice.reducer,
  },
});

export default store;
