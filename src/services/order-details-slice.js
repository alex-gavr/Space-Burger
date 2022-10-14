import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { ORDER_URL } from "../utils/config";

const initialState = {
    orderDetails: [],
    loading: null,
    error: false,
};

export const fetchOrderDetails = createAsyncThunk( "orderDetails/getOrderDetails", async (ids) => {
        const res = await fetch( ORDER_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"ingredients": ids})
        });
        return res.json();
    }
);

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {
        deleteOrderDetails(state){
            state.orderDetails = [];
        }
    },
    extraReducers: {
        [fetchOrderDetails.pending]: (state) => {
            state.error = false;
            state.loading = true;
        },
        [fetchOrderDetails.fulfilled]: (state, action) => {
            state.orderDetails = action.payload;
            state.loading = false;
        },
        [fetchOrderDetails.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },
    },
});

export const {deleteOrderDetails} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
