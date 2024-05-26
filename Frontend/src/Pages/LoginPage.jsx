import { useContext, useEffect } from 'react';
import React, { useState } from 'react'
import axios from 'axios';
// import loginContext from '../context/loginContext'
import "../../Styles/registerPage.css"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { authActions } from "../redux/store";
import { useSelector } from "react-redux"
import ReactLoading from 'react-loading';


function LoginPage() {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const isLogin = useSelector((state) => state.isLogin)

  const [loading, setloading] = useState(false);

  const [userInfo, setuserInfo] = useState({
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
      const { data } = await axios.post("https://dns-manager-s2o7.onrender.com/user/userLogin", {
        email: userInfo.email,
        password: userInfo.password,
      })

      if (data.success) {
        localStorage.setItem('token', data.jwtToken)
        toast.success("Login Successfully")
        dispatch(authActions.login())
        navigate('/dnsEntry')
        setloading(false)
      }
      else {
        toast.error('Invalid Username or Password')
        console.log(error)
        setloading(false)
      }
    } catch (error) {
      toast.error('Unable to login In')
      console.log(error)
      setloading(false)
    }
  }

  return (
    <div className='register-container'>
      {!loading && (
        <div className='register-container-circle'>
          <div className='register-container-header'>
            LOGIN
          </div>
          <div className='register-container-main'>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={userInfo.email}
                onChange={handleChange}
                style={{ width: "70%" }}
              />
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={userInfo.password}
                onChange={handleChange}
                style={{ width: "70%" }}
              />
              <button type='submit'>Submit</button>
            </form>
            <p>
              NOT A USER? PLEASE <Link to="/register">REGISTER</Link>
            </p>
          </div>
        </div>
      )}
      {loading && (
        <ReactLoading type={"spin"} color={"blue"} height={50} width={200} />
      )}
    </div>
  )
}

export default LoginPage