import React from 'react'
import { Icon, Grid, Item, Divider, Button } from 'semantic-ui-react';
import Link from "next/link";
import { map } from 'lodash';



export default function ListProducts(props) {
    const { products } = props;
    console.log(products);

    return (
        <div className="list-products">
            <Grid>
                <Grid.Row columns={2}>
                    {map(products, (product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </Grid.Row>
            </Grid>
        </div>

    )
}

function Product(props) {
    const { product } = props

    return (
        <Grid.Column>
            <Item.Group>
                <Item >

                    <Item.Image size='small' as='a' href={`/${product.url}`} src={product.image.url} alt={product.title} />

                    <Item.Content>
                        <Item.Header as='a' href={`/${product.url}`}>{product.title}</Item.Header>
                        <Item.Description>{product.shortSummary}</Item.Description>
                        <Item.Extra>
                            {product.discount ? (
                                <span className='discount'>{product.discount}% DESCUENTO!</span>
                            ) : (
                                ""
                            )}
                            <span className='price'>{product.price}€</span>
                            <Link href={`/${product.url}`} key={product.url} >
                                <Button primary >Comprar<Icon name='right chevron' />
                                </Button>
                            </Link>



                        </Item.Extra>
                    </Item.Content>

                </Item>
            </Item.Group>
        </Grid.Column>
    )
}