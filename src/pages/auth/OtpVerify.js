import React, { useEffect, useState } from 'react'
import "./auth.css";
import axios from 'axios';
import IconButton from '../../components/utils/IconButton';


import { API } from '../../constant';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendOtpToUser } from '../../reducers/UserReducer';

import { MdOutlineVerified } from "react-icons/md";

const OtpVerify = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsloading] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        otp: ""
    });

    const [urlSearchParam, setUrlSearchParam] = useSearchParams();

    const verifyOTP = () => {
        setIsloading(true);
        axios.post(`${API}/auth/verify/register`, userData)
            .then((res) => {
                const { status, verified } = res.data;
                if (status === "success" && verified) {
                    alert("Verification Successfull, Login Now!")
                    window.location.href = "/login"
                }
            })
            .catch((err) => {
                alert(err.response?.data?.message);
            })
            .finally(() => {
                setIsloading(false);
            })
    }

    useEffect(() => {
        if (!urlSearchParam.get("email") || urlSearchParam.get("email") === "" || urlSearchParam.get("email").length === 0) return;
        setUserData(prev => ({
            ...prev,
            email: urlSearchParam.get("email")
        }))
    }, [urlSearchParam])

    // send otp to email 
    const handleOTPsend = async (e) => {
        try {
            setIsloading(true);
            e?.preventDefault();
            if (!userData.email || userData.email === "" || userData.email === undefined) return;
            const action = await dispatch(sendOtpToUser({ email: userData.email }))

            if (action.type === "user/sendOtpToUser/rejected") {
                console.log("User not found");
            } else {
                const { status } = action.payload;
                if (status === "success") {
                    alert("OTP has been sent to your email.")
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false);
        }
    }


    return (
        <div className='otpVerifyPage'>
            <div className="otpFormPage">
                <h2 className='verifyOtpHeading'>Please Verify OTP</h2>
                <input value={userData.email} onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} type="text" className='otpVerifyInput emailInp' placeholder='Email' />
                <div className='otpAndResend'>
                    <p onClick={handleOTPsend}>Resend otp !</p>
                    <input value={userData.otp} onChange={e => setUserData(prev => ({ ...prev, otp: e.target.value }))} type="number" className='otpVerifyInput noNumberStyle otpInp' placeholder='OTP' />
                </div>
                <IconButton
                    Icon={<MdOutlineVerified size={22} />}
                    text={"Verify OTP"}
                    onClick={verifyOTP}
                    loading={isLoading}
                    loadingSize={22}
                />
            </div>
        </div>
    )
}

export default OtpVerify