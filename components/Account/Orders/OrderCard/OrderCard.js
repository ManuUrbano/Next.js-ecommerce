import React, { useState, useEffect } from 'react';
import { Image, Icon, Loader } from 'semantic-ui-react';
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from '../../../Modal/BasicModal';
import { getProductsById } from '../../../../api/products';
import { size } from 'lodash';

export default function OrderCard(props) {
    const { ord, productID } = props;
    const { totalPayment, products_details, createdAt, addressShipping } = ord;
    const [orderProduct, setOrderProduct] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await getProductsById(products_details.product);
            if (result) {
                setOrderProduct(result);
            } else {
                console.log("nope");
            }

        })()
    }, [])

    console.log(ord);

    return (
        <div className="order">
            <div className="order__info">
                {size(orderProduct) > 0 && (
                    <>
                        <div className="order__info-data">
                            <Link href={`/${orderProduct.url}`}>
                                <a>
                                    <Image src={orderProduct.image.url} alt={orderProduct.title} />
                                </a>
                            </Link>
                            <div>
                                <h2>{orderProduct.title}</h2>
                                <p>{totalPayment} €</p>
                            </div>
                        </div>
                        <div className="order__other">
                            <p className="order__other-date">
                                {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
                            </p>
                            <Icon name="eye" circular link />
                        </div>
                    </>
                )}
            </div>
        </div>

    )
}
