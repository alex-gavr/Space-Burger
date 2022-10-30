export interface ILoadingAndError {
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
export interface IOrderDetails {
    name: string ;
    order: {number: number} ;
    success: boolean | null;
}

//  ACTIVE STATE OF NAV REACT ROUTER
export interface INavData {
    isActive: boolean;
    isPending: boolean;
};