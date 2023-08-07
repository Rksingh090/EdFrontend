import React from 'react'
import "./careers.css";
import Base from '../../components/base/Base';
import { Link } from 'react-router-dom';


const Registercarrers = () => {
  return (
    <Base>
    
    <div className='registercarress'>
      <div className='homeregister'>
        <Link to="/">Home</Link>
        <p>/</p>
        <Link to="/logincarrers">Login</Link>
      </div>
      <div>
        <div className='homeregister onlineregister'>
          <h1>Online Registration Form</h1>
        </div>
        <div className='inpuregister'>
          <div>
            <div className='inputname'>
            <label htmlFor="">Name *</label>
            <input type="text" placeholder='Name' className='inputfield'/>

            </div>
            <div className='inputname'>
              <label htmlFor="">Email Address *</label>
              <input type="email" name="" id="" placeholder='abc@abc.com' className='inputfield'/>
            </div>

          </div>
          <div>
            <div className='inputname'>
              <label htmlFor="">Date of Birth *</label>
              <input type="date" name="" id="" className='inputfield' placeholder=''/>
            </div>
            <div className='inputname'>
              <label htmlFor="">Mobile No *</label>
              <input type="number" name="" id="" className='inputfield' placeholder='Mobile no'/>
            </div>


          </div>
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

export default Registercarrers