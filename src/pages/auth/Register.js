import React, { useState } from 'react'
import "./auth.css";

import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { BsTelephone, BsTwitter } from 'react-icons/bs';
import { MdAlternateEmail, MdOutlineShortText } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';

import axios from 'axios';
import { API } from '../../constant';


const Register = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    confirm_password: "",
    phone: "",
    role: "student"
  });

  const registerThisUser = (e) => {
    e.preventDefault();
    axios.post(`${API}/auth/register`, userData)
      .then((res) => {
        if (res.data.status === "success") {
          alert("User registered, Verify otp on next screen");
          window.location.href = `/login?email=${res.data.email}`
        }
      }).catch((err) => {
        alert(err.response.data.message)
      })
  }


  return (
    <div className='authContainer'>
      <div className='registerChildContainer'>

        <form className='registerFormDiv' onSubmit={registerThisUser}>
          <div className='registerInputGrid'>

            <div className='rInputDiv'>
              <MdOutlineShortText size={20} />
              <input type="text" value={userData.first_name} onChange={(e) => setUserData(prev => ({ ...prev, first_name: e.target.value }))} placeholder='First Name' id="register_fname" />
            </div>
            <div className='rInputDiv'>
              <MdOutlineShortText size={20} />
              <input type="text" value={userData.last_name} onChange={(e) => setUserData(prev => ({ ...prev, last_name: e.target.value }))} placeholder='Last Name' id="register_lname" />
            </div>


            <div className='rInputDiv'>
              <MdAlternateEmail size={20} />
              <input type="text" value={userData.email} onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} placeholder='Email Address' name='email' />
            </div>

            <div className='rInputDiv'>
              <BsTelephone />
              <input type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} placeholder='Mobile No.' name="phone" />
            </div>

            <div className='rInputDiv'>
              <FiLock size={20} />
              <input type="password" value={userData.password} onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))} placeholder='Enter password' name='password' />
            </div>

            <div className='rInputDiv'>
              <FiLock size={20} />
              <input type="password" value={userData.confirm_password} onChange={(e) => setUserData(prev => ({ ...prev, confirm_password: e.target.value }))} placeholder='Confirm password' />
            </div>

          </div>


          <div className='registerButton'>
            <div>
              <div className='termsCondition'>
                <input type="checkbox" id="termsCheck" />
                <label htmlFor='termsCheck'>I agree with the terms of use</label>
              </div>
              <button type='submit'>Register</button>
            </div>
          </div>
        </form>

        <p className='alternateText'>Or Register With</p>

        <div className='registerAltButton'>
          <button type="button" className='googleBTN'>
            <FcGoogle /><span>Google</span>
          </button>
        </div>

        <div className='goToLoginText'>
          <p>
            Already have an account ?
          </p>
          <Link to="/login" className='loginLinkText'>Login</Link>
        </div>

      </div>
    </div>
  )
}

export default Register