import React from 'react'
import "../styles/others.css";
import ErrorBase from './ErrorBase';

const ErrorPage = () => {
    return (
        <ErrorBase heading={"Error 404"} img={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/elephant.jpg"} subheading={"The page you are looking for does't exist or an other error occurred."} />
    )
}

export default ErrorPage