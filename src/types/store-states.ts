import { ILoadingAndError, IIngredient, IMainIngredients, IOrderDetails, IOrder } from './data';

export interface IIngredientsState extends ILoadingAndError{
    ingredients: Array<IIngredient>;
}
export interface IDetailsState {
    details: IIngredient | null;
}
export interface IBurgerConstructorState {
    bun: Array<IIngredient>;
    mainIngredients: Array<IMainIngredients>;
}

export interface IOrderDetailsState extends ILoadingAndError{
    orderDetails: IOrderDetails;
}

export interface IUserState{
    name: string,
    email: string,

    authorized: boolean | null,

    loginSuccess: boolean | null,
    logoutSuccess: boolean | null,

    accountCreated: boolean | null,
    accountExists: boolean | null,

    initPasswordReset: boolean | null,
    allowToGoToPasswordReset: boolean,
    passwordChanged: boolean | null,

    incorrectToken: boolean | null,
    tokenExpired: boolean | null,

    profileDataChanged: boolean | null,

    loading: boolean | null,
    error: boolean,
}

export interface IModalState {
    title: string;
    isModalOpen: boolean;
}

export interface IOrdersState{
    connectStatus: string;
    success: boolean | null;
    error: boolean | null;
    errorCode?: number | null;
    orders: Array<IOrder>;
    total: number;
    totalToday: number;
}

export interface IOrderDescriptionState{
    orderDescription: IOrder | null;
}