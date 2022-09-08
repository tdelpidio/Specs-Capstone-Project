import React from "react";
import axios from "axios";

import {useFormik} from 'formik'
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    }
    const onSubmit = (values) => {
        axios.post('http://localhost:4000/api/login', values)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('firstName', res.data.name)
            localStorage.setItem('user_id', res.data.id)
            navigate('/restaurant')
        })
        .catch((err) => {
            alert(err.response.data)
        })
    }
    const validate = (values) => {
        const errors = {}
        if(!values.email) {
            errors.email = "email required"
        }
        if(!values.password) {
            errors.password = "password required"
        } else if (values.password.length < 10){
            errors.password = "Password must be at least than 10 characters."
        }
        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })


    return (
        <div>
        <h3>Sign into your account below</h3>
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