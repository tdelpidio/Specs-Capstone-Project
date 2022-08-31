import React from "react";
import {Link, Routes, Route} from 'react-router-dom'

import CreateAccount from "./CreateAccount";
import Login from "./Login";

const AccountScreen = () => {
    return (
        <section className="account-screen">
            <h2>Create an Account!</h2>
            <Link to="/account/createaccount">
                <button>Create Account</button>
            </Link>
            <h2>Have an account? Sign in here!</h2>
            <Link to="/account/login">
                <button>Log In</button>
            </Link>
            <Routes>
                <Route path="createaccount" element={<CreateAccount />}/>
                <Route path="login" element={<Login />}/>
            </Routes>
        </section>
    )
}

export default AccountScreen