import React, { useState, useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token";
import { getProductsCart, addProductCart, countProductsCart, removeProductCart } from "../api/cart";
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser])

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth])

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }

  const logout = () => {
    if (auth) {
      removeToken()
      setAuth(null);
      router.push("/");
    }
  }

  const addProduct = (title, url, image, medida, id, price) => {
    const token = getToken();
    if (token) {
      addProductCart(title, url, image, medida, id, price);
      setReloadCart(true);
    } else {
      toast.warning("Pirmero debes de estar logueado!")
    }
  }

  const removeProduct = (product) => {
    removeProductCart(product)
    setReloadCart(true);
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (title, url, image, medida, id, price) => addProduct(title, url, image, medida, id, price),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: () => null,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
