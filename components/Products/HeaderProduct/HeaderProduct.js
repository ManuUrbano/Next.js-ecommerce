import React, { useState, useEffect } from 'react'
import { Button, Grid, Icon, Image } from 'semantic-ui-react';
import CarouselScreenshots from '../CarouselScreenshots/CarouselScreenshots';
import useAuth from "../../../hooks/useAuth";
import { isFavoriteApi } from "../../../api/favorite";

export default function HeaderProduct(props) {
    const { product } = props;
    const { image, title, photos } = product;


    return (
        <Grid className="header-product">
            <Grid.Column mobile={16} tablet={6} computer={5} >
{/*                 <Image src={image.url} alt={title} fluid />  */}
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
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth.idUser, product.id, logout);
            console.log(response);
        })()
    }, [])

    return (
        <>
            <div className="header-product__title">
                {product.title}
                <Icon name="heart outline" />
            </div>
            <div className="header-product__delivery">
                Entrega en 48/72h
            </div>
            <div className="header-product__sumary" dangerouslySetInnerHTML={{__html: product.summary}} />
            <div className="header-product__buy">
                <div className="header-product__buy-price">
                    <p>Precio: {product.price}€ </p>
                    <div className="header-product__buy-price-actions">
                        <p>{product.discount}%</p>
                        <p>{product.price - Math.floor(product.price * product.discount) / 100}€</p>
                    </div>
                </div>
                <Button className="header-product__buy-btn">Comprar</Button>
            </div>
        </>
    )
}
