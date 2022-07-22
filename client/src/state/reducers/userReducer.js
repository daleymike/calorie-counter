import { createSlice } from "@reduxjs/toolkit";

import {
    registerUser,
    loginUser,
    verifyToken
} from '../actions/userActions';

const initialState = {
    isLoggedIn : false
}

const userReducer = createSlice({
    name : 'user',
    initialState,
    reducers : {

    },
    extraReducers : {
        [loginUser.fulfilled] : (state, action) => {
            state.isLoggedIn = action.payload.success;
        },
        [registerUser.fulfilled] : (state, action) => {

        },
        [verifyToken.fulfilled] : (state, action) => {

        }
    }
});

export default userReducer.reducer;