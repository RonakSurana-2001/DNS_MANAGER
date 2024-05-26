import React from 'react'
import { Link } from "react-router-dom";
import {  useDispatch } from 'react-redux'
import { authActions } from "../redux/store";

function Navbar() {

    const dispatch=useDispatch()

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/dnsEntry" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DNS Manager</span>
                    </Link>
                    <div className="w-auto md:block md:w-auto" id="navbar-default">
                        <ul>
                            <li>
                                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={()=>dispatch(authActions.logout())}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar