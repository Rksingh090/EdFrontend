import React, { Children } from 'react'
import './utils.css';

const ModalForm = ({ children, visible }) => {
  return (
    <div>
      {visible ?
        <div className='modalFormDiv'>
          {children}
        </div>
        : (
          <></>
        )
      }
    </div>
  )
}

export default ModalForm