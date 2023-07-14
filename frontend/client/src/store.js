import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../src/features/user';
import cryptoReducer from "./features/crypto.mjs";

const store = configureStore({
    reducer:{
        user: userReducer,
        cryptos: cryptoReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
