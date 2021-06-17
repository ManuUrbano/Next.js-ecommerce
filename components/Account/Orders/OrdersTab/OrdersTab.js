import React from 'react'
import { size } from "lodash";
import OrderList from '../OrderList';

export default function OrdersTab({ ordersData, orderProduct}) {
    return (
        <div className="orders__block">
            <div>
                {size(ordersData) === 0 ? (
                    <h2 style={{ textAling: "center" }}>Todavía no has realizado ningún pedido</h2>
                ) : <OrderList ordersData={ordersData} />}
            </div>
        </div>
    )
}

