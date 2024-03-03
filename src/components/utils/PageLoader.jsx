import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const PageLoader = () => {
  return (
    <div className='pageLoader'>
        <AiOutlineLoading3Quarters className={"iconLoading"} size={35} />
    </div>
  )
}

export default PageLoader