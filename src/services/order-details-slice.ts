import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IOrderDetailsState } from '../types/data';
import { ORDER_URL } from '../utils/config';

const initialState: IOrderDetailsState = {
    orderDetails: {
        name: '',
        order: {
            number: 0,
        },
        success: null
    },
    loading: null,
    error: false,
};

export const fetchOrderDetails = createAsyncThunk<any, Array<string>>('orderDetails/getOrderDetails', async (ids) => {
    const res = await fetch(ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ids }),
    });
    return res.json();
});

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        deleteOrderDetails(state) {
            state.orderDetails = {
                name: '',
                order: {
                    number: 0,
                },
                success: null
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderDetails.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.orderDetails = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchOrderDetails.rejected, (state) => {
            state.loading = null;
            state.error = true;
        })
    },
});

export const { deleteOrderDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
