import React, { useState, useEffect } from 'react';
import { Loader, Divider } from "semantic-ui-react"
import { size } from 'lodash';
import BasicLayout from "../layouts/BasicLayout";
import { getLastProductsApi } from '../api/products';
import ListProducts from '../components/ListProducts';
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';



export default function Home({ categories, subCategories }) {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(15);
      if (size(response) > 0) setProducts(response);
      else setProducts([]);
    })()
  }, [])

  return (
    <BasicLayout className="home" categories={categories} subCategories={subCategories} >
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

export async function getServerSideProps() {
  const categories = await getCategoriesApi();
  const subCategories = await getSubCategoriesApi();

  return {
    props: {
      categories,
      subCategories
    }
  }

}

