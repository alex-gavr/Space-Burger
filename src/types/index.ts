import store from "../services/store";
import { IIngredientsState, IDetailsState, IBurgerConstructorState, IOrderDetailsState, IUserState, IModalState } from "./store-states";


export type AppDispatch = typeof store.dispatch;
export type RootState = {
    ingredients: IIngredientsState;
    details: IDetailsState;
    burgerConstructor: IBurgerConstructorState;
    orderDetails: IOrderDetailsState,
    user: IUserState;
    modal:  IModalState;
};