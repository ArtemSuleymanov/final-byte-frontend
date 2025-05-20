import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE_URL= 'https://final-byte-backend.onrender.com';


axios.defaults.baseURL = VITE_API_BASE_URL;

export const registerThunk = createAsyncThunk("auth/register", async(body, thunkAPI) =>{
    try{
        const {data, message} = await axios.post('auth/register', body)
        console.log({data, message} )
        return {
            data,
            message
        }
    } catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})