import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { size } from 'lodash';
import BasicLayout from "../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import { getProductsByUrl, getLastProductsApi } from '../api/products';
import HeaderProduct from '../components/Products/HeaderProduct';
import TabsProducts from '../components/Products/TabsProducts';
import Seo from "../components/Seo";


export default function Product({ categories, subCategories, product }) {
    const { query } = useRouter(null);
    const [products, setProducts] = useState(null)

    useEffect(() => {
        (async () => {
          const response = await getLastProductsApi(4);
          if (size(response) > 0) setProducts(response);
          else setProducts([]);
        })()
      }, [])

      

    return (
        <BasicLayout className="product"  categories={categories} subCategories={subCategories}>
            <Seo title={product.title} />
            <HeaderProduct product={product}/>
            <TabsProducts products={products}/>
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

