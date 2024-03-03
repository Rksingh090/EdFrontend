import React, { useMemo, useState } from 'react';
import "./auth.css";

import { API } from '../../constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/UserReducer';

import { MdAlternateEmail } from 'react-icons/md'
import { FiLock } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Link, useSearchParams } from 'react-router-dom'
import IconButton from '../../components/utils/IconButton';
import { AiOutlineLogin } from "react-icons/ai";

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useDispatch()

    const [urlSearchParman, setUrlSearchParam] = useSearchParams();
    const nextUrl = useMemo(() => urlSearchParman.get("next"), [urlSearchParman]);


    // handle email & pass login 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios.post(`${API}/auth/login`,
            {
                email,
                password
            })
            .then((res) => {
                const { status, user, token } = res.data;
                if (status === "success") {
                    localStorage.setItem("token", token);
                    dispatch(setUser({ user: user }));
                    if (nextUrl === "" || nextUrl === undefined || nextUrl === null) {
                        window.location.href = "/"
                    } else {
                        window.location.href = nextUrl
                    }
                } else {
                    alert("Login Failed: " + res.data?.message)
                    if (res.data.account_status === "not-verified") {
                        window.location.href = `/otp-verify?email=${res.data?.email}`
                    }
                }
            })
            .catch((err) => {
                alert("Login Failed: " + err.response.data?.message)
            })
            .finally(() => setIsLoading(false))
    }


    return (
        <div className='authContainer'>
            <form onSubmit={handleSubmit} className='loginChildContainer'>
                <div className='allInputs'>
                    <h2 className='loginMainHeader'>Login Now!</h2>
                    <div className='inputDiv'>
                        <div className="inputIcon">
                            <MdAlternateEmail size={20} />
                        </div>
                        <input autoComplete="one-time-code" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='example@gmail.com' />
                    </div>

                    <div className='inputDiv'>
                        <div className="inputIcon">
                            <FiLock size={20} />
                        </div>
                        <input autoComplete="one-time-code" type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} placeholder='pass****' />
                        <span className='passwordEyeBtn' onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className='submitButton'>
                        <IconButton
                            Icon={<AiOutlineLogin size={22} />}
                            text={"Login"}
                            classList={"round mutedSubtle"}
                            loading={isLoading}
                            type={"submit"}
                            loadingSize={22}
                        />
                        {/* <button type="submit">Login</button> */}
                        <Link to="/forgot-password" className='forgotPasswordLink' >Forgot Password?</Link>
                    </div>
                </div>
                <p>Or Login With</p>
                <div className='loginButtons'>
                    <button type="button" className='googleBTN'>
                        <FcGoogle /><span>Google</span>
                    </button>
                </div>
                <div className='goToLoginText gap-x-2 w-full flex items-center justify-center'>
                    <p className='text-[18px]'>
                        Don't have a account?
                    </p>
                    <Link to={"/register"} className="text-[18px] text-[var(--main)]">Register Here!</Link>
                </div>
            </form>
        </div>
    )
}

export default Login