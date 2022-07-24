import { createSlice } from "@reduxjs/toolkit";

import {
    registerUser,
    loginUser
} from '../actions/userActions';

const initialState = {
    isLoggedIn : false,
    userId : ''
}

const userReducer = createSlice({
    name : 'user',
    initialState,
    reducers : {
        logout(state) {
            state.isLoggedIn = false;
            state.userId = '';
            localStorage.clear();
        },
        tokenVerified(state, action) {
            const { success, token, userId } = action.payload;
            state.isLoggedIn = success;
            state.userId = success ? userId : '';
            success ? localStorage.setItem('token', token) : localStorage.clear();
        }
    },
    extraReducers : {
        [loginUser.fulfilled] : (state, action) => {
            state.isLoggedIn = action.payload.success;
            const { userId, token } = action.payload;
            if(action.payload.success){
                state.userId = userId;
                localStorage.setItem('token', token);
            }
        },
        [registerUser.fulfilled] : (state, action) => {

        }
    }
});

export const { logout, tokenVerified } = userReducer.actions;
export default userReducer.reducer;