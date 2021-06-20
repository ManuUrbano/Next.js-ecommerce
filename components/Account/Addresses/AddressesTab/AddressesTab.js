import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import BasicModal from "../../../Modal/BasicModal";
import AddressForm from "../AddressForm";
import ListAddress from "../ListAddress";

export default function AddressesTab(){
    const [showModal, setshowModal] = useState(false);
    const [titleModal, settitleModal] = useState("");
    const [formModal, setformModal] = useState(null);
    const [reloadAddresses, setReloadAddresses] = useState(false);

    //Abrimos Modal
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