import { BsCircleHalf } from "react-icons/bs";
import { RiFullscreenExitFill } from "react-icons/ri";
import { FaCheck, FaCheckDouble, FaHourglassStart, FaSortAlphaUp } from "react-icons/fa";
import { TbArrowsRightLeft } from "react-icons/tb";
import { ImTextWidth } from "react-icons/im";
import { BiImage } from "react-icons/bi";

import "./utils.css"

export const getTitle = (questionType) => {
    switch (questionType) {
        case "true_false":
            return "True False";
        case "single_choice":
            return "Single Choice";
        case "multi_choice":
            return "Multi Choice";
        case "open_ended":
            return "Open Ended";
        case "image":
            return "Image";
        case "fill_blanks":
            return "FIll In the Blanks";
        case "short_answer":
            return "Short Answer";
        case "matching":
            return "Match the following";
        case "ordering":
            return "ordering";
        default:
            return "";

    }
}

export const IconQuestionType = ({ size, questionType }) => {
    const getBgColor = () => {
        switch (questionType) {
            case "true_false":
                return "#5c37ff";
            case "single_choice":
                return "#00B890";
            case "multi_choice":
                return "#9034A9";
            case "open_ended":
                return "#FE3129";
            case "image":
                return "#A322F9";
            case "fill_blanks":
                return "#FFBF00";
            case "short_answer":
                return "#F37512";
            case "matching":
                return "#8A4A1B";
            case "ordering":
                return "#1B52D8";
            default:
                return "";
        }
    }

    return (
        <div className='quizQueType' title={getTitle(questionType)} style={{
            backgroundColor: getBgColor(),
            height: size ? size : 35
        }}>
            {questionType === "true_false" && <BsCircleHalf size={23} />}
            {questionType === "single_choice" && <FaCheck size={23} />}
            {questionType === "multi_choice" && <FaCheckDouble size={23} />}
            {questionType === "open_ended" && <ImTextWidth size={23} />}
            {questionType === "image" && <BiImage size={23} />}
            {questionType === "short_answer" && <RiFullscreenExitFill size={23} />}
            {questionType === "fill_blanks" && <FaHourglassStart size={23} />}
            {questionType === "matching" && <TbArrowsRightLeft size={23} />}
            {questionType === "ordering" && <FaSortAlphaUp size={23} />}
        </div>
    )
}