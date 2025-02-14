import i18next from "i18next";
import {uz} from "../../locale/uz.js";
import {ru} from "../../locale/ru.js";
import {en} from "../../locale/en.js";
import {initReactI18next} from "react-i18next";
import {createSlice} from "@reduxjs/toolkit";

i18next.use(initReactI18next).init({
    resources: {
        uz: {translation: uz},
        ru: {translation: ru},
        en: {translation: en},
    },
    lng: "uz",
    fallbackLng: "uz",
});

const initLanguageState = {
    language: "uz",
};

const languageSlice = createSlice({
    name: "language",
    initialState: initLanguageState,
    reducers: {
        changeLanguage: (state, action) => {
            console.log(action.payload)
            i18next.changeLanguage(action.payload);
            state.language = action.payload;
        },
    },
});

export const {changeLanguage} = languageSlice.actions;
export default languageSlice.reducer;