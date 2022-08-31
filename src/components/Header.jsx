import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header>
            <h2 className="header-logo">Greater Than Gluten</h2>
            <div className="nav">
                <Link to="/">
                    <button className="nav-btn">Home</button>
                </Link>
                <Link to="/account">
                    <button className="nav-btn">Account</button>
                </Link>
                <Link to="/restaurant">
                    <button className="nav-btn">Restaurants</button>
                </Link>
            </div>
        </header>
    )
}

export default Header