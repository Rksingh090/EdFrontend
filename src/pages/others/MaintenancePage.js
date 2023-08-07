import React from 'react'
import ErrorBase from './ErrorBase'

const MaintainancePage = () => {
  return (
    <ErrorBase heading={"Service Unavailable 503"} subheading={"This page is under maintainance"} img={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/maintain.jpg"} />
  )
}

export default MaintainancePage