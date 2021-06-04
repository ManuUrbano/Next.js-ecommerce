import React, { useState, useEffect } from 'react'
import { DeleteAddressesApi, getAddressesApi } from '../../../api/address';
import useAuth from "../../../hooks/useAuth";
import { map, size } from 'lodash';
import { Button, Grid, Loader } from 'semantic-ui-react';

export default function ListAddress(props) {
    const { reloadAddresses, setReloadAddresses, openModal } = props;
    const { auth, logout } = useAuth();
    const [addresses, setaddresses] = useState(null);


    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout)
            setaddresses(response || {});
            setReloadAddresses(false);
        })()
    }, [reloadAddresses])

    /* if (!addresses) return null; */

    return (
        <div className="list-address">

            {addresses && addresses === 0 && (
                <h3>No hay ninguna dirreción creada. </h3>
            )} 

            {!addresses && <Loader active><h4>Cargando!</h4></Loader>}
            
            {size(addresses) > 0 && (
                 <Grid>
                 {map(addresses, (address) => (
                     <Grid.Column key={address.id} mobile={16} tablet={8} computer={4} >
                         <Address address={address} logout={logout} setReloadAddresses={setReloadAddresses} openModal={openModal} />
                     </Grid.Column>
                 ))}
             </Grid>
            )}
        </div>
    )
}


function Address(props) {
    const { address, logout, setReloadAddresses, openModal } = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteAddress = async () => {
        setLoadingDelete(true)
        const response = await DeleteAddressesApi(address._id, logout)
        if (response) setReloadAddresses(true);

    }

    return (
        <div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.state}, {address.city}, {address.postalCode} </p>
            <p>{address.phone}</p>

            <div className="actions">
                <Button primary onClick={() => openModal(`Editar: ${address.title}`, address)} >Editar</Button>
                <Button onClick={deleteAddress} loading={loadingDelete}>Eliminar</Button>
            </div>
        </div>
    )
}