import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products';

// pour récupérer les produits
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

//pour ajouter un produit
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const response = await axios.post(API_URL, newProduct);
  return response.data;
});

//pour mettre à jour un produit
export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
  const { id, ...data } = updatedProduct;
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
});

// pour supprimer un produit
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`${API_URL}/${productId}`);
  return productId;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product._id === action.payload._id);
        state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
