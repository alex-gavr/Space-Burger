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


export const userOrderHistory = createSlice({
    name: 'userOrderHistory',
    initialState,
    reducers: {
        onOpenWSUser(state, action) {
            state.connectStatus = action.payload;
        },
        onErrorWSUser(state, action) {
            state.error = true;
            state.errorCode = action.payload.code
        },
        onMessageWSUser(state, action) {
            state.success = action.payload.success;
            state.orders = action.payload.orders;
            state.total =action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        onCloseWSUser(state, action) {
            state.connectStatus = action.payload;
            state.success = null;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
    },
});
export const { onOpenWSUser, onErrorWSUser, onMessageWSUser, onCloseWSUser } = userOrderHistory.actions;

export default userOrderHistory.reducer;
