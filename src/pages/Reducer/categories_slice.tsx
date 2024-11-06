import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/categories";

interface Category {
  id: number;
  name: string;
}

interface CategoriesState {
  categories: Category[];
  inProgress: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  inProgress: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addCategory = createAsyncThunk<Category, string>(
  "categories/addCategory",
  async (name: string) => {
    const response = await axios.post(BASE_URL, { name });
    return response.data;
  }
);

export const updateCategory = createAsyncThunk<
  Category,
  { id: number; name: string }
>("categories/updateCategory", async ({ id, name }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, { name });
  return response.data;
});

export const deleteCategory = createAsyncThunk<number, number>(
  "categories/deleteCategory",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.inProgress = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.inProgress = false;
        state.error = action.error.message || "Failed to fetch categories";
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.categories.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.categories = state.categories.filter(
            (cat) => cat.id !== action.payload
          );
        }
      );
  },
});

export default categoriesSlice.reducer;
