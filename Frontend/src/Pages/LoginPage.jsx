import { useContext, useEffect } from 'react';
import React, { useState } from 'react'
import axios from 'axios';
// import loginContext from '../context/loginContext'
import "../../Styles/registerPage.css"
import { Link,useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import {  useDispatch } from 'react-redux'
import { authActions } from "../redux/store";
import {useSelector} from "react-redux"


function LoginPage() {

  const navigate = useNavigate()

  const dispatch=useDispatch()

  const isLogin=useSelector((state)=>state.isLogin)

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
    try {
      const { data } = await axios.post("http://localhost:3000/user/userLogin", {
        email: userInfo.email,
        password: userInfo.password,
      })
      
      if (data.success) {
        localStorage.setItem('token', data.jwtToken)
        toast.success("Login Successfully")
        dispatch(authActions.login())
        navigate('/dnsEntry')
      }
      else{
        toast.error('Invalid Username or Password')
        console.log(error)
      }
    } catch (error) {
      toast.error('Invalid Username or Password')
      console.log(error)
    }
  }

  return (
    <>
      <div className='register-container'>
        <div className='register-container-circle'>
          <div className='register-container-header'>
            LOGIN
          </div>
          <div className='register-container-main'>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder='Email' value={userInfo.email} onChange={handleChange} />
              <input type="password" name="password" placeholder='Password' value={userInfo.password} onChange={handleChange} />
              <button type='submit'>Submit</button>
            </form>
            <p>NOT A USER ? PLEASE <Link to="/register">REGISTER</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage