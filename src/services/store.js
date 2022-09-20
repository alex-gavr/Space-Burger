import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from './ingredients-slice'
import ingredientDetailsReducer from './ingredient-details-slice'

export default configureStore({
    reducer:{
        ingredients: ingredientsReducer,
        details: ingredientDetailsReducer,
    }
});