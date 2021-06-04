import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Dropdown } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";
import { getCategoriesApi, getSubCategoriesApi } from "../../../api/categories";


export default function MenuWeb({categories, subCategories}) {
    /* const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]) */
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("Iniciar sesión");
    const [user, setUser] = useState(undefined);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response);
        })()
    }, [auth])

    /*  useEffect(() => {
         (async () => {
             const response = await getCategoriesApi();
             const response2 = await getSubCategoriesApi();
             setCategories(response || []);
             setSubCategories(response2 || []);
         })()
     }, []) */

    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" width={10}>
                        <MenuCategories categories={categories} subCategories={subCategories} />
                    </Grid.Column>
                    <Grid.Column className="menu__right" width={5}>
                        {user !== undefined && <MenuOptions onShowModal={onShowModal} user={user} logout={logout} />}
                    </Grid.Column>
                </Grid>
            </Container>

            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} >
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
            </BasicModal>
        </div>
    )
}

function MenuCategories({categories, subCategories}) {
    /* console.log(value);
    console.log(categories);
    console.log(notFound); */
    return (
        <Menu>
            {map(categories, (categories) => (

                <Dropdown item text={categories.title} key={categories._id}>
                    <Dropdown.Menu>
                        {map(subCategories, (subCategories) => (
                            subCategories.category._id == categories._id ?
                                <Link href={`/${categories.url}/${subCategories.url}`} key={subCategories._id} >
                                    <Dropdown.Item as="a">{subCategories.title}</Dropdown.Item>
                                </Link>
                                : ""
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            ))}
        </Menu>
    )
}


function MenuOptions(props) {
    const { onShowModal, user, logout } = props;

    return (
        /* Preguntamos si existe usuario para mostrar un menu u otro */
        <Menu>
            {user ? (
                <>
                    <Dropdown item text={user.name} >
                        <Dropdown.Menu>
                            <Dropdown.Item text='Edit Profile' text="Mi Cuenta" href="/account" />
                            <Dropdown.Item text='Edit Profile' text="Mis Pedidos" href="/orders" />
                            <Dropdown.Item text='Edit Profile' text="Favoritos" href="/wishlist" />
                            <Dropdown.Divider />
                            <Dropdown.Item text='Edit Profile' icon="cart" text="Carrito" href="/cart" />
                            <Dropdown.Item text='Edit Profile' icon="power off" text="Cerrar sesión" onClick={logout} />
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            ) : (
                <Menu.Item onClick={onShowModal}>
                    <Icon name="sign-in" /> Iniciar sesión
                </Menu.Item>
            )}

        </Menu>

    )
}
