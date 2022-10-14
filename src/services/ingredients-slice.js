import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_URL } from '../utils/config';

const initialState = {
    ingredients: [],
    loading: null,
    error: false,
};

export const fetchIngredients = createAsyncThunk('ingredients/getIngredients', async () => {
    const res = await fetch(INGREDIENTS_URL);
    return res.json();
});

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    extraReducers: {
        [fetchIngredients.pending]: (state) => {
            state.error = false;
            state.loading = true;
        },
        [fetchIngredients.fulfilled]: (state, action) => {
            state.ingredients = action.payload.data;
            state.loading = false;
        },
        [fetchIngredients.rejected]: (state) => {
            state.loading = null;
            state.error = true;
        },
    },
});

export default ingredientsSlice.reducer;
