import React, {useEffect, useState} from 'react'
import axios from 'axios'

import { useFormik } from "formik"


 

const AddRestaurant = () => {
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
            name:"",
            type:"",
            city: "",
            state: null,
            website:""
        },

        onSubmit: (values) => {
            axios
            .post('http://localhost:4000/api/addRestaurant', values)
            .then((res) => console.log(res.data))
            console.log(values)
        }
    })

    return(
        <div>
            <h2>Add a Restaurant</h2>
            <form onSubmit={formik.handleSubmit}>
                <input 
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                type='text'
                placeholder='Restaurant Name'/>
                <input 
                name='type'
                value={formik.values.type}
                onChange={formik.handleChange}
                type='text'
                placeholder='e.g. Mexican, Sushi, Bakery..'/>
                <input 
                name='city'
                value={formik.values.city}
                onChange={formik.handleChange}
                type='text'
                placeholder='City'/>
                <select
                name='state'
                value={formik.values.state}
                onChange={formik.handleChange} className="state-select">
                {stateOptions}
                </select>
                <input 
                name='website'
                value={formik.values.website}
                onChange={formik.handleChange}
                type='text'
                placeholder='Restaurant Website'/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}

export default AddRestaurant