import React, { useState } from 'react';
import "./auth.css"
import { BsTelephone } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { MdAlternateEmail, MdOutlineShortText } from 'react-icons/md';
import { API } from '../../constant';
import axios from 'axios';

const AffiliateRegister = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    confirm_password: "",
    phone: "",
    role: "affiliate"
  });

  const registerThisUser = (e) => {
    e.preventDefault()
    axios.post(`${API}/auth/affiliate/register`, userData)
      .then((res) => {
        if (res.data.status === "success") {
          alert("Thanks for the Registration, We will approve your account shortl.,");
        }
      }).catch((err) => {
        alert(err.response.data.message)
      })
  }

  return (
    <div className='authContainer'>
      <div className='registerChildContainer'>



        <div className='affiliateFormSide2'>

          <div className='loginpageLogo'>
            <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/logoLandscape.png"} alt='' />
          </div>

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
                <button type='submit'>Register</button>
              </div>
            </div>
          </form>


          <div className='goToLoginText gap-2 w-full flex items-center justify-center'>
            <p className='text-[18px] text-[#808080]'>
              Go to
            </p>
            <Link to="/" className='text-[var(--main)] font-[500] text-[18px]'>Home !</Link>

          </div>

        </div>

      </div>
    </div>
  )
}

export default AffiliateRegister