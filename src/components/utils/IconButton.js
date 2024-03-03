import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const IconButton = ({ style, onClick, noText, type, loading, loadingSize, Icon, text, classList }) => {
  return (
    <button
      disabled={loading}
      type={type || "button"}
      onClick={onClick}
      className={`iconBtn gap1 ${classList || ""}`}
      style={style}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className={"iconLoading"} size={loadingSize || 17} />
      ) : Icon}
      {!noText && <span>{text}</span>}
    </button>
  )
}

export default IconButton