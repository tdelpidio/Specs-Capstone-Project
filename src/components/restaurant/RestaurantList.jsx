import React, {useState} from "react";

import AddRestaurant from "./AddRestaurant";
import SearchRestaurant from "./SearchRestaurant";



const RestaurantList = () => {



    return (
        <div className="restaurantMain">
            <SearchRestaurant />
            <AddRestaurant />
            <div className="create">
        <img src="https://www.coolpun.com/images/coolpun/s_d9/d9357d93fc9f94bed12ceea1db455f2c.jpeg"></img>
        </div>
        </div>
    )
}

export default RestaurantList