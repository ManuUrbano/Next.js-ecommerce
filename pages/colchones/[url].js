import React from 'react';
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../../api/categories';
import { getProductsCategoryApi } from '../../api/products';
import ListProducts from '../../components/ListProducts/ListProducts';
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';

const limirPerPage = 10;

export default function Colchones({ categories, subCategories, products }) {
    const { query } = useRouter();

    console.log(query);
    console.log(products);

    return (
        <BasicLayout className="colchones" categories={categories} subCategories={subCategories} >
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

export async function getServerSideProps({query}) {
    const categories = await getCategoriesApi();
    const subCategories = await getSubCategoriesApi();
    const products = await getProductsCategoryApi(query.url,limirPerPage,0);

    return {
        props: {
            categories,
            subCategories,
            products
        }
    }

}

