import React from 'react'
import "./careers.css";

import Base from '../../components/base/Base'
import { Link } from 'react-router-dom';

const Logincarrers = () => {
  return (
    <Base>
   <div className='registercarress'>
      <div className='homeregister'>
        <Link to="/">Home</Link>
        <p>/</p>
        <Link to="/registercarrers">Registration Form</Link>
      </div>
      <div>
        <div className='homeregister onlineregister'>
          <h1>Registration Candidate-Login</h1>
        </div>
        <div className='inpuregister'>
          <div>
            <div className='inputname'>
            <label htmlFor="">User Name / Registration No *</label>
            <input type="number" placeholder='Enter a valid Registration No' className='inputfield'/>

            </div>
            <div className='inputname'>
              <label htmlFor="">Password / DOB(YYYY-MM-DD) *</label>
              <input type="password" name="" id="" placeholder='YYYY-MM-DD' className='inputfield'/>
            </div>

          </div>
          {/* <div>
            <div className='inputname'>
              <label htmlFor="">Date of Birth *</label>
              <input type="date" name="" id="" className='inputfield' placeholder=''/>
            </div>
            <div className='inputname'>
              <label htmlFor="">Mobile No *</label>
              <input type="number" name="" id="" className='inputfield' placeholder='Mobile no'/>
            </div>


          </div> */}
        </div>
        <div>
          <div className='btnnnn'>
            <button className='submitbutton'>Submit</button>
            <button className='submitbutton resret'>Reset</button>
          </div>
        </div>
      </div>
    </div>
    
    
    </Base>
  )
}

export default Logincarrers