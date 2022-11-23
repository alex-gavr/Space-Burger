import userOrderHistory, { cameFromLinkUser, ORDERS_CONNECT_USER, ORDERS_DISCONNECT_USER, ORDERS_WS_CLOSE_USER, ORDERS_WS_ERROR_USER, ORDERS_WS_MESSAGE_USER, ORDERS_WS_OPEN_USER } from './user-order-history-slice';
import { IOrdersState } from '../types/store-states';

const initialState: IOrdersState = {
    status: '',
    connectionError: '',
    data: null,
    orders: [],
    fromLink: null,
};

const dummyMessageFromWS = {
    success: true,
    orders: [
        {
            ingredients: ['60d3463f7034a000269f45e7', '60d3463f7034a000269f45e9', '60d3463f7034a000269f45e8', '60d3463f7034a000269f45ea'],
            _id: '',
            status: 'done',
            number: 0,
            createdAt: '2021-06-23T14:43:22.587Z',
            updatedAt: '2021-06-23T14:43:22.603Z',
        },
    ],
    total: 1,
    totalToday: 1,
};

describe('Feed Order Slice Tests', () => {
    // Test initial state
    test('should return the initial state of ingredients slice', () => {
        expect(userOrderHistory(undefined, { type: undefined })).toEqual(initialState);
    });
    // Open WS connection
    test('should make status CONNECTING', () => {
        const action = {
            type: ORDERS_CONNECT_USER,
        };
        const state = userOrderHistory(initialState, action);
        expect(state).toEqual({
            ...initialState,
            status: 'CONNECTING',
        });
    });
    // Open WS connection
    test('should disconnect from WS', () => {
        const action = {
            type: ORDERS_DISCONNECT_USER,
        };
        const state = userOrderHistory(initialState, action);
        expect(state).toEqual({
            ...initialState,
            status: 'OFFLINE',
        });
    });
    // WS connection opened successfully
    test('should make status ONLINE', () => {
        const action = {
            type: ORDERS_WS_OPEN_USER,
        };
        const state = userOrderHistory(initialState, action);
        expect(state).toEqual({
            ...initialState,
            status: 'ONLINE',
        });
    });
    // WS connection disconnected successfully
    test('should make status OFFLINE', () => {
        const action = {
            type: ORDERS_WS_CLOSE_USER,
        };
        const state = userOrderHistory(initialState, action);
        expect(state).toEqual({
            ...initialState,
            status: 'OFFLINE',
        });
    });
    // WS Error
    test('should make status OFFLINE and display connectionError', () => {
        const action = {
            type: ORDERS_WS_ERROR_USER,
            payload: 'error',
        };
        const state = userOrderHistory(initialState, action);
        expect(state).toEqual({
            ...initialState,
            connectionError: 'error',
            status: 'OFFLINE',
        });
    });
    // WS Message
    test('should get data', () => {
        const action = {
            type: ORDERS_WS_MESSAGE_USER,
            payload: dummyMessageFromWS
        };
        const state = userOrderHistory(initialState, action);
        expect(state).toEqual({
            ...initialState,
            data: dummyMessageFromWS,
            orders: dummyMessageFromWS.orders,
        });
    });
    // If Order Details is opened from Link
    test('should change fromLink', () => {
        const action = {
            type: cameFromLinkUser,
            payload: true
        };
        const state = userOrderHistory(initialState, action);
        expect(state).toEqual({
            ...initialState,
            fromLink: true
        });
    });
});
