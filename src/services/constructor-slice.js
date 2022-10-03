import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { 
    constructorItems: [],
    
};

const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addIngredient(state, action) {
            const hasBun = state.constructorItems.some(i => i.type === "bun")
            
            if (action.payload.type === 'bun' && hasBun) {
                let currentBun = state.constructorItems.find(i => i.type === "bun");
                state.constructorItems.splice(state.constructorItems.findIndex((i) => i._id === currentBun._id), 1);
                state.constructorItems.push(action.payload);
            } else {
                state.constructorItems.push(action.payload);
                
            }
            
        },
        deleteIngredient(state, action) {
            state.constructorItems.splice(state.constructorItems.findIndex((i) => i._id === action.payload._id), 1);
        },
        // Не получается :( помогите, пожалуйста
        reorder(state, action) {
            const dragCard = state.constructorItems[action.payload[0]];
            const newCards = [...state.constructorItems];
            newCards.splice(action.payload[0], 1);
            newCards.splice(action.payload[1], 0, dragCard);
            state.constructorItems = newCards;
        }
    },
});

export const { addIngredient, deleteIngredient, reorder } = constructorSlice.actions;
export default constructorSlice.reducer;
