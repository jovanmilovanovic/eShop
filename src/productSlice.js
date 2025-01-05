import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsAsync = createAsyncThunk (
        'products/getProductsAsync',
        async () => {
            const resp = await fetch('-------------------------------')
        }

);

const productSlice = createSlice({
    name: 'products',
    initialState: {
    list: [],


    status: null
    },
    reducers: {

    },
    extraReducers: {

    },

});