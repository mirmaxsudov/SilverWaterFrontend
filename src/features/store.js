import {configureStore} from "@reduxjs/toolkit";
import languageSlice from "./language/languageSlice.js";
import applicationsSlice from "./application/applicationsSlice.js";

export const store = configureStore({
    reducer: {
        language: languageSlice,
        application: applicationsSlice
    },
})