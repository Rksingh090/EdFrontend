import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API } from '../../constant';

const Protected = ({ Component, reverse, validRoles }) => {

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            axios.get(`${API}/auth/check-login`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((res) => {
                if (reverse === true) {
                    if (res.data.logged_in) {
                        window.location.href = "/"
                    } else {
                        setIsLogin(true)
                    }
                } else {
                    if (!res.data.logged_in) {
                        const currUrl = window.location?.pathname;
                        window.location.href = `/login?next=${currUrl}`;
                    } else {
                        if(!validRoles || validRoles === "" || validRoles?.length === 0){
                            setIsLogin(true);
                        }else{
                            // check if user has valid role to access this page 
                            if(validRoles.includes(res.data?.role)){
                                setIsLogin(true)
                            }else{
                                window.location.href = "/"
                                console.log("not authorised");
                            }
                        }
                    }
                }
            })
                .catch((e) => {
                    console.log(e);
                })
        }
        checkLogin();
    }, [reverse, validRoles])

    return (
        <div>
            {isLogin && <Component />}
        </div>
    )
}

export default Protected