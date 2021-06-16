import React, { useState, useEffect } from 'react'
import { Grid} from 'semantic-ui-react';
import { map, size } from "lodash";
import { getOrdersApi } from '../../../../api/order'
import useAuth from "../../../../hooks/useAuth";

export default function OrdersTab() {
    const [orders, setOrders] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getOrdersApi(auth.idUser, logout)
            setOrders(response || []);
        })()
    }, [])

    return (
        <div className="orders__block">
            <div className="title">Pedidos</div>
            <div>
                {size(orders) === 0 ? (
                    <h2 style={{ textAling: "center" }}>Todavía nos realizado ningún pedido</h2>
                ) : <OrderList orders={orders}/>}
            </div>
        </div>
    )
}

function OrderList({ orders }){
    return (
       <Grid>
           {map(orders, (order) => (
               <Grid.Column mobile={16} tablet={6} computer={8} key={order.id}>
                   <h2>Pedido</h2>
               </Grid.Column>
           ))}
       </Grid>
    )
}