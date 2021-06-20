import React from 'react'
import { Grid } from 'semantic-ui-react';
import { map } from "lodash";
import OrderCard from '../OrderCard';

export default function OrderList(props) {
    const { ordersData } = props;

    return (
        <Grid>
            {map(ordersData, (ord) => (
                <Grid.Column mobile={16} tablet={8} computer={8} key={ord.id}>
                    <OrderCard ord={ord} />
                </Grid.Column>
            ))}
        </Grid>
    )
}