import { createSlice } from '@reduxjs/toolkit';
import { IBurgerConstructorState } from '../types/store-states';

const initialState: IBurgerConstructorState = {
    bun: [],
    mainIngredients: [],
};

const constructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredient(state, action) {
            if (action.payload.type === 'bun') {
                const hasBun = state.bun.some((i) => i.type === 'bun');

                if (hasBun) {
                    let currentBun = state.bun.find((i) => i.type === 'bun');
                    state.bun.splice(
                        state.bun.findIndex((i) => i._id === currentBun?._id),
                        1
                    );
                    state.bun.push(action.payload);
                } else {
                    state.bun.push(action.payload);
                }
            } else {
                state.mainIngredients.push(action.payload);
            }
        },
        deleteIngredient(state, action) {
            state.mainIngredients.splice(
                state.mainIngredients.findIndex((i) => i._id === action.payload._id),
                1
            );
        },
        reorder(state, action) {
            const dragCard = state.mainIngredients[action.payload[0]];
            state.mainIngredients.splice(action.payload[0], 1);
            state.mainIngredients.splice(action.payload[1], 0, dragCard);
        },
        emptyConstructor(state) {
            state.bun = [];
            state.mainIngredients = [];
        },
    },
});

export const { addIngredient, deleteIngredient, reorder, emptyConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
