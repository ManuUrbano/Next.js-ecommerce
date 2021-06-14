import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";

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