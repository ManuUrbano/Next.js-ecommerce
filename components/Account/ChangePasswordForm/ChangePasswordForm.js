import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from '../../../api/user';

export default function ChangePasswordForm(props) {
    const { user, logout } = props;
    const [ loading, setLoading ] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (FormData) => {
            setLoading(true);
            const response = await updatePasswordApi(user.id, FormData.password, logout);
            console.log(response);
            if(!response){
                toast.error("Error al actualizar la contraseña!")
            }else{
                toast.success("Contraseña actualizada correctamente.")
                logout(); 
            }
            setLoading(false);
        },
    })

    return (
        <div className="change-password-form">
            <h4>Cambiar tu contraseña</h4>
            <Form onSubmit={formik.handleSubmit} >
                <Form.Group widths="equal">
                    <Form.Input name="password" type="password" placeholder="Introduce tu nueva contraseña!" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />
                    <Form.Input name="repeatPassword" type="password" placeholder="Confirma tu nueva contraseña!" onChange={formik.handleChange} value={formik.values.repeatPassword}  error={formik.errors.repeatPassword} />
                </Form.Group>
                <Button className="submit" type="submit" loading={loading} >Actualizar</Button>
            </Form>
        </div>
    )
}

function initialValues(){
    return {
        password: "",
        repeatPassword: ""
    }
}

function validationSchema(){
    return {
        password: Yup.string().required(true).oneOf([Yup.ref("repeatPassword")], true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], "Contraseñas diferentes!")
    }
}