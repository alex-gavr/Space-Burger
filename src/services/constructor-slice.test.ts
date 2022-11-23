import { IBurgerConstructorState } from '../types/store-states';
import { dummyIngredientBun, dummyIngredientBun2, dummyIngredientMain, dummyIngredientSauce } from '../utils/dummy-ingredient';
import constructorSlice, { addIngredient, deleteIngredient, emptyConstructor, reorder } from './constructor-slice';

const initialState: IBurgerConstructorState = {
    bun: [],
    mainIngredients: [],
};
const stateWithBun: IBurgerConstructorState = {
    bun: [dummyIngredientBun],
    mainIngredients: [],
};
const stateWithMainIngredient: IBurgerConstructorState = {
    bun: [],
    mainIngredients: [dummyIngredientMain],
};
const stateWithManyMainIngredient: IBurgerConstructorState = {
    bun: [],
    mainIngredients: [dummyIngredientMain, dummyIngredientSauce],
};
const stateWithMainIngredientAndBun: IBurgerConstructorState = {
    bun: [dummyIngredientBun],
    mainIngredients: [dummyIngredientMain, dummyIngredientSauce],
};

describe('Constructor Slice Tests', () => {
    // Test initial state
    test('should return the initial state of constructor slice', () => {
        expect(constructorSlice(undefined, { type: undefined })).toEqual(initialState);
    });
    // ADD INGREDIENT TEST 1
    test('should add bun to state', () => {
        const action = {
            type: addIngredient,
            payload: dummyIngredientBun,
        };
        const state = constructorSlice(initialState, action);
        expect(state).toEqual({
            bun: [dummyIngredientBun],
            mainIngredients: [],
        });
    });
    // ADD INGREDIENT TEST 2
    test('should change existing bun to a new one', () => {
        const action = {
            type: addIngredient,
            payload: dummyIngredientBun2,
        };
        const state = constructorSlice(stateWithBun, action);
        expect(state).toEqual({
            bun: [dummyIngredientBun2],
            mainIngredients: [],
        });
    });
    // ADD INGREDIENT TEST 3
    test('should add main ingredient to state', () => {
        const action = {
            type: addIngredient,
            payload: dummyIngredientMain,
        };
        const state = constructorSlice(initialState, action);
        expect(state).toEqual({
            bun: [],
            mainIngredients: [dummyIngredientMain],
        });
    });
    // ADD INGREDIENT TEST 4
    test('should add another main ingredient to state with existing main ingredients', () => {
        const action = {
            type: addIngredient,
            payload: dummyIngredientSauce,
        };
        const state = constructorSlice(stateWithMainIngredient, action);
        expect(state).toEqual({
            bun: [],
            mainIngredients: [dummyIngredientMain, dummyIngredientSauce],
        });
    });
    // DELETE MAIN INGREDIENT TEST
    test('should delete main ingredient from state', () => {
        const action = {
            type: deleteIngredient,
            payload: dummyIngredientMain,
        };
        const state = constructorSlice(stateWithMainIngredient, action);
        expect(state).toEqual({
            bun: [],
            mainIngredients: [],
        });
    });
    // REORDER TEST
    test('should reorder main ingredient in state', () => {
        const action = {
            type: reorder,
            payload: [0, 1],
        };
        const state = constructorSlice(stateWithManyMainIngredient, action);
        expect(state).toEqual({
            bun: [],
            mainIngredients: [dummyIngredientSauce, dummyIngredientMain],
        });
    });
    // EMPTY CONSTRUCTOR TEST
    test('should delete all ingredients from constructor state', () => {
        const action = {
            type: emptyConstructor,
        };
        const state = constructorSlice(stateWithMainIngredientAndBun, action);
        expect(state).toEqual(initialState);
    });
});
