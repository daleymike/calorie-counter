import { createAsyncThunk } from '@reduxjs/toolkit';

import {apiURL} from '../../constants/endpoints';

export const registerUser = createAsyncThunk('registerUser', async (userData) => {
    console.log(userData);
    try{
        const req = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                Accepts : 'application/json'
            },
            body : JSON.stringify({
                ...userData
            })
        }
        const results = await fetch(`${apiURL}register`, req)
            .then(res => res.json())
            .catch(e =>{
                console.log(`Error sending request`);
                return {success : false};
            });
        return results;
    }catch(e){
        console.log(`Error with action: ${e}`);
        return {success : false};
    }
});

export const loginUser = createAsyncThunk('loginUser', async (userData) => {
    try{
        const req = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                Accepts : 'application/json'
            },
            body : JSON.stringify({
                ...userData
            })
        }
        const results = await fetch(`${apiURL}login`, req)
            .then(res => res.json())
            .catch(e =>{
                console.log(`Error sending request`);
                return {success : false};
            });
            console.log(results);
        return results;
    }catch(e){
        console.log(`Error with action: ${e}`);
        return {success : false};
    }
});