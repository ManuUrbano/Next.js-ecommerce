import React, { useState, useEffect } from 'react'
import { map } from 'lodash';
import { Table, Image, Icon } from 'semantic-ui-react'
import useCart from "../../../hooks/useCart";


export default function SummaryCart({ products }) {
    const { getProductsCart } = useCart();
    const proLocal = JSON.parse(getProductsCart());

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
                                    <Icon name="close" link onClick={() => console.log("Borrar")} />
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

                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}
