import React from "react";
import axios from "axios";

import { useFormik } from "formik";

const CreateAccount = () => {
        const initialValues = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
        const onSubmit = (values) => {
            axios
            .post('http://localhost:4000/api/addUser', values)
            .then((res)=> {console.log(res.data)
            localStorage.setItem('email', res.data[0][0].email_address)
            localStorage.setItem('firstName', res.data[0][0].first_name)
            localStorage.setItem('user_id', res.data[0][0].user_id)
            })
            .catch((err) => console.log(err.response.data))
        }
        const validate = (values) => {
            const errors = {}
            if(!values.firstName){
                errors.firstName = "First name required"
            }
            if(!values.lastName) {
                errors.lastName = "Last name required"
            }
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
        <form className="create-account-form" onSubmit={formik.handleSubmit}>
            <input 
            name='firstName'
            value={formik.values.firstName} 
            onChange={formik.handleChange} className="create-account-input" type='text' placeholder="First Name" required/>
            <input 
            name='lastName' 
            value={formik.values.lastName} 
            onChange={formik.handleChange}className="create-account-input" type='text' placeholder="Last Name" required/>
            <input
            name='email' 
            value={formik.values.email} 
            onChange={formik.handleChange} className="create-account-input" type='email' placeholder="Email Address" required/>
            <input
            name='password' 
            value={formik.values.password} 
            onChange={formik.handleChange} className="create-account-input" type='password' placeholder="Password" required/>
            <button type='submit' className="create-account-input">Submit</button>
        </form>
        <div>
            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        </div>
    )
}

export default CreateAccount