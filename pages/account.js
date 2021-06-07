import React, { useState, useEffect } from "react";
import { Icon, Tab } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getMeApi } from "../api/user";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm/AddressForm";
import ListAddress from "../components/Account/ListAddress/ListAddress";
import { getCategoriesApi, getSubCategoriesApi } from '../api/categories';


export default function account({ categories, subCategories }) {
    const [user, setUser] = useState(undefined);
    const { auth, logout, setReloadUser } = useAuth();
    const router = useRouter();

    const panes = [
        { menuItem: 'Ajustes de cuenta', render: () => <Tab.Pane> <Configuration user={user} logout={logout} setReloadUser={setReloadUser} /> </Tab.Pane> },
        { menuItem: 'Dirreciones', render: () => <Tab.Pane> <Addresses /> </Tab.Pane> },
      ]

      const TabExampleBasic = () => <Tab panes={panes} />

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response || null);
        })()
    }, [auth]);

    //Si user es undefined es que no devuelve ningu usario(no logueado) y devuelve null para que no se renderize nada
    if (user === undefined) return null;

    //Comprueba user y auth para verificar que no se intenta entrar sin usuario logueado y te manda a la home
    if (!auth && !user) {
        router.replace("/")
        return null;
    }

    return (
        <BasicLayout className="account" categories={categories} subCategories={subCategories}>
            <TabExampleBasic>
            </TabExampleBasic>
        </BasicLayout>
    )
}

function Configuration(props){
    const { user, logout, setReloadUser } = props;

    return(
        <div className="account__configuration">
            <div className="data"> 
                <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />  
                <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser} />
                <ChangePasswordForm user={user} logout={logout} />
            </div>    
                      
        </div>
    );
}

function Addresses(){
    const [showModal, setshowModal] = useState(false);
    const [titleModal, settitleModal] = useState("");
    const [formModal, setformModal] = useState(null);
    const [reloadAddresses, setReloadAddresses] = useState(false);

    const openModal = (title, address) => {
        settitleModal(title);
        setformModal(<AddressForm setshowModal={setshowModal} setReloadAddresses={setReloadAddresses} newAddress={address ? false : true} address={address || null} />)
        setshowModal(true);
    }

    return (
        <div className="account_addresses">
            <div className="title">
                Dirreciones
                <Icon name="plus" link onClick={() => openModal("Nueva dirreción")} />
            </div>
            <div className="data">  
                <ListAddress reloadAddresses={reloadAddresses} setReloadAddresses={setReloadAddresses} openModal={openModal} />
            </div>

            <BasicModal show={showModal} setShow={setshowModal} title={titleModal} >
                {formModal}
            </BasicModal>
        </div>
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