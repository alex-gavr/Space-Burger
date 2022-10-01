import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from './ingredients-slice';
import ingredientDetailsReducer from './ingredient-details-slice';
import constructorReducer from './constructor-slice';
import orderDetailsReducer from './order-details-slice';


export default configureStore({
    reducer:{
        ingredients: ingredientsReducer,
        details: ingredientDetailsReducer,
        burgerConstructor: constructorReducer,
        orderDetails: orderDetailsReducer,
    },
});