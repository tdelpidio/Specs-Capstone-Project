import React from "react";
import axios from 'axios'

import { useFormik } from "formik"




const AddReview = (props) => {
 let userName = localStorage.getItem ("firstName") 

    const formik = useFormik({
        initialValues:{
            user: userName,
            name: props.name,
            review_notes: "",
            
        },

        onSubmit: (values) => {
            axios
            .post('http://localhost:4000/api/addReview', values)
            .then((res) => console.log(res.data))
            console.log(values)
        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                {/* <input
                name='user'
                value={formik.values.user}/> */}
                <p>Been here before, {userName}? Leave a Review!</p>
                {/* <input
                name='name'
                value={formik.values.name}/> */}
                {/* {props.name} */}
                <input
                name='review_notes'
                value={formik.values.review_notes}
                type="text"
                onChange={formik.handleChange}
                placeholder="Leave a review..."/>
                <button type='submit'>Add Review</button>
            </form>
        </div>
    )


}

export default AddReview