import ingredientsSlice from './ingredients-slice';
import { fetchIngredients } from './ingredients-slice';
import { IIngredientsState } from '../types/store-states';
import { dummyIngredientMain } from '../utils/dummy-ingredient';

const initialState: IIngredientsState = {
    ingredients: [],
    loading: null,
    error: false,
};


describe('Ingredients Slice Tests', () => {
    // Test initial state
    test('should return the initial state of ingredients slice', () => {
        expect(ingredientsSlice(undefined, { type: undefined })).toEqual(initialState);
    });
    // Pending asynchronous function
    test('should set loading true while action is pending', () => {
        const action = { type: fetchIngredients.pending };
        const state = ingredientsSlice(initialState, action);
        expect(state).toEqual({ 
            ...initialState,
            loading: true,
        });
    });
    // Fulfilled asynchronous function
    test('should set ingredient when action is fulfilled', () => {
        const action = {
            type: fetchIngredients.fulfilled,
            payload: {
                data: [dummyIngredientMain],
            },
        };
        const state = ingredientsSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            ingredients: action.payload.data,
        });
    });
    // Rejected asynchronous function
    test('should set error true when action is rejected', () => {
        const action = { type: fetchIngredients.rejected };
        const state = ingredientsSlice(initialState, action);
        expect(state).toEqual({ 
            ...initialState,
            error: true, 
        });
    });
});
