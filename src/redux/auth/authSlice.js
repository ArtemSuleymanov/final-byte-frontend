import { createSlice } from "@reduxjs/toolkit"

import { loginThunk, registerThunk } from "./authOperations";

const initialState = {
    user:{
        name: '',
        email: '',

    },
accessToken: '',
isLoggedIn: false
}

const slice = createSlice({
    name:'auth',
    initialState,
    extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, (state, action) =>{
        state.user = action.payload.user
        state.isLoggedIn = true;
    })
    .addCase(loginThunk.fulfilled, (state, action) =>{
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
    })
    }
})

export const authReducer = slice.reducer;