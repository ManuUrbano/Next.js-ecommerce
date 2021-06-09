import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import { getProductsByUrl } from '../api/products';
import HeaderProduct from '../components/Products/HeaderProduct';
import TabsProducts from '../components/Products/TabsProducts';
import CarouselScreenshots from '../components/Products/CarouselScreenshots/CarouselScreenshots';


export default function Product({ categories, subCategories, product }) {
    const { query } = useRouter(null);

    return (
        <BasicLayout className="product"  categories={categories} subCategories={subCategories}>
            <HeaderProduct product={product}/>
            <TabsProducts product={product}/>
        </BasicLayout>
    )
}


export async function getServerSideProps({ query }) {
    const categories = await getCategoriesApi();
    const subCategories = await getSubCategoriesApi();
    const product = await getProductsByUrl(query.product);

    return {
        props: {
            categories,
            subCategories,
            product
        }
    }

}

