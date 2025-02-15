import {configureStore} from "@reduxjs/toolkit";
import languageSlice from "./language/languageSlice.js";
import applicationsSlice from "./application/applicationsSlice.js";
import categorySlice from "./category/categorySlice.js";

export const store = configureStore({
    reducer: {
        language: languageSlice,
        category: categorySlice,
        application: applicationsSlice
    },
})