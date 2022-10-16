import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    details: {},
};

export const ingredientDetailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setDetails(state, action) {
            state.details = action.payload;
        },
        deleteDetails(state) {
            state.details = {};
        },
    },
});

export const { setDetails, deleteDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
