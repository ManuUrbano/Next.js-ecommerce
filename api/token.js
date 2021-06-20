import {TOKEN} from "../utils/constants";
import jwtDecode from "jwt-decode";

//Guarda en localStorage el TOKEN 
export function setToken(token) {
    localStorage.setItem(TOKEN, token);
 }
//Devuelve el token
 export function getToken(){
     return localStorage.getItem(TOKEN);
 }
 //Remueve el token
 export function removeToken(){
    return localStorage.removeItem(TOKEN);
}
//Expira ek token(sesion)
export function hasExpriredToken(token){
    const tokenDecode = jwtDecode(token);
    const expireDate = tokenDecode.exp * 1000;
    const currentData = new Date().getTime();
    //Compara la fecha actual con la fecha de expiracion del token
    if(currentData > expireDate){
        return true;
    }else{
        return false;
    }
}