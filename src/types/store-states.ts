import { ILoadingAndError, IIngredient, IMainIngredients, IOrderDetails } from './data';

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