import React from "react";
import {Link, Routes, Route} from 'react-router-dom'

import CreateAccount from "./CreateAccount";
import Login from "./Login";

const AccountScreen = () => {
    return (
        <div>
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

            <div className="create">
        <img className="accountImg" src="https://www.coolpun.com/images/coolpun/s_c5/c567f856d6ed8dbc7d25686b8d086f46.jpeg"></img>
        </div>
        </div>
    )
}

export default AccountScreen