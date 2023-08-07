import React, { useState } from 'react'
import "./auth.css";

import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
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
          window.location.href = `/otp-verify?email=${res.data.email}`
        }else{
          if(res.data.account_status === "not-verified"){
            alert("You are already registered, Verify Otp to Login.")
            window.location.href = `/otp-verify?email=${res.data.email}`;
          }
        }
      }).catch((err) => {
        alert(err.response.data.message)
      })
  }


  return (
    <div className='authContainer'>
      <div className='registerChildContainer'>

        <div className='registerSlider'>
          <Splide options={{
            rewind: true,
            arrows: false,
            perPage: 1,
            pagination: false,
            autoplay: true,
            interval: 2000,
            cover: true
          }}
            style={{
              width: "100%",
              padding: 0
            }}
          >
            <SplideSlide className='registerSlide'>
              <img alt="img2" src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/students.jpg"} />
            </SplideSlide>
            <SplideSlide className='registerSlide'>
              <img alt="img2" src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/students2.jpg"} />
            </SplideSlide>
          </Splide>
        </div>

        <div className='flex flex-col items-center justify-start py-4 overflow-y-auto'>

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
                <div className='termsCondition'>
                  <input type="checkbox" id="termsCheck" />
                  <label htmlFor='termsCheck'>I agree with the terms of use</label>
                </div>
                <button type='submit'>Register</button>
              </div>
            </div>
          </form>

          <p className='alternateText my-6'>Or Register With</p>

          <div className='registerAltButton mt-2'>
            <div className="sidedSocialButtons">
              <button type="button" className='facebookBTN'>
                <FaFacebookF /><span>Facebook</span>
              </button>
              <button type="button" className='twitterBTN'>
                <BsTwitter /><span>Twitter</span>
              </button>
            </div>
            <button type="button" className='googleBTN'>
              <FcGoogle /><span>Google</span>
            </button>
          </div>

          <div className='goToLoginText gap-2 mt-3 w-full flex items-center justify-center'>
            <p className='text-[18px] text-[#808080]'>
              Already have an account ?
            </p>
            <Link to="/login" className='text-[var(--main)] font-[500] text-[18px]'>Login</Link>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Register