import { IDetailsState } from '../types/store-states';
import orderDetailsSlice, { deleteDetails, setDetails } from './ingredient-details-slice';
import { dummyIngredientMain } from '../utils/dummy-ingredient';

const initialState: IDetailsState = {
    details: null,
};

describe('Ingredients Details Slice Tests', () => {
    // Test initial state
    test('should return the initial state of ingredients slice', () => {
        expect(orderDetailsSlice(undefined, { type: undefined })).toEqual(initialState);
    });
    test('should set details to equal payload', () => {
        const action = {
            type: setDetails,
            payload: dummyIngredientMain,
        };
        const state = orderDetailsSlice(initialState, action);
        expect(state).toEqual({
            details: dummyIngredientMain,
        });
    });
    test('should set details to null', () => {
        const action = {
            type: deleteDetails,
        };
        const state = orderDetailsSlice(initialState, action);
        expect(state).toEqual(initialState);
    });
});
