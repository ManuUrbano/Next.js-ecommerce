import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_TOKEN } from '../../../utils/constants';
import FormPayment from './FormPayment';

const stripePromise = loadStripe(STRIPE_TOKEN);

export default function Payment({ address, products }) {
    const productsJson = JSON.parse(products);

    return (
        <div className="payment">
            <div className="title">Pago</div>
            <div className="data">
                <Elements stripe={stripePromise}>
                    <FormPayment address={address} products={productsJson} />
                </Elements>
            </div>
        </div>
    )
}
