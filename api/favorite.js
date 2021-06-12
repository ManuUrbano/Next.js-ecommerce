import { size } from "lodash";
import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function isFavoriteApi(idUser, idProduct, logout) {
    try {
        const url = `${BASE_PATH}/favorites?users=${idUser}&product=${idProduct}`;
        return await authFetch(url, null, logout);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function AddFavoriteApi(idUser, idProduct, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idProduct, logout);
        if (size(dataFound) > 0 || !dataFound) {
            return "Este juego ya lo tienes en tu lista de favoritos"
        } else {
            const url = `${BASE_PATH}/favorites`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ users: idUser, product: idProduct })
            };
            const result = authFetch(url, params, logout);
            return result;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function DeleteFavoriteApi(idUser, idProduct, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idProduct, logout);
        if (size(dataFound) > 0) {
            const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const result = authFetch(url, params, logout);
            return result;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function GetFavoriteApi(idUser, logout) {
    try {
        const url = `${BASE_PATH}/favorites?users=${idUser}`;
        const result = authFetch(url, null, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}