import React from 'react'
import ErrorBase from './ErrorBase'
import MaintenanceSVG from '../../assets/svg/maintenance.svg';

const MaintainancePage = () => {
  return (
    <ErrorBase
      heading={"Under Maintenance"}
      subheading={"This page is under maintainance"}
      img={MaintenanceSVG}
    />
  )
}

export default MaintainancePage