import React, { useState, useEffect } from 'react'
import { Button, Grid, Icon, Dropdown } from 'semantic-ui-react';
import { size, map } from 'lodash';
import CarouselScreenshots from '../CarouselScreenshots/CarouselScreenshots';
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { isFavoriteApi, AddFavoriteApi, DeleteFavoriteApi } from "../../../api/favorite";



export default function HeaderProduct(props) {
    const { product } = props;
    const { image, title, photos } = product;

    return (
        <Grid className="header-product">
            <Grid.Column mobile={16} tablet={6} computer={5} >
                <CarouselScreenshots product={product} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11} >
                <Info product={product} />
            </Grid.Column>

        </Grid>
    )
}


function Info(props) {
    const { product } = props;
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavories, setReloadFavories] = useState(false);
    const { auth, logout } = useAuth();
    const { addProductCart } = useCart();
    const [medida, setMedida] = useState("");
    console.log(product);

    const arrayOpciones = [];

    map(product.products_details, (detail) => (
        arrayOpciones.push({
            value: detail.size,
            text: detail.size,
            key: detail._id,
            price: detail.price,
            discount: detail.Discount
        })
    ))


    console.log(arrayOpciones);

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth.idUser, product.id, logout);
            if (size(response) > 0) setIsFavorite(true);
            else setIsFavorite(false);
        })()
        setReloadFavories(false);
    }, [product, reloadFavories])

    const addFavorites = async () => {
        if (auth) {
            await AddFavoriteApi(auth.idUser, product.id, logout)
            setReloadFavories(true);
        }
    }

    const deleteFavorites = async () => {
        if (auth) {
            await DeleteFavoriteApi(auth.idUser, product.id, logout)
            setReloadFavories(true);
        }
    }

    return (
        <>
            <div className="header-product__title">
                {product.title}
                <Icon name={isFavorite ? "heart" : "heart outline"} className={classNames({
                    like: isFavorite,
                })} link onClick={isFavorite ? deleteFavorites : addFavorites} />
            </div>
            <div className="header-product__delivery">
                Entrega en 48/72h
            </div>
            <div className="header-product__sumary" dangerouslySetInnerHTML={{ __html: product.summary }} />
            <div className="header-product__buy">
                <div className="header-product__buy-price">
                    <Dropdown placeholder="Selecciona una medida" fluid search selection options={arrayOpciones} onChange={(_, data) => setMedida(data.value)} />
                    <div className="header-product__buy-price-actions">
                        {arrayOpciones.map((opc, index) => {

                            if (opc.value === medida && opc.discount != undefined) {
                                return (
                                    <>
                                        <p> {opc.price}€ </p>
                                           <h3>{opc.discount}%</h3> 
                                            <p>{(opc.price - Math.floor(opc.price * opc.discount) / 100).toFixed(2)}€</p>
                                    </>
                                )
                            }

                            if (opc.value === medida) {
                                return <p>{opc.price}€</p>
                            }
                        })}

                        {/* {(() => {
                            {map(arrayOpciones, (opc) => (
                                return opc.value && (<p>sda</p>)
                            ))}
                        })} */}

                        {/* <p>{product.discount}%</p>
                        <p>{(product.products_details[0].price - Math.floor(product.products_details[0].price * product.discount) / 100).toFixed(2)}€</p> */}
                    </div>
                </div>
                <Button className="header-product__buy-btn" onClick={() => addProductCart(product.url)} >Comprar</Button>
            </div>
        </>
    )
}
