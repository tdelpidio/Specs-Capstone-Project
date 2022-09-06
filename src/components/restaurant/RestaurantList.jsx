import React, {useState} from "react";

import AddRestaurant from "./AddRestaurant";
import SearchRestaurant from "./SearchRestaurant";


const RestaurantList = () => {



    return (
        <div>
            <SearchRestaurant />
            <AddRestaurant />
        </div>
    )
}

export default RestaurantList