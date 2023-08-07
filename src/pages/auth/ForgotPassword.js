import axios from 'axios';
import React, { useState } from 'react'
import { API } from '../../constant';
import { useDispatch } from 'react-redux';
import { sendOtpToUser, setUser } from '../../reducers/UserReducer';


const ForgetPassword = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSend, setOtpSend] = useState(false);

    const [otpVerified, setOtpVerifed] = useState(false);

    const [passwordData, setPasswordData] = useState({
        password: "",
        confirm_password: ""
    })

    // verify otp login 
    const handleOTPVerify = async (e) => {
        e.preventDefault();

        axios.post(`${API}/auth/otp/login`, {
            email,
            otp
        })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    setOtpVerifed(true)
                }
            })
            .catch((err) => {
                alert("Error: " + err.response.data.message);
            })
    }

    // send otp 
    const handleOTPsend = (e) => {
        e.preventDefault();
        if (!email || email === "" || email === undefined) return;
        dispatch(sendOtpToUser({ email }))
            .then((action) => {
                if (action.type === "user/sendOtpToUser/rejected") {
                    console.log("User not found");
                } else {
                    const { status } = action.payload;
                    if (status === "success") {
                        setOtpSend(true)
                        alert("OTP Send")
                    }
                }
            })
    }

    // change password 
    const changePassword = (e) => {
        e.preventDefault();
        axios.post(`${API}/auth/otp/change-password`, {
            email,
            ...passwordData
        })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    alert("Password Changed, Login Now!")
                    window.location.href = "/login"
                }
            })
    }


    return (
        <div className='forgetPassPage'>
            <div className='forgotPassContainer'>

                <form className={`forgotPageForm ${otpVerified ? "otpVerified" : "notVerified"} `} onSubmit={otpVerified ? changePassword : otpSend ? handleOTPVerify : handleOTPsend}>
                    <div className='otpNotVerifiedDiv'>
                        <div className="forgotPassHeading">Forgot Password?</div>
                        <div className='forgotEmailDiv'>
                            <label htmlFor="forgotPassEmail">Enter Your Email Address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id='forgotPassEmail' />
                        </div>
                        {
                            otpSend && (
                                <div className='forgotEmailDiv'>
                                    <label htmlFor="forgotPassEmail">Enter Your OTP Here</label>
                                    <input type={'number'} value={otp} onChange={(e) => setOtp(e.target.value)} id="forgotPassEmail" className='noNumberStyle' />
                                </div>
                            )
                        }
                        <div className='forgotPassOTPDiv'>
                            {
                                otpSend ?
                                    (<div className='verifyOtpDiv'>
                                        <button type='button' className='resendOTPBtn' onClick={(e) => handleOTPsend(e, "resend")}>Resend OTP</button>
                                        <button className="forgotSendOTP" type='submit'>
                                            Verify OTP
                                        </button>
                                    </div>
                                    ) : (

                                        <button className="forgotSendOTP" type='submit'>
                                            Send OTP
                                        </button>
                                    )
                            }
                        </div>
                    </div>
                    <div className='otpVerifiedDiv'>
                        <div className="forgotPassHeading">Create New Password</div>
                        <div className='forgotEmailDiv'>
                            <label htmlFor="forgotPassEmail">Enter New Password</label>
                            <input type="password" value={passwordData.password} onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))} id='forgotPassEmail' />
                        </div>
                        <div className='forgotEmailDiv'>
                            <label htmlFor="forgotPassEmail">Enter Confirm Password</label>
                            <input type="password" value={passwordData.confirm_password} onChange={(e) => setPasswordData(prev => ({ ...prev, confirm_password: e.target.value }))} id='forgotPassEmail' />
                        </div>
                        <div className='forgotPassOTPDiv'>
                            <button className="forgotSendOTP" type='submit'>
                                Change Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword