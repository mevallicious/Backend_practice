import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/auth.slice"
import productReducer from "../features/products/store/product.slice"

export const store = configureStore({
    reducer: {
        auth:authReducer,
        product:productReducer
    }
})