import { createSlice } from '@reduxjs/toolkit';
import { IOrdersState } from '../types/store-states';

const initialState: IOrdersState = {
    status: '',
    connectionError: '',
    data: null,
    orders: [],
    fromLink: null,
};


export const feedOrders = createSlice({
    name: 'feedOrders',
    initialState,
    reducers: {
        ORDERS_CONNECT(state) {
            state.status = "CONNECTING";
        },
        ORDERS_DISCONNECT(state) {
            state.status = "OFFLINE";
            state.data = null;
            state.orders= [];
            state.fromLink = null;
        },
        ORDERS_WS_CONNECTING(state) {
            state.status = 'CONNECTING';
        },
        ORDERS_WS_OPEN(state) {
            state.status = 'ONLINE';
        },
        ORDERS_WS_CLOSE(state) {
            state.status = 'OFFLINE';
        },
        ORDERS_WS_ERROR(state, action) {
            state.status = 'OFFLINE';
            state.connectionError = action.payload;
        },
        ORDERS_WS_MESSAGE(state, action) {
            state.data = action.payload;
            state.orders = action.payload.orders;
        },
        cameFromLink(state, action) {
            state.fromLink = action.payload;
        },
    },
});
export const { 
    ORDERS_CONNECT,
    ORDERS_DISCONNECT, 
    ORDERS_WS_CONNECTING, 
    ORDERS_WS_OPEN,
    ORDERS_WS_CLOSE,
    ORDERS_WS_ERROR,
    ORDERS_WS_MESSAGE,
    cameFromLink
} = feedOrders.actions;

export default feedOrders.reducer;
