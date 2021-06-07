import React from 'react'
import { Button, Grid, Icon, Image } from 'semantic-ui-react';

export default function HeaderProduct(props) {
    const { product } = props;
    const { image, title } = product;
    console.log(product);

    return (
        <Grid className="header-product">
            <Grid.Column mobile={16} tablet={6} computer={5} >
                <Image src={image.url} alt={title} fluid />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11} >
                <Info product={product} />
            </Grid.Column>

        </Grid>
    )
}

function Info(props) {
    const { product } = props;
    const { title, summary, price, discount } = product;

    return (
        <>
            <div className="header-product__title">
                {title}
                <Icon name="heart outline" />
            </div>
            <div className="header-product__delivery">
                Entrega en 48/72h
            </div>
            <div className="header-product__sumary" dangerouslySetInnerHTML={{__html: summary}} />
            <div className="header-product__buy">
                <div className="header-product__buy-price">
                    <p>Precio: {price}€ </p>
                    <div className="header-product__buy-price-actions">
                        <p>{discount}%</p>
                        <p>{price - Math.floor(price * discount) / 100}€</p>
                    </div>
                </div>
                <Button className="header-product__buy-btn">Comprar</Button>
            </div>
        </>
    )
}
