
import { checkResponse } from "./checkResponse";
export const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
};