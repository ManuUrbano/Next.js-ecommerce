import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function isFavoriteApi(idUser, idProduct, logout){
    try {
        const url = `${BASE_PATH}/favorites?users=${idUser}&product=${idProduct}`;
        return await authFetch(url, null, logout);
    } catch (error) {
        console.log(error);
        return null;
    }
}