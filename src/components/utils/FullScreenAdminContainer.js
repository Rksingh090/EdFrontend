import React, { useEffect, useRef, useState } from 'react'
import { IoScanOutline } from 'react-icons/io5';
import { FaAngleDown } from "react-icons/fa6";

const FullScreenAdminContainer = ({ children, title, headers, ref, ...props }) => {
    const elemref = useRef(null);
    const tableHeadingHeight = useRef(null);
    const tableRef = useRef(null);


    const [initialHeight, setInitialHeight] = useState("auto");
    const [tableHeight, setTableHeight] = useState("auto");

    const toggleFullscreen = async () => {
        if (document?.fullscreenElement === null) {
            await elemref.current?.requestFullscreen()
        }
        else {
            await document.exitFullscreen()
        }
    }

    const toggleHeight = () => {
        if (tableHeadingHeight.current) {
            const height = tableHeadingHeight?.current?.getBoundingClientRect()?.height;
            if (tableHeight === "auto" || tableHeight === initialHeight) {
                setTableHeight(height)
            } else {
                setTableHeight(initialHeight)
            }
        }
    }

    useEffect(()=>{
        if(tableRef?.current){
            setTimeout(() => {
                const tHeight = tableRef?.current?.getBoundingClientRect()?.height;
                setInitialHeight(tHeight)
                setTableHeight(tHeight)
            }, 2000);
        }
    },[])



    return (
        <div {...props} ref={elemref}>
            <div className='tableContainer dashboard' ref={tableRef} style={{ height: tableHeight }}>
                <div className='tableHeading' ref={tableHeadingHeight}>
                    <h2 className='heading'>{title}</h2>
                    <div>
                        {headers}
                        <div className='right'>
                            <IoScanOutline onClick={toggleFullscreen} />
                            <FaAngleDown size={20} onClick={toggleHeight} />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default FullScreenAdminContainer