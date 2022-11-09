import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IIngredientsState } from '../types/store-states';
import { INGREDIENTS_URL } from '../utils/config';
import { request } from '../utils/request';

const initialState: IIngredientsState = {
    ingredients: [],
    loading: null,
    error: false,
};

export const fetchIngredients = createAsyncThunk<any>('ingredients/getIngredients', async () => {
    return request(INGREDIENTS_URL);
});

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state) => {
            state.error = false;
            state.loading = true;
        })
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload.data;
            state.loading = false;
        })
        builder.addCase(fetchIngredients.rejected, (state) => {
            state.loading = null;
            state.error = true;
        })
    },
});

export default ingredientsSlice.reducer;
