import React, { useEffect, useRef, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'

const SelectOption = ({
    classes, value, onChange, label, options,
    maxHeight, textField, valueField, style, selectStyle,
    iconField,
    optionClass
}) => {
    const [showCategoryOptions, setShowCategoryOptions] = useState(false)

    const selectRef = useRef()
    const optionRef = useRef()


    const getText = (val) => {
        let getOp = options.find((op) => walk(op, valueField) === val);
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
            optionRef?.current.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'start' });
        }
    }, [showCategoryOptions])

    useEffect(() => {
        const closeOptions = (event) => {
            if (selectRef.current && selectRef.current.contains(event.target)) {
                return;
            }
            setShowCategoryOptions(false);
        };

        // Add an event listener to handle clicks outside of the component
        document.addEventListener('click', closeOptions);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', closeOptions);
        };
    }, [selectRef]);


    const toggleOptions = (event) => {
        // Prevent the document click event from immediately closing the options
        // event.stopPropagation(); 
        setShowCategoryOptions((prev) => !prev);
    };

    const handleSelectClick = (event) => {
        // Prevent the document click event from immediately closing the options
        // event.stopPropagation(); 
        console.log("Clicked");
    };

    return (
        <button
            className={`customSelect ${classes ? classes : ""}`}
            style={selectStyle}
            onClick={handleSelectClick}
            ref={selectRef}
        // onBlur={() => setShowCategoryOptions(false)}
        // onMouseOutCapture={() => setShowCategoryOptions(false)}
        >
            <div
                style={style}
                className='customSelectSelected'
                onClick={toggleOptions}
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
                            const text = walk(op, textField);
                            const opValue = walk(op, valueField);

                            const icon = iconField ? walk(op, iconField) : null;

                            return (
                                <p
                                    key={opValue}
                                    className={`option ${optionClass ? optionClass : ""} ${opValue === value ? "selected" : ""}`}
                                    ref={opValue === value ? optionRef : null}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowCategoryOptions(false)
                                        if (opValue === value) {
                                            onChange && onChange("")
                                        } else {
                                            onChange && onChange(opValue ?? "")
                                        }
                                    }}
                                >
                                    {icon && icon} <span>{text ? text : ""}</span>
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