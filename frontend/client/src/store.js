import {configureStore} from "@reduxjs/toolkit";
import userReducer from '/home/fox/PycharmProjects/pythonProject/frontend/client/src/features/user'

export const store=configureStore({
    reducer:{
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
});
