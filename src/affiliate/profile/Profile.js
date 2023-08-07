import React, { useRef, useState,useEffect } from 'react'
import AffiliateBase from '../base/AffiliateBase'
import './profile.css'
import { uploadImage } from '../../functions/uploader';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API } from '../../constant';

function Profile() {

    const imageInputRef = useRef()
    const [inputData,setInputdata] = useState()
    const {user} = useSelector(state=>state.user)
    const [editeddata, setEditedData] = useState({
        first_name: "",
        last_name: "",
        phone: null,
        dp: ""
    });


   useEffect(()=>{
    setEditedData(user)
   },[user])
  
    const handleUploadImage = async (e) => {
        const file = e.target.files;
        setInputdata(file)
        if (file.length <= 0) {
            return
        }
        const data = await uploadImage(file[0], "profile", 200, 200);
        if (data.status === "success") {
            setEditedData(prev => ({
                ...prev,
                dp: data.imgUrl
            }))
        }
    }

    const EditFromHandler = async() => {
        axios.patch(`${API}/affiliate/profile/${user._id}`,editeddata,{
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res) => {
            const { status, userquery } = res.data
            if (status === 'success') {
               alert('user updated') 
            }
        })
        
    }

    return (
        <AffiliateBase>
            <div className="profilepage">
                <div className="profilePagebg">
                    <div className="headingBar">
                        <h2 className='PageHeading'> Profile </h2>
                    </div>

                    <div className="AffiliateprofilePhoto">
                        <div className="profileImage">
                            <img src={editeddata.dp ? editeddata.dp : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6K1J-byWbN0Cd1hIAEt0tmhDWyhuJhClmg&usqp=CAU"} alt="" />
                            {/* <img src={photo} alt="" /> */}
                        </div>
                    </div>
                    <div className="photouploader">
                        <button onClick={() => imageInputRef.current && imageInputRef.current.click()}>upload Image</button>
                        <input  ref={imageInputRef} type="file" className='hidden' onChange={handleUploadImage} accept='image/*' />
                    </div>

                    <div className="formEditAreaRow">
                        <div className="formEditAreaColom">
                            <p>Firstname</p>
                            <input  value={editeddata.first_name} onChange={(e) => setEditedData(prev=>({...prev,first_name:e.target.value}))} type="text" />
                        </div>
                        <div className="formEditAreaColom">
                            <p >Lastname</p>
                            <input value={editeddata.last_name} onChange={(e) => setEditedData(prev=>({...prev,last_name:e.target.value}))} type="text" />
                        </div>
                    </div>
                    <div className="formEditAreaRow">
                        <div className="formEditAreaColom">
                            <p>Email</p>
                            <input value={editeddata.email} onChange={(e) => setEditedData(prev=>({...prev,email:e.target.value}))} type="text" />
                        </div>
                        <div className="formEditAreaColom">
                            <p >Mobile No.</p>
                            <input value={editeddata.phone} onChange={(e) => setEditedData(prev=>({...prev,phone:e.target.value}))} type="text" />
                        </div>
                    </div>
                    <div>
                        <button className="subitFormBtn" onClick={EditFromHandler} >Submit</button>
                    </div>
                </div>
            </div>
        </AffiliateBase>
    )
}

export default Profile