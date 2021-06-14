import React, { useState, useEffect } from 'react'
import BasicLayout from "../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import { getProductsByUrl } from "../api/products";
import useCart from "../hooks/useCart";
import SummaryCart from '../components/Cart/SummaryCart/SummaryCart';
import { map } from 'lodash';

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

function FullCart({ categories, subCategories, products }) {
    const [productsData, setProductsData] = useState(null)
    const [size, setSize] = useState(null)
    const productsArray = JSON.parse(products);

    useEffect(() => {
        (async () => {
            const productsUrlTemp = [];
            const productsSizeTemp = [];
            const productsTemp = [];
            const productsSize = [];

            //Funcion map para meter en cada array su propiedad correspondiente
            map( productsArray,(product) => {
                productsUrlTemp.push(product.product)
                productsSizeTemp.push(product.size)
            })

            for await (const product of productsUrlTemp) {
                const data = await getProductsByUrl(product);
                productsTemp.push(data);
            }

            for (const size of productsSizeTemp) {
                productsSize.push(size)
            }

            setSize(productsSize);
            setProductsData(productsTemp);
        })()
    }, [])

    return (
        <BasicLayout className="full-cart" categories={categories} subCategories={subCategories}>
            <SummaryCart products={productsData} />
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
