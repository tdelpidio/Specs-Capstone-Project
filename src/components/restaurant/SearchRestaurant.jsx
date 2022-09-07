import React, {useEffect, useState} from "react";
import AddReview from "../review/AddReview";
import GetReview from "../review/GetReview";

import axios from "axios";

import { useFormik } from "formik"

const SearchRestaurant = () => {
    let userName = localStorage.getItem ("firstName") 
    const [allStates, setAllStates] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:4000/api/getStates')
        .then((res) =>setAllStates(res.data))


    }, [])

    const stateOptions = allStates.map((states, index) => {
        return <option value={states.abbreviation}>{states.abbreviation}</option>
    })

    const restaurantOptions = data.map((restaurants, index) => {
        return <p value={restaurants.restaurant_name}><br></br>
            <h4>{restaurants.restaurant_name}</h4>
            {restaurants.city}, {restaurants.state}<br></br>
            <a href={restaurants.website} target="blank">{restaurants.website}</a>
            <br></br>
            <AddReview name={restaurants.restaurant_name}/>
            <GetReview name={restaurants.restaurant_name}/></p>
    })

    const formik = useFormik({
        initialValues:{
            state: null
        },

        onSubmit:(state) => {
            console.log(state)
            axios
        .post('http://localhost:4000/api/getRestaurantList', state)
        .then(res => setData(res.data)
        
        )}
    })

    return (
        <div>
        <section className="search-screen">
            <h2 className="restaurant-header">Let's Find a Restaurant</h2>
            <form onSubmit={formik.handleSubmit} className="search-form">
            <select
            name='state'
            value={formik.values.state}
            onChange={formik.handleChange} className="state-select">
                {stateOptions}
                </select>
                <button type='submit'>Search</button>
                </form>
        </section>
        <div className="resultDisplay">
        {restaurantOptions}
        </div>
        </div>
    )
}

export default SearchRestaurant