import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div className='progressBarContainer'>
        <div className='progressBarPro' style={{"--progress": progress+"%"}}></div>
    </div>
  )
}

export default ProgressBar