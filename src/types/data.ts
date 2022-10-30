interface ILoadingAndError {
    loading: boolean | null;
    error: boolean;
}

export interface IIngredient {
    calories: number | undefined;
    carbohydrates: number | undefined;
    fat: number | undefined;
    image: string | undefined;
    image_large: string | undefined;
    image_mobile: string | undefined;
    name: string | undefined;
    price: number | undefined;
    proteins: number | undefined;
    type: string | undefined;
    __v: number | undefined;
    _id: string | undefined;
}

export interface IIngredientsState extends ILoadingAndError{
    ingredients: Array<IIngredient>;
}
export interface IDetailsState {
    details: IIngredient | undefined;
}
export interface IBurgerConstructorState {
    bun: Array<IIngredient>;
    mainIngredients: Array<IIngredient>;
}

export interface IOrderDetailsState extends ILoadingAndError{
    orderDetails: Array<IIngredient> | undefined;
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
