import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./pages/Reducer/products_slice";
import categoriesReducer from "./pages/Reducer/categories_slice";
import loginReducer from "./pages/Reducer/loginSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
