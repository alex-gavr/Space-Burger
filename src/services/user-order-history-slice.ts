import { createSlice } from '@reduxjs/toolkit';
import { IOrdersState } from '../types/store-states';

const initialState: IOrdersState = {
    status: '',
    connectionError: '',
    data: null,
    orders: [],
    fromLink: null,
};

export const userOrderHistory = createSlice({
    name: 'userOrderHistory',
    initialState,
    reducers: {
        ORDERS_CONNECT_USER(state) {
            state.status = "CONNECTING";
        },
        ORDERS_DISCONNECT_USER(state) {
            state.status = "OFFLINE";
            state.data = null;
            state.orders = [];
            state.fromLink = null;
        },
        ORDERS_WS_CONNECTING_USER(state) {
            state.status = 'CONNECTING';
        },
        ORDERS_WS_OPEN_USER(state) {
            state.status = 'ONLINE';
        },
        ORDERS_WS_CLOSE_USER(state) {
            state.status = 'OFFLINE';
        },
        ORDERS_WS_ERROR_USER(state, action) {
            state.status = 'OFFLINE';
            state.connectionError = action.payload;
        },
        ORDERS_WS_MESSAGE_USER(state, action) {
            state.data = action.payload;
            state.orders = action.payload.orders;
        },
        cameFromLinkUser(state, action) {
            state.fromLink = action.payload;
        },
    },
});
export const { 
    ORDERS_CONNECT_USER, 
    ORDERS_DISCONNECT_USER, 
    ORDERS_WS_CONNECTING_USER, 
    ORDERS_WS_OPEN_USER,
    ORDERS_WS_CLOSE_USER,
    ORDERS_WS_ERROR_USER,
    ORDERS_WS_MESSAGE_USER,
    cameFromLinkUser
} = userOrderHistory.actions;

export default userOrderHistory.reducer;
