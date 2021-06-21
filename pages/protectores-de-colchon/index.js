import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import BasicLayout from "../../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../../api/categories';
import { getProductsHomeCategoryApi } from '../../api/products';
import ListProducts from '../../components/ListProducts/ListProducts';
import Seo from "../../components/Seo";

const limirPerPage = 10;

export default function Colchones({ categories, subCategories }) {
    const [products, setProducts] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        (async () => {
            const response = await getProductsHomeCategoryApi("protectores-de-colchon",limirPerPage,0);;
            console.log(response);
            if (size(response) > 0) setProducts(response);
            else setProducts([]);
        })()
    }, [query])

    return (
        <BasicLayout className="colchones" categories={categories} subCategories={subCategories} >
            <Seo title="Colchones" />
            {!products && <Loader active>Cargando Productos!</Loader>}
            {products && size(products) === 0 && (
                <div>
                    <h3>No hay productos!</h3>
                </div>
            )}
            {size(products) > 0 && <ListProducts products={products} />}
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