import React, { useState, useEffect } from 'react';
import { Loader, Divider } from "semantic-ui-react"
import { size } from 'lodash';
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getLastProductsApi, getTotalProductsCategories } from '../api/products';
import ListProducts from '../components/ListProducts';
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import Seo from "../components/Seo";

export default function Home({ categories, subCategories }) {
  const { query } = useRouter(null);
  const [products, setProducts] = useState(null)


  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(6);
      if (size(response) > 0) setProducts(response);
      else setProducts([]);
    })()
  }, [])


  return (
    <BasicLayout className="home" categories={categories} subCategories={subCategories} >
      <Seo /> 
      {!products && <Loader active>Cargando los productos!</Loader>}
      {products && products === 0 && (
        <div>
          <h3>Sin productos.</h3>
        </div>
      )}

      {size(products) > 0 && (
        <div className="info_novedades">
          <Divider horizontal><p>Últimas Novedades</p></Divider>
          <ListProducts products={products} />
        </div>)}

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

