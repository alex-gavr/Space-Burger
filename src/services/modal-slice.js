import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    title: '',
    isModalOpen: false,
};


export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        onOpenModal(state, action) {
            Cookies.set('isModalOpen', 'True', { path: '/' });
            state.title = action.payload;
            state.isModalOpen = true;
        },
        onCloseModal(state) {
            Cookies.remove('isModalOpen', { path: '/' });
            state.title = '';
            state.isModalOpen = false;
        },
        openModalWithCookie(state) {
            state.isModalOpen = true;
        },
        openModalOrder(state){
            state.isModalOpen = true;
        }
    }
});


export const {onOpenModal, onCloseModal, openModalWithCookie, openModalOrder} = modalSlice.actions;
export default modalSlice.reducer;