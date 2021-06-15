import React, { useState, useEffect } from 'react'
import { forEach, map } from 'lodash';
import { Table, Image, Icon } from 'semantic-ui-react'
import useCart from "../../../hooks/useCart";


export default function SummaryCart({ reloadCart, setReloadCart}) {
    const [totalPrice, setTotalPrice] = useState(0)
    const { getProductsCart, removeProductCart } = useCart();
    const proLocal = JSON.parse(getProductsCart());

    useEffect(() => {
        let price = 0;
        forEach(proLocal, (product) =>{
            price += parseInt(product.price)
        })
        setTotalPrice(price);
    }, [reloadCart])

    const removeProduct = (product) => {
        removeProductCart(product);
        setReloadCart(true);
    }

    return (
        <div className="summary-cart">
            <div className="title">Resumen</div>

            <div className="data">
                <Table celled structured>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Producto</Table.HeaderCell>
                            <Table.HeaderCell>Medida</Table.HeaderCell>
                            <Table.HeaderCell>Precio</Table.HeaderCell>
                            <Table.HeaderCell>Entrega</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {proLocal && proLocal.map(pr => (
                            <Table.Row key={Math.random(pr.id)} className="summary-cart__product" >
                                <Table.Cell>
                                    <Icon name="close" link onClick={() => removeProduct(pr.id)} />
                                    <Image src={pr.image} alt={pr.title} />
                                    {pr.title}
                                </Table.Cell>

                                <Table.Cell>
                                    {pr.medida}
                                </Table.Cell>

                                <Table.Cell>
                                    {pr.price}€
                                </Table.Cell>

                                <Table.Cell>
                                    48/52 Hrs
                                </Table.Cell>

                            </Table.Row>
                        ))}
                        <Table.Row className="summary-cart__resume">
                            <Table.Cell className="clear" /> 
                            <Table.Cell colSpan="2">Total:</Table.Cell> 
                            <Table.Cell className="total-price">{totalPrice}€</Table.Cell> 
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}
