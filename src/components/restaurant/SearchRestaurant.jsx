import React, {useEffect, useState} from "react";
import axios from "axios";

import { useFormik } from "formik"

const SearchRestaurant = () => {
    const [allStates, setAllStates] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:4000/api/getStates')
        .then((res) =>setAllStates(res.data))


    }, [])

    const stateOptions = allStates.map((states, index) => {
        return <option value={states.abbreviation}>{states.abbreviation}</option>
    })


    const formik = useFormik({
        initialValues:{
            state: null
        },

        onSubmit:(state) => {
            console.log(state)
            axios
        .post('http://localhost:4000/api/getRestaurantList', state)
        .then((res) => console.log(res.data))
            
        }
    })

    return (
        <section className="search-screen">
            <h2 className="restaurant-header">Find a Restaurant</h2>
            <form onSubmit={formik.handleSubmit} className="search-form">
            <input className="search-input" placeholder="City"/>
            <select
            name='state'
            value={formik.values.state}
            onChange={formik.handleChange} className="state-select">
                {stateOptions}
                </select>
                <button type='submit'>Search</button>
                </form>
    
        </section>
    )
}

export default SearchRestaurant