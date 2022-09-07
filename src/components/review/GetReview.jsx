import React, {useState} from "react";
import axios from 'axios';

import { useFormik } from "formik"

const GetReview = (props) => {
    const [allReviews, setAllReviews] = useState([])
    
    const reviewDisplay = allReviews.map((reviews, index) => {
        return <p className="reviewDisplay" value={reviews.review_notes}>
            <h5>Review for {reviews.name} <br></br></h5>
            <h5>Review from: {reviews.user_name} </h5><br></br>
            {reviews.review_notes} </p>
    })

    const formik = useFormik({
        initialValues:{
            restaurantName: props.name,
        },

        onSubmit: (restaurantName) => {
            axios
            .post('http://localhost:4000/api/getReview', restaurantName)
            .then((res) => setAllReviews(res.data))
            // console.log(restaurantName)
        }
    })
    
 
    return (
        <p>
           <form onSubmit={formik.handleSubmit}>
           {/* <input
                name='restaurantName'
                value={formik.values.restaurantName}
                onChange={formik.handleChange}
                placeholder="Leave a review..."/> */}
            <button type='submit'>See Reviews</button>
            </form>
            {reviewDisplay}
        </p>
    )
}

export default GetReview