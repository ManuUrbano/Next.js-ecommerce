import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";

export function getProductsCart(){
    const cart = localStorage.getItem(CART);
    
    if(!cart) {
        return null;
    } else {
        const products = cart.split(",");
        return products;
    }

}

export function addProductCart(product){
    const cart = getProductsCart();

    if(!cart) {
        localStorage.setItem(CART, product);
        toast.success("Producto añadido al carrito")
    }else{
        const productFound = includes(cart, product);
        console.log(productFound);
        if (productFound) {
            toast.warning("Este producta ya esta en el carrito");
        }else {
            cart.push(product)
            localStorage.setItem(CART, cart);
            toast.success("Producto añadido correctamente");
        }
    }

}

export function countProductsCart(){
    const cart = getProductsCart();

    if(!cart) {
        return 0;
    } else {
        return size(cart);
    }
}