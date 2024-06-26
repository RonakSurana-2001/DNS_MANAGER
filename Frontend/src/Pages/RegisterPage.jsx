import React, { useState } from 'react'
import "../../Styles/registerPage.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
// import loginContext from '../context/loginContext'
// import { useContext } from 'react';
import toast from 'react-hot-toast';
import ReactLoading from 'react-loading';


function RegisterPage() {

    const [loading, setloading] = useState(false);

    const navigate = useNavigate()
    // const { setIslogin } = useContext(loginContext);
    const [userInfo, setuserInfo] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setuserInfo((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            const { data } = await axios.post("https://dns-manager-s2o7.onrender.com/user/userRegister", {
                username: userInfo.username,
                email: userInfo.email,
                password: userInfo.password,
            })
            if (data.success) {
                // setIslogin(true)
                toast.success('User Successfully Registered')
                navigate('/')
                setloading(false)
            }
        } catch (error) {
            toast.error('User Already Registered')
            console.log(error)
            setloading(false)
        }
    }

    return (
        <>
            <div className='register-container'>
                {loading == false && (<div className='register-container-circle'>
                    <div className='register-container-header'>
                        REGISTER
                    </div>
                    <div className='register-container-main'>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" placeholder='Username' value={userInfo.username} onChange={handleChange} style={{ width: "70%" }} />
                            <input type="email" name="email" placeholder='Email' value={userInfo.email} onChange={handleChange} style={{ width: "70%" }} />
                            <input type="password" name="password" placeholder='Password' value={userInfo.password} onChange={handleChange} style={{ width: "70%" }} />
                            <button type='submit'>Submit</button>
                        </form>
                        <p>ALREADY REGISTERED ? PLEASE <Link to="/">LOGIN</Link></p>
                    </div>
                </div>)}
                {loading && (
                    <ReactLoading type={"spin"} color={"blue"} height={50} width={200} />
                )}
            </div>
        </>
    )
}

export default RegisterPage