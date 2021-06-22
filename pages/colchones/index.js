import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Loader } from 'semantic-ui-react';
import { size } from 'lodash';
import BasicLayout from "../../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../../api/categories';
import { getProductsHomeCategoryApi, getTotalProductsCategories } from '../../api/products';
import ListProducts from '../../components/ListProducts/ListProducts';
import Seo from "../../components/Seo";
import Pagination from '../../components/Pagination';

const limirPerPage = 6;

export default function Colchones({ categories, subCategories }) {
    const [products, setProducts] = useState(null);
    const { query } = useRouter();
    const [totalProducts, setTotalProducts] = useState(null)


    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if(!query.page || currentPages === 1) return 0;
        else return currentPages * limirPerPage - limirPerPage;
    }

    useEffect(() => {
        (async () => {
            const response = await getProductsHomeCategoryApi("colchones",limirPerPage,getStartItem());;
            console.log(response);
            if (size(response) > 0) setProducts(response);
            else setProducts([]);
        })()
    }, [query])

    useEffect(() => {
        (async () => {
            const response = await getTotalProductsCategories("colchones")
            setTotalProducts(response);
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

            {totalProducts ? <Pagination totalProducts={totalProducts}  page={query.page ? parseInt(query.page) : 1 } limirPerPage={limirPerPage} /> : null}
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