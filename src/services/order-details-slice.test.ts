import { IOrderDetailsState } from '../types/store-states';
import orderDetailsSlice, { deleteOrderDetails, fetchOrderDetails } from './order-details-slice';

const initialState: IOrderDetailsState = {
    orderDetails: {
        name: '',
        order: {
            number: 0,
        },
        success: null,
    },
    loading: null,
    error: false,
};

const dummyOrderDetails = {
    name: 'hello world',
    order: {
        number: 777,
    },
    success: true,
};

describe('Order Details Slice Tests', () => {
    // Test initial state
    test('should return the initial state of order details slice', () => {
        expect(orderDetailsSlice(undefined, { type: undefined })).toEqual(initialState);
    });
    // Test reset order details
    test('should set state to be equal to initial state', () => {
        const action = {
            type: deleteOrderDetails,
        };
        const state = orderDetailsSlice(initialState, action);
        expect(state).toEqual(initialState);
    });

    // Extra Reducers test
    // Pending asynchronous function
    test('should set loading true while action is pending', () => {
        const action = { type: fetchOrderDetails.pending };
        const state = orderDetailsSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true,
        });
    });
    // Fulfilled asynchronous function
    test('should set order details to payload when action is fulfilled', () => {
        const action = {
            type: fetchOrderDetails.fulfilled,
            payload: dummyOrderDetails,
        };
        const state = orderDetailsSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false,
            orderDetails: action.payload,
        });
    });
    // Rejected asynchronous function
    test('should set error true when action is rejected', () => {
        const action = { type: fetchOrderDetails.rejected };
        const state = orderDetailsSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: true,
        });
    });
});
