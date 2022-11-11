import { createSlice } from '@reduxjs/toolkit';
import { IOrdersState } from '../types/store-states';

const initialState: IOrdersState = {
    connectStatus: '',
    error: null,
    errorCode: null,
    success: null,
    orders: [],
    total: 0,
    totalToday: 0,
};


export const feedOrders = createSlice({
    name: 'feedOrders',
    initialState,
    reducers: {
        onOpenWSFeed(state, action) {
            state.connectStatus = action.payload;
        },
        onErrorWSFeed(state, action) {
            state.error = true;
            state.errorCode = action.payload.code
        },
        onMessageWSFeed(state, action) {
            state.success = action.payload.success;
            state.orders = action.payload.orders;
            state.total =action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        onCloseWSFeed(state, action) {
            state.connectStatus = action.payload;
            state.success = null;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
    },
});
export const { onOpenWSFeed, onErrorWSFeed, onMessageWSFeed, onCloseWSFeed } = feedOrders.actions;

export default feedOrders.reducer;
