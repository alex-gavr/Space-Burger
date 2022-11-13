import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import constructorReducer from './constructor-slice';
import orderDetailsReducer from './order-details-slice';
import userReducer from './user-slice';
import modalReducer from './modal-slice';
import feedOrdersReducer, {
    ORDERS_CONNECT,
    ORDERS_DISCONNECT,
    ORDERS_WS_CLOSE,
    ORDERS_WS_CONNECTING,
    ORDERS_WS_ERROR,
    ORDERS_WS_MESSAGE,
    ORDERS_WS_OPEN,
} from './feed-orders-slice';
import userOrderHistoryReducer, {
    ORDERS_CONNECT_USER,
    ORDERS_DISCONNECT_USER,
    ORDERS_WS_CLOSE_USER,
    ORDERS_WS_CONNECTING_USER,
    ORDERS_WS_ERROR_USER,
    ORDERS_WS_MESSAGE_USER,
    ORDERS_WS_OPEN_USER,
} from './user-order-history-slice';
import orderDescriptionReducer from './order-description-slice';
import { socketMiddleware } from './middleware/socket-middleware';


const ordersWsActions = {
    wsConnect: ORDERS_CONNECT,
    wsDisconnect: ORDERS_DISCONNECT,
    wsConnecting: ORDERS_WS_CONNECTING,
    onOpen: ORDERS_WS_OPEN,
    onClose: ORDERS_WS_CLOSE,
    onError: ORDERS_WS_ERROR,
    onMessage: ORDERS_WS_MESSAGE,
};
const profileOrdersWsActions = {
    wsConnect: ORDERS_CONNECT_USER,
    wsDisconnect: ORDERS_DISCONNECT_USER,
    wsConnecting: ORDERS_WS_CONNECTING_USER,
    onOpen: ORDERS_WS_OPEN_USER,
    onClose: ORDERS_WS_CLOSE_USER,
    onError: ORDERS_WS_ERROR_USER,
    onMessage: ORDERS_WS_MESSAGE_USER,
};

const ordersWsMiddleware = socketMiddleware(ordersWsActions);
const profileWsMiddleware = socketMiddleware(profileOrdersWsActions);

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        details: ingredientDetailsReducer,
        burgerConstructor: constructorReducer,
        orderDetails: orderDetailsReducer,
        user: userReducer,
        modal: modalReducer,
        feedOrders: feedOrdersReducer,
        userOrderHistory: userOrderHistoryReducer,
        orderDescription: orderDescriptionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(ordersWsMiddleware, profileWsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
