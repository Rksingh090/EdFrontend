import React, { useEffect, useRef, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'

const SelectOption = ({ value, onChange, label, options, maxHeight, textField, valueField, style, selectStyle }) => {
    const [showCategoryOptions, setShowCategoryOptions] = useState(false)
    const optionRef = useRef()

    const getText = (val) => {
        let getOp = options.find((op) => walk(op, valueField) === value);
        const v = walk(getOp, textField);
        return !v ? onChange ? onChange("") : "" : v
    }


    const walk = (data, str, i = 0) => {
        if (data === undefined) return "";
        if (str === "") return data;
        const strArr = str.split(".");
        if (strArr.length - 1 === i)
            return data[strArr[i]];
        if (i >= strArr.length) return ""
        return walk(data[strArr[i]], str, i + 1)
    }

    useEffect(() => {
        if (optionRef && optionRef?.current) {
            optionRef?.current.scrollIntoView({ behavior: 'instant' });
        }
    }, [showCategoryOptions])

    return (
        <button className='customSelect' style={selectStyle} onBlur={() => setShowCategoryOptions(false)}>
            <div
                style={style}
                className='customSelectSelected'
                onClick={() => setShowCategoryOptions(prev => !prev)}
            >
                <label>{value ? getText(value) : label}</label>
                <AiFillCaretDown />
            </div>
            {showCategoryOptions &&
                <div className='customSelectOptions' style={{
                    maxHeight: maxHeight || "200px"
                }}>
                    {
                        options &&
                        options.map((op) => {
                            const text = walk(op, textField)
                            const opValue = walk(op, valueField)
                            return (
                                <p
                                    key={opValue}
                                    className={`option ${opValue === value ? "selected" : ""}`}
                                    ref={opValue === value ? optionRef : null}
                                    onClick={() => {
                                        setShowCategoryOptions(false)
                                        if (opValue === value) {
                                            onChange && onChange("")
                                        } else {
                                            onChange && onChange(opValue)
                                        }
                                    }}
                                >
                                    {text}
                                </p>
                            )
                        })
                    }
                </div>
            }
        </button>
    )
}

export default SelectOption