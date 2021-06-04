import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, UpdateAddressesApi } from '../../../api/address';
import { toast } from 'react-toastify';

export default function AddressForm(props) {
    const { setshowModal, setReloadAddresses, newAddress, address } = props;
    const [loading, setloading] = useState(false);
    const { auth, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (FormData) => {
            newAddress ? createAddress(FormData) : updateAddress(FormData);
        }
    })

    const createAddress = async (FormData) => {
        setloading(true);
        const FormDataTemp = {
            ...FormData,
            user: auth.idUser,
        }
        const response = await createAddressApi(FormDataTemp, logout);
        if(!response){
            toast.warning("Error al crear la Dirreción")
            setloading(false);
        }else{
            formik.resetForm();
            setReloadAddresses(true);
            setloading(false);
            setshowModal(false);
        }
        
    }

    const updateAddress = async (FormData) => {
        setloading(true);
        const FormDataTemp = {
            ...FormData,
            user: auth.idUser,
        }
        const response = await UpdateAddressesApi(address._id ,FormDataTemp, logout);

        if(!response){
            toast.warning("Error al actualizar la dirreción");
            setloading(false);
        }else{
            formik.resetForm();
            setReloadAddresses(true);
            setloading(false);
            setshowModal(false);
        }
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input name="title" type="text" label="Titulo de la Dirreción" placeholder="Titulo de la Dirreción" onChange={formik.handleChange} value={formik.values.title} error={formik.errors.title} />
            <Form.Group widths="equal">
                <Form.Input name="name" type="text" label="Nombre y Apellidos" placeholder="Nombre y Apellidos" onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name} />
                <Form.Input name="address" type="text" label="Dirreción" placeholder="Dirreción" onChange={formik.handleChange} value={formik.values.address} error={formik.errors.address} />
            </Form.Group>
            
            <Form.Group widths="equal">
                <Form.Input name="city" type="text" label="Ciudad" placeholder="Ciudad" onChange={formik.handleChange} value={formik.values.city} error={formik.errors.city} />
                <Form.Input name="state" type="text" label="Estado/Provincia/Región" placeholder="Estado/Provincia/Región" onChange={formik.handleChange} value={formik.values.state} error={formik.errors.state} />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input name="postalCode" type="text" label="Código postal" placeholder="Código postal" onChange={formik.handleChange} value={formik.values.postalCode} error={formik.errors.postalCode} />
                <Form.Input name="phone" type="text" label="Número de teléfono" placeholder="Número de teléfono" onChange={formik.handleChange} value={formik.values.phone} error={formik.errors.phone} />
            </Form.Group>
            <div className="actions">
                <Button className="submit" type="submit" loading={loading} > {newAddress ? "Añadir Dirreción" : "Actualizar Dirreción"} </Button>
            </div>
        </Form>
    )
}

function initialValues(address){
    return {
        title: address?.title || "",
        name: address?.name || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        postalCode: address?.postalCode || "",
        phone: address?.phone || ""
    }
}

function validationSchema(){
    return {
        title: Yup.string().required(true),
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        postalCode: Yup.string().required(true),
        phone: Yup.string().required(true),
    }
}