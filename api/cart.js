import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export function getProductsCart() {
    const cart = localStorage.getItem(CART);

    if (!cart) {
        return null;
    } else {
        return cart;
    }

}

export function addProductCart(title, url, image, medida, id, price) {
    let arrayCart = JSON.parse(localStorage.getItem(CART));
    console.log(arrayCart);
    const data = {
        "title": title,
        "url": url,
        "image": image,
        "medida": medida,
        "id": id,
        "price": price
       
    }

    if (arrayCart === null) {
        arrayCart = [];
        arrayCart.push(data);
        let arrayCartJSON = JSON.stringify(arrayCart);
        localStorage.setItem(CART, arrayCartJSON);
        toast.success("Producto añadido al carrito")
    } else {
        if (arrayCart.some(e => e.title === title && e.medida === medida)) {
            toast.warning("Este producta ya esta en el carrito");
        } else {
            arrayCart.push(data);
            let arrayCartJSON = JSON.stringify(arrayCart);
            localStorage.setItem(CART, arrayCartJSON);
            toast.success("Producto añadido correctamente");
        }
    }

}

export function countProductsCart() {
    const cart = JSON.parse(getProductsCart());
    if (!cart) {
        return 0;
    } else {
        const cartCount = Object.keys(cart).length; 
        return cartCount;
    }
}

export function removeProductCart(product){
    const cart = getProductsCart()
    const cartArray = JSON.parse(cart)

    remove(cartArray, (item) => {
        console.log(item);
        return item.id === product;
    })

    if(size(cartArray) > 0){
        localStorage.setItem(CART, JSON.stringify(cartArray))
    }else{
        localStorage.removeItem(CART)
    }
}

export async function paymentCartApi(token, products, idUser, address, logout){
    try {
        const addressShipping = address;
        delete addressShipping.user;
        delete addressShipping.createdAt;

        const url = `${BASE_PATH}/orders`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                products,
                idUser,
                addressShipping
            })
        }
        const result = await authFetch(url ,params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function removeAllProductsCart(){
    localStorage.removeItem(CART);
}