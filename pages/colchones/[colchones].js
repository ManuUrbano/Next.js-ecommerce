import React from 'react';
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";
import { getCategoriesApi, getSubCategoriesApi } from '../../api/categories';

export default function Colchones() {
    const { query } = useRouter();

    return (
        <BasicLayout className="colchones" categories={categories} subCategories={subCategories} >
            <h1>Estamos en colchones: {query.colchones}</h1>
        </BasicLayout>
    )
}

export async function getStaticProps(){
    const categories = await getCategoriesApi();
    const subCategories = await getSubCategoriesApi();
  
    return {
        props: {
            categories,
            subCategories
        }
    }
  
  }