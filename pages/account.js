import React, { useState, useEffect } from "react";
import { Tab } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import { getOrdersApi } from "../api/order";
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';
import { getProductsById } from '../api/products';
import OrdersTab from "../components/Account/Orders/OrdersTab";
import ConfigTab from "../components/Account/Configuration/ConfigTab";
import AddressesTab from "../components/Account/Addresses/AddressesTab/AddressesTab";

export default function account({ categories, subCategories }) {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const [ordersData, setOrdersData] = useState(null);
  
    const [activeIndex, setActiveIndex] = useState(0)
    const router = useRouter();
    const arrayProducts = [];
    console.log(arrayProducts);

    const panes = [
        { menuItem: 'Ajustes de cuenta', render: () => <Tab.Pane> <ConfigTab user={user} logout={logout} setReloadUser={setReloadUser} /> </Tab.Pane> },
        { menuItem: 'Dirreciones', render: () => <Tab.Pane> <AddressesTab /> </Tab.Pane> },
        { menuItem: 'Pedidos', render: () => <Tab.Pane> <OrdersTab ordersData={ordersData}/> </Tab.Pane> },
    ]

    const TabExampleBasic = () => <Tab panes={panes} defaultActiveIndex={activeIndex} />

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null);
        })()
    }, [auth]);

    useEffect(() => {
        (() => {
            const { setTab } = router.query;
            setActiveIndex(setTab);
        })()
    }, [router.query]);

    useEffect(() => {
        (async () => {
            const response = await getOrdersApi(auth.idUser, logout)
            setOrdersData(response);
        })()
    }, [])

    //Si user es undefined es que no devuelve ningu usario(no logueado) y devuelve null para que no se renderize nada
    if (user === undefined) return null;

    //Comprueba user y auth para verificar que no se intenta entrar sin usuario logueado y te manda a la home
    if (!auth && !user) {
        router.replace("/")
        return null;
    }

    return (
        <BasicLayout className="account" categories={categories} subCategories={subCategories}>
            <TabExampleBasic />
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