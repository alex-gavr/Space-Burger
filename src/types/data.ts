interface ILoadingAndError {
    loading: boolean | null;
    error: boolean;
}

export interface IIngredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
}

export interface IMainIngredients extends IIngredient {
    uuid: string;
}

export interface IIngredientsState extends ILoadingAndError{
    ingredients: Array<IIngredient>;
}
export interface IDetailsState {
    details: IIngredient | undefined;
}
export interface IBurgerConstructorState {
    bun: Array<IIngredient>;
    mainIngredients: Array<IMainIngredients>;
}

interface IOrderDetails {
    name: string ;
    order: {number: number} ;
    success: boolean | null;
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
