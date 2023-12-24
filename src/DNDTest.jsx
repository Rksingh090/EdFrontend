import React, { useEffect, useState } from 'react'
import "./dndtest.css";


const DNDTest = () => {

    const [data, setData] = useState([
        {
            parent: "droparea2",
            id: "drag1"
        },
        {
            parent: "droparea2",
            id: "drag2"
        },
        {
            parent: "droparea1",
            id: "drag3"
        },
        {
            parent: "droparea2",
            id: "drag4"
        },
    ])




    return (
        <div className='DNDPage'>

        </div>
    )
}
export default DNDTest