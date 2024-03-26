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
  name: string;
  order: { number: number };
  success: boolean | null;
}

//  ACTIVE STATE OF NAV REACT ROUTER
export interface INavData {
  isActive: boolean;
  isPending: boolean;
}

export interface IOrder {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IOrders {
  success: boolean | null;
  orders: Array<IOrder>;
  total: number;
  totalToday: number;
}

export interface IOrderWithData {
  id: string;
  name: string;
  image: string;
  price: number;
}
export interface IOrderDetailsAdjustedForModal extends IOrderWithData {
  timesRepeated: number;
}
