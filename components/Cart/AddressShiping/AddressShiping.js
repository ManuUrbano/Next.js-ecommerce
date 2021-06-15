import React, { useState, useEffect } from 'react';
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from 'next/link';
import classNames from 'classnames';
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShiping({ setAddress }) {
    const [addresses, setAddresses] = useState(null)
    const { auth, logout } = useAuth();
    const [addresActive, setAddresActive] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout)
            setAddresses(response || []);
        })()
    }, [])

    return (
        <div className="address-shipping">
            <div className="title">Dirreción de envió</div>
            <div className="data">
                {size(addresses) === 0 ? (
                    <h3>No hay ninguna dirreción creada.
                        <Link href="/account">
                            <a> Añade tu primera dirreción!</a>
                        </Link>
                    </h3>
                    
                ) : (
                    <Grid>
                        {map(addresses, (address) => (
                            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                                <Address address={address} setAddresActive={setAddresActive} addresActive={addresActive} setAddress={setAddress} />
                            </Grid.Column>
                        ))}
                    </Grid>
                )}
            </div>
        </div>
    )
}

function Address({ address, setAddresActive, addresActive, setAddress }){
    const changeAddress = () => {
        setAddresActive(address._id);
        setAddress(address);
    }
 
    return (
        <div className={classNames("address", {
            active: addresActive === address._id,
        })} onClick={changeAddress}>
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>
                {address.city} , {address.state}, {address.postalCode}
            </p>
            <p>{address.phone}</p>
        </div>
    )
}