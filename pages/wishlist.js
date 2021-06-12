import React, { useState, useEffect } from 'react'
import { forEach, size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import BasicLayout from "../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import { GetFavoriteApi } from '../api/favorite';
import useAuth from "../hooks/useAuth";
import ListProducts from "../components/ListProducts";



export default function wishlist({ categories, subCategories }) {
    const [products, setProducts] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await GetFavoriteApi(auth.idUser, logout);
            console.log(response);
            if(size(response) > 0) {
                const productList = [];
                forEach(response, (data) => {
                    productList.push(data.product)
                });
                setProducts(productList);
            }else{
                setProducts([]);
            }
        })();
    }, [])



    return (
        <BasicLayout className="wishlist" categories={categories} subCategories={subCategories}>
            <div className="wishlist__block">
                <div className="title">Productos deseados!</div>

                <div className="data">
                    {!products && <Loader active>Cargando Productos!</Loader>}
                    {products && size(products) === 0 && (
                        <div className="data__not-found">
                            <h3>No tienen ningún articulo en favortios!</h3>
                        </div>
                    )}
                    {size(products) > 0 && <ListProducts products={products} />}
                </div>
            </div>
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