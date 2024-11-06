import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductState {
  products: any[];
  inProgress: boolean;
  error?: any;
}

const initialState: ProductState = {
  products: [],
  inProgress: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData: any) => {
    const response = await axios.post(
      "https://api.escuelajs.co/api/v1/products",
      productData
    );
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, productData }: { id: string; productData: any }) => {
    const response = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      productData
    );
    return response.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
    return id;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.inProgress = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.inProgress = false;
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error;
      state.inProgress = false;
    });

    builder.addCase(addProduct.pending, (state) => {
      state.inProgress = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.inProgress = false;
      state.products.push(action.payload);
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.error;
      state.inProgress = false;
    });

    builder.addCase(editProduct.pending, (state) => {
      state.inProgress = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.inProgress = false;
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.error = action.error;
      state.inProgress = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.inProgress = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.inProgress = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.error;
      state.inProgress = false;
    });
  },
});

export default productsSlice.reducer;
