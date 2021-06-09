import React from 'react'
import { Tab } from 'semantic-ui-react';

export default function TabsProducts(props) {
    const { product } = props;

    const panes = [
        {
            menuItem: "Información",
            render: () => (
                <Tab.Pane>
                    <h1>Info</h1>
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab className="tabs-product" panes={panes} />
    )
}
