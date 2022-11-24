
import { IOrderDescriptionState } from '../types/store-states';
import orderDescriptionSlice, { deleteOrderDescription, setOrderDescription, setOrderDescriptionLink } from './order-description-slice';

const initialState: IOrderDescriptionState = {
    orderDescription: null,
};

const dummyOrder = {
    ingredients: ['1111111','11111', '11111111'],
    _id: '2222222',
    status: 'ready',
    number: 1111111,
    createdAt: '23/11/2022',
    updatedAt: '23/11/2022',
    name: 'hello world',
}

describe('Order Description Slice Tests', () => {
    // Test initial state
    test('should return the initial state of order description slice', () => {
        expect(orderDescriptionSlice(undefined, { type: undefined })).toEqual(initialState);
    });
    // Test set Order Description
    test('should set order description', () => {
        const action = {
            type: setOrderDescription,
            payload: dummyOrder,
        };
        const state = orderDescriptionSlice(initialState, action);
        expect(state).toEqual({
            orderDescription: dummyOrder
        });
    });
    // Test set Order Description when visited from link
    test('should set order description when visited from link', () => {
        const action = {
            type: setOrderDescriptionLink,
            payload: dummyOrder,
        };
        const state = orderDescriptionSlice(initialState, action);
        expect(state).toEqual({
            orderDescription: dummyOrder
        });
    });
    // Test Reset Order Description
    test('should reset order description to null', () => {
        const action = {
            type: deleteOrderDescription,
        };
        const state = orderDescriptionSlice(initialState, action);
        expect(state).toEqual(initialState);
    });
});