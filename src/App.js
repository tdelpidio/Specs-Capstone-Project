import React from "react";

import "./App.css"
import Header from "./components/Header";
import Home from "./components/Home";
import AccountScreen from "./components/account/AccountScreen";
import RestaurantList from "./components/restaurant/RestaurantList";
import AddReview from "./components/review/AddReview";
import {Routes, Route} from "react-router-dom"


function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/account/*' element={<AccountScreen />}/>
        <Route path='/restaurant' element={<RestaurantList />}/>
        <Route path='/review' element={<AddReview />}/>
      </Routes>

    </div>
  );
}

export default App;
