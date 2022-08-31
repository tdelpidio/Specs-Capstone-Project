import React from "react";

import {useFormik} from 'formik'

const Login = () => {
    const initialValues = {
        email: "",
        password: "",
    }
    const onSubmit = (values) => {
        console.log(values)
    }
    const validate = (values) => {
        console.log('validation')
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })


    return (
        <div>
        <h2>Please enter your email and password below!</h2>
        <form onSubmit={formik.handleSubmit} className="login">
            <input
             onChange={formik.handleChange}
             value={formik.values.email}
             className="login-input" 
             type='email'
             name='email' 
             placeholder="E-mail"/>
            <input 
             onChange={formik.handleChange}
             value={formik.values.password}
             className="login-input" 
             type='password' 
             name='password'
             placeholder="password"/>
            <button 
             type='submit' disabled={!formik.isValid}
             className="login-input">Sign in</button>
        </form>
        </div>
    )
}

export default Login