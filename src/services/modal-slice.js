import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
    isModalOpen: false,

};


export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        onOpenModal(state, action) {
            state.title = action.payload;
            state.isModalOpen = true;
        },
        onCloseModal(state) {
            state.title = '';
            state.isModalOpen = false;
        }
    }
});


export const {onOpenModal, onCloseModal} = modalSlice.actions;
export default modalSlice.reducer;