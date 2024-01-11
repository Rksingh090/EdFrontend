import React from 'react'
import "../styles/others.css";
import ErrorBase from './ErrorBase';

import E404SVG from "../../assets/svg/404.svg";

const ErrorPage = () => {
    return (
        <ErrorBase heading={"Error 404"} img={E404SVG} subheading={"The page you are looking for does't exist or an other error occurred."} />
    )
}

export default ErrorPage