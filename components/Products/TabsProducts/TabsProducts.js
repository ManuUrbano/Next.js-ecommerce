import React from 'react'
import { Tab } from 'semantic-ui-react';
import ListProducts from '../../ListProducts';

export default function TabsProducts(props) {
    const { products } = props;

    const panes = [
        {
            menuItem: "Prudctos relacionados",
            render: () => (
                <Tab.Pane>
                    <ListProducts products={products}/>
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab className="tabs-product" panes={panes} />
    )
}
