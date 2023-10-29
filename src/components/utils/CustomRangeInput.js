import React from 'react'

const CustomRangeInput = ({ value, min, max, step, onChange, className, onMouseUp, onMouseDown }) => {
    return (
        <div className='customRangeInputWrapper'>
            <input
                type="range"
                className={`customRangeInput ${className || ""}`}
                value={value ? value : min || 0}
                min={min || 0}
                max={max || 1}
                step={step || 0.01}
                onChange={onChange || null}
                onMouseDown={onMouseDown || null}
                onMouseUp={onMouseUp || null}
            />
            <div className="fillarea" style={{
                width: ((value || 1) * 100) / (max || 100) + `%`
            }}>

            </div>
        </div>
    )
}

export default CustomRangeInput