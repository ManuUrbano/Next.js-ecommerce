import React, { useState, useEffect } from 'react';
import { Loader, Divider } from "semantic-ui-react";
import { size } from 'lodash';
import { useRouter } from 'next/router';
import BasicLayout from "../layouts/BasicLayout";
import { searchProductsApi } from "../api/products";
import ListProducts from '../components/ListProducts';
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import Seo from "../components/Seo";


export default function search({ categories, subCategories }) {
    const [products, setProducts] = useState(null);
    const { query } = useRouter();
    console.log(products);
    
    useEffect(() => {
        document.getElementById("search-product").focus();
    }, [])

    useEffect(() => {
        (async () => {
            if(size(query.query) > 0){
                const response = await searchProductsApi(query.query);
                if(size(response) > 0) setProducts(response)
                else setProducts([]);
            }else { 
                setProducts([]);
            }
        })();
    }, [query])

    return (
        <div>
            <BasicLayout className="search" categories={categories} subCategories={subCategories}>
                <Seo title={`Buscando: ${query.query}`} />
                {!products && <Loader active>Buscando Resultados!</Loader>}
                {products && size(products) === 0 && (
                    <div>
                        <h3>No se han encontrado productos!</h3>
                    </div>
                )}
                {size(products) > 0 &&  <ListProducts products={products} />}
            </BasicLayout>
        </div>
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