import React, {useEffect, useState} from "react";
import axios from "axios";

import { useFormik } from "formik"

const SearchRestaurant = () => {
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
            {restaurants.restaurant_name}<br></br>
            {restaurants.city}, {restaurants.state}<br></br>
            <a href={restaurants.website} target="blank">{restaurants.website}</a>
            <br></br>
            <button>Reviews</button></p>
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
            <h2 className="restaurant-header">Find a Restaurant</h2>
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