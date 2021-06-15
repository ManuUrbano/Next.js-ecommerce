import React, { useState, useEffect } from 'react'
import { map } from 'lodash';
import BasicLayout from "../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import { getProductsByUrl } from "../api/products";
import useCart from "../hooks/useCart";
import SummaryCart from '../components/Cart/SummaryCart/SummaryCart';
import AddressShiping from '../components/Cart/AddressShiping';
import Payment from '../components/Cart/Payment';

export default function Cart({ categories, subCategories }) {
    const { getProductsCart } = useCart();
    const products = getProductsCart();
    
    return !products ? <EmptyCart categories={categories} subCategories={subCategories} /> :
        <FullCart products={products} categories={categories} subCategories={subCategories} />

}

function EmptyCart({ categories, subCategories }) {
    return (
        <BasicLayout className="empty-cart" categories={categories} subCategories={subCategories}>
            <h2>No hay productos en el carrito.</h2>
        </BasicLayout>
    )
}

function FullCart({ categories, subCategories }) {
    const [productsData, setProductsData] = useState(null)
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null)
    

    return (
        <BasicLayout className="full-cart" categories={categories} subCategories={subCategories}>
            <SummaryCart reloadCart={reloadCart} setReloadCart={setReloadCart} />
            <AddressShiping setAddress={setAddress} />
            {address && <Payment products={productsData} address={address} />}
        </BasicLayout>
    )
}

export async function getStaticProps() {
    const categories = await getCategoriesApi();
    const subCategories = await getSubCategoriesApi();

    return {
        props: {
            categories,
            subCategories
        }
    }

}
