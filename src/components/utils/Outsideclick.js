import { useEffect, useRef } from "react";

const OutsideClick = ({ children, className, onOutsideClick }) => {
    const wrapperRef = useRef();


    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            onOutsideClick();
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])


    return (
        <ul ref={wrapperRef} className={className}>
            {children}
        </ul>
    )
}

export const DivOutsideClick = ({ children, className, onOutsideClick }) => {
    const divRef = useRef();


    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            onOutsideClick();
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])


    return (
        <div ref={divRef} className={className}>
            {children}
        </div>
    )
}

export default OutsideClick;