import {createSlice} from "@reduxjs/toolkit";


const initCategoryState = {
    categories: [],
};

const languageSlice = createSlice({
    name: "category",
    initialState: initCategoryState,
    reducers: {},
});

export default languageSlice.reducer;