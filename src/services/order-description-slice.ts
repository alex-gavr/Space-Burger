import { createSlice } from '@reduxjs/toolkit';
import { IOrderDescriptionState } from '../types/store-states';

const initialState: IOrderDescriptionState = {
    orderDescription: null,
};

export const orderDescriptionSlice = createSlice({
    name: 'orderDescription',
    initialState,
    reducers: {
        setOrderDescription(state, action) {
            state.orderDescription = action.payload.order;
        },
        deleteOrderDescription(state) {
            state.orderDescription = null;
        },
    },
});

export const { setOrderDescription, deleteOrderDescription } = orderDescriptionSlice.actions;
export default orderDescriptionSlice.reducer;