import { createSlice } from '@reduxjs/toolkit';
import { IDetailsState } from '../types/store-states';

const initialState: IDetailsState = {
    details: null,
};

export const ingredientDetailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        setDetails(state, action) {
            state.details = action.payload;
        },
        deleteDetails(state) {
            state.details = null;
        },
    },
});

export const { setDetails, deleteDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
