import React, { useEffect, useState } from 'react'
import './utils.css';

const Switch = ({ value, onChange, className, title }) => {
    const [checked, setChecked] = useState(value)

    useEffect(() => {
        setChecked(value)
    }, [value])
    return (
        <div title={title} className={`switch ${className} ${checked ? "active" : "inactive"} cursor-pointer`} onClick={() => {
            onChange(!checked)
        }}>
            <div className={`switchBall`}></div>
        </div>
    )
}

export default Switch