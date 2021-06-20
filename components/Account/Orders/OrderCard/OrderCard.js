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
    const [showModal, setShowModal] = useState(false)

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

    if (!orderProduct) {
        return null;
    }

    return (
        <>
            <div className="order">
                <div className="order__info">
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
                            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
                        </div>
                </div>
            </div>
            <AddressModal showModal={showModal} setShowModal={setShowModal} addressShipping={addressShipping} title={orderProduct.title} />
        </>
    )
}

function AddressModal(props) {
    const { showModal, setShowModal, addressShipping, title } = props;

    return (
        <BasicModal show={showModal} setShow={setShowModal} size="tiny" title={title}>
            <h3>El pedido se ha enviado a la siguiente direccioón: </h3>
            <div>
                <p>{addressShipping.name}</p>
                <p>{addressShipping.address}</p>
                <p>
                    {addressShipping.state}, {addressShipping.city},
                    {addressShipping.postalCode}
                </p>  
                <p>{addressShipping.phone}</p>
            </div>
        </BasicModal>
    )
}