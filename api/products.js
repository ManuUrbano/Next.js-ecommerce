import { BASE_PATH } from "../utils/constants";

//Metodo para conseguir todos los productos
export async function getProductsApi(){
    try {
        const url = `${BASE_PATH}/products?`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Metodos para conseguir los productos en orden descendente
export async function getLastProductsApi(limit){
    try {
        const limitItems = `_limit=${limit}`
        const sortItem = `_sort=createdAt:desc`
        const url = `${BASE_PATH}/products?${limitItems}&${sortItem}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Conseguir productos por subcategorias
export async function getProductsCategoryApi(category, limit, start){
    try {
        const limitItems = `_limit=${limit}`
        const sortItem = `_sort=createdAt:desc`
        const startItems = `_start=${start}`
        const url = `${BASE_PATH}/products?sub_category.url=${category}&${limitItems}&${sortItem}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Conseguir productos por categorias
export async function getProductsHomeCategoryApi(category, limit, start){
    try {
        const limitItems = `_limit=${limit}`
        const sortItem = `_sort=createdAt:desc`
        const startItems = `_start=${start}`
        const url = `${BASE_PATH}/products?category.url=${category}&${limitItems}&${sortItem}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Meotodo para conseguir productos por la URL
export async function getProductsByUrl(path){
    try {
        const url = `${BASE_PATH}/products?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Meotod para buscar por el titulo
export async function searchProductsApi(title){
    try {
        const url = `${BASE_PATH}/products?_q=${title}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Metodo para conseguir por la id
export async function getProductsById(id){
    try {
        const url = `${BASE_PATH}/products?id=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function getTotalProductsCategories(categories){
    try {
        const url = `${BASE_PATH}/products/count?category.url=${categories}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}