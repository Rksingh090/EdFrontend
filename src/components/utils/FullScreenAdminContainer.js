import React, { useRef } from 'react'
import { IoScanOutline } from 'react-icons/io5';

const FullScreenAdminContainer = ({ children, title, headers, ref, ...props }) => {
    const elemref = useRef(null);

    const toggleFullscreen = async () => {
        if (document?.fullscreenElement === null) {
            await elemref.current?.requestFullscreen()
        }
        else {
            await document.exitFullscreen()
        }
    }
    
    return (
        <div {...props} ref={elemref}>
            <div className='tableContainer dashboard'>
                <div className='tableHeading'>
                    <h2 className='heading'>{title}</h2>
                    <div>
                        {headers}
                        <IoScanOutline onClick={toggleFullscreen} />
                    </div>
                </div>
            {children}
            </div>
        </div>
    )
}

export default FullScreenAdminContainer