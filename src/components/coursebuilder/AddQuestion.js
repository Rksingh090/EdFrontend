import { useRef, useState } from "react";
import Switch from "../utils/Switch";

// context 
import { useCourse } from "../../context/CourseBuilderProvider";

import { HiOutlineBars2, HiOutlineArrowLeft } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import { BiImage, BiImageAdd } from "react-icons/bi";
import { slugify } from "../../functions/slugify";
import { MdOutlineDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { uploadImage } from "../../functions/uploader";
import SelectOption from "../utils/SelectOption";

// add question form 
const AddQuestion = () => {

    const { questionData, setQuestionData, addNewQuestionAndBack, updateQuestionAndBack } = useCourse();

    const [optionMode, setOptionMode] = useState("showOption")
    const optionImageRef = useRef(null);
    const questionImageRef = useRef(null);

    const [oneOption, setOneOption] = useState({
        option_name: "",
        option_value: "",
        option_image: "",
        option_format: "only_text"
    })

    const [matchingOption, setMatchingAnswer] = useState({
        option1: "",
        option2: ""
    })

    const [editOption, setEditOption] = useState({
        isEditType: true,
        optionId: ""
    });

    // update option 
    const handleAddUpdateOption = () => {
        if (editOption.isEditType) {
            const multiAnseridx = questionData.multi_answer.answer.findIndex((ans) => ans === editOption.optionId);

            let optionIdx = questionData.options.findIndex((option) => option.option_value === editOption.optionId);
            if (optionIdx === -1) {
                setOptionMode("showOption")
                setOneOption({
                    option_format: "only_text",
                    option_name: "",
                    option_value: "",
                    option_image: ""
                })
                return;
            }
            let allOptions = questionData.options;
            allOptions[optionIdx] = oneOption;

            let allAnswer = questionData.multi_answer.answer;
            if (multiAnseridx !== -1) {
                allAnswer[multiAnseridx] = oneOption.option_value
            }

            setQuestionData(prev => ({
                ...prev,
                multi_answer: {
                    answer: allAnswer,
                    max_choice: allAnswer.length
                },
                options: allOptions
            }))

            setOptionMode("showOption")
            setOneOption({
                option_format: "only_text",
                option_name: "",
                option_value: "",
                option_image: ""
            })

        } else {
            setQuestionData(data => {
                return {
                    ...data,
                    options: [
                        ...data.options,
                        oneOption
                    ]
                }
            })
            setOptionMode("showOption")
            setOneOption({
                option_format: "only_text",
                option_name: "",
                option_value: ""
            })
        }
    }

    // single choice set single_answer
    const handleChangeOptionAnswer = (option) => {
        setQuestionData({
            ...questionData,
            single_answer: option.option_value
        })
    }

    // handle multi_choice checkbox select
    const handleMultiChoiceCheck = (e) => {
        const e_value = e.target.value;
        let m_answers = questionData?.multi_answer?.answer;
        if (m_answers.includes(e_value)) {
            m_answers = m_answers.filter((ans) => ans !== e_value)
            setQuestionData(data => {
                return {
                    ...data,
                    multi_answer: {
                        max_choice: m_answers.length,
                        answer: m_answers
                    }
                }
            })
        } else {
            setQuestionData(data => {
                return {
                    ...data,
                    multi_answer: {
                        max_choice: data.multi_answer.max_choice + 1,
                        answer: [...data?.multi_answer?.answer, e_value]
                    }
                }
            })
        }

    }

    // handle matching option and create answer 
    const handleMatchingOptionAdd = () => {
        let answer = slugify(matchingOption.option1) + "-" + slugify(matchingOption.option2);

        setQuestionData(data => {
            return {
                ...data,
                matching: {
                    option1: [...data.matching.option1, matchingOption.option1],
                    option2: [...data.matching.option2, matchingOption.option2],
                    answer: [...data.matching.answer, answer]
                }
            }
        })
        setMatchingAnswer({
            option1: "",
            option: ""
        })
        setOptionMode("showOption")
    }

    // remove option from questionData 
    const removeSingleChoiceOption = (option_value) => {
        const filteredOptions = questionData.options.filter((option) => option.option_value !== option_value);
        setQuestionData(prev => ({
            ...prev,
            options: filteredOptions
        }))
        const filteredAnswers = questionData.multi_answer?.answer.filter((ans) => ans !== option_value);
        setQuestionData(prev => ({
            ...prev,
            multi_answer: {
                answer: filteredAnswers,
                max_choice: filteredAnswers.length
            }
        }))
    }

    // edit single choice option 
    const editSingleChoiceOption = (option) => {
        setOneOption(option)
        setOptionMode("showOptionEdit")
        setEditOption({
            isEditType: true,
            optionId: option.option_value
        })
    }

    // add new option 
    const handleAddNewOption = () => {
        setOptionMode("showOptionEdit")
        setEditOption({
            isEditType: false,
            optionId: ""
        })
    }

    // upload option image 
    const handleUploadImageOption = async (e) => {
        let optionType = oneOption.option_format;
        if (optionType === "only_text") return;

        const file = e.target.files[0];
        if (!file) return;

        const optionValue = new Date().getTime();
        const { imgUrl } = await uploadImage(file, "option-image", 700, 400);
        if (optionType === "only_image") {
            setOneOption(prev => ({
                ...prev,
                option_image: imgUrl
            }))
        } else {
            setOneOption(prev => ({
                ...prev,
                option_image: imgUrl,
                option_value: optionValue
            }))
        }
    }

    const handleUploadQuestionImg = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const { imgUrl } = await uploadImage(file, "question-image", 700, 400);

        setQuestionData(prev => ({
            ...prev,
            question_img: imgUrl
        }))
    }

    return (
        <div className='quizPageAddQuestion'>
            <button className="backBtnAddQue quiz90p" onClick={questionData.type === "edit" ? updateQuestionAndBack : addNewQuestionAndBack}>
                <HiOutlineArrowLeft />
                <span>Back</span>
            </button>

            <div className='quiz90p col'>
                <p className='quizFormInputText'>Write your question here</p>

                {/* question title  */}
                <input type="text"
                    value={questionData.question_title}
                    onChange={(e) => setQuestionData(data => {
                        return {
                            ...data,
                            question_title: e.target.value
                        }
                    })}
                    className='quizInput' placeholder='Question 2424' />
            </div>

            <div className='quiz90p col'>
                <p className='quizFormInputText'>Select your question type</p>
                {/* question type  */}
                <SelectOption
                    label={"Question Type"}
                    options={[
                        { text: "True/False", value: "true_false" },
                        { text: "Single Choice", value: "single_choice" },
                        { text: "Multi Choice", value: "multi_choice" },
                        { text: "Open Ended", value: "open_ended" },
                        { text: "Matching", value: "matching" },
                        { text: "Ordering", value: "ordering" },
                        { text: "Short Answer", value: "short_answer" },
                        { text: "Image", value: "image" },
                        { text: "Fill in the Blanks", value: "fill_blanks" },
                    ]}
                    value={questionData.question_type}
                    valueField={"value"}
                    textField={"text"}
                    selectStyle={{
                        minHeight: "40px"
                    }}
                    onChange={(value) =>
                        setQuestionData(data => ({
                            ...data,
                            question_type: value
                        }))
                    }
                    maxHeight={"400px"}
                />
                {/* <select className='quizInput' value={questionData.question_type} 
                onChange={(e) => setQuestionData(data => { return { ...data, question_type: e.target.value } })}
                >
                    <option disabled>Question Type</option>
                    <option value="true_false">True/False</option>
                    <option value="single_choice">Single Choice</option>
                    <option value="multi_choice">Multi Choice</option>
                    <option value="open_ended">Open Ended</option>
                    <option value="matching">Matching</option>
                    <option value="ordering">Ordering</option>
                    <option value="short_answer">Short Answer</option>
                    <option value="fill_blanks">Fill in the Blanks</option>
                    <option value="image">Image</option>
                </select> */}
            </div>

            <div className="questionImageUpload">
                <p className="quizFormInputText">Upload Image</p>
                <div className="imageOptionUpload">
                    <div className="imgGrid1">
                        {
                            questionData.question_img ?
                                (
                                    <img src={questionData.question_img} alt="" />
                                )
                                :
                                (
                                    <div>
                                        <BiImageAdd size={24} />
                                        <span>Upload Image</span>
                                    </div>
                                )
                        }
                    </div>
                    <div className="imgGrid2">
                        <p>Size: 700x430 pixels</p>
                        <p>File Support: .jpg, .jpeg, .gif, or .png</p>
                        <input ref={questionImageRef} type="file" hidden={true} onChange={handleUploadQuestionImg} />
                        <button onClick={() => questionImageRef.current && questionImageRef.current?.click()}>
                            <BiImage size={18} />
                            <span>Upload Image</span>
                        </button>
                    </div>
                </div>
                <input type="file" hidden />
            </div>

            <div className='answerRequiredOption quiz90p'>
                <div>
                    {/* answer required  */}
                    <Switch value={questionData.answer_required} onChange={() => setQuestionData(data => { return { ...data, answer_required: !data.answer_required } })} />
                    <p>Answer Required</p>
                </div>
                <div>
                    {/* randomise  */}
                    <Switch value={questionData.randomise} onChange={() => setQuestionData(data => { return { ...data, randomise: !data.randomise } })} />
                    <p>Randomise</p>
                </div>
            </div>

            <div className='quiz90p col'>
                <p className='quizFormInputText'>Point(s) for this answer</p>
                <div className='questionPointOption'>
                    {/* question point and swith for toggle display mark to student  */}
                    <input value={questionData.point} onChange={(e) => setQuestionData(data => { return { ...data, point: Number(e.target.value) } })} type="number" className='quizInput' placeholder='5' />
                    <Switch value={questionData.display_point} onChange={(e) => setQuestionData(data => { return { ...data, display_point: !data.display_point } })} />
                    <p>Display Points</p>
                </div>
            </div>

            <div className='quiz90p col pb-3'>
                <p className='quizFormInputText'>Description (Optional)</p>
                {/* quiz description  */}
                <textarea rows="6"
                    value={questionData.question_description}
                    onChange={(e) => setQuestionData(data => {
                        return {
                            ...data,
                            question_description: e.target.value
                        }
                    })}
                    className='quizInput w-full resize-none'></textarea>
            </div>

            {/* option area - true/false  */}
            {
                questionData?.question_type === "true_false" && (
                    <div className="trueFalseOption">
                        <div className="optionHeadText">
                            <p className='quizFormInputText'>Input options for the question and select the correct answer.</p>
                        </div>
                        <div className='trueFasleRadio'>
                            <div>
                                <div onClick={() => setQuestionData(data => { return { ...data, true_false_answer: true } })}>
                                    <p>True</p>
                                    <input
                                        type="radio"
                                        name="true_false"
                                        value={true}
                                        checked={questionData.true_false_answer === true}
                                        className="llInput sm"
                                        readOnly
                                    />
                                    <div className='dragTrueFalseOption'>
                                        <HiOutlineBars2 size={24} />
                                    </div>
                                </div>
                                <div onClick={() => setQuestionData(data => { return { ...data, true_false_answer: false } })}>
                                    <p>False</p>
                                    <input
                                        type="radio"
                                        name="true_false"
                                        value={false}
                                        checked={questionData.true_false_answer === false}
                                        className="llInput sm"
                                        readOnly
                                    />
                                    <div className='dragTrueFalseOption'>
                                        <HiOutlineBars2 size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* single_choice && multi_choice  */}
            {
                (questionData?.question_type === "single_choice" ||
                    questionData?.question_type === "multi_choice") && (
                    <div className="singleChoiceOption">

                        <div className="optionHeadText">
                            <p className='quizFormInputText'>Input options for the question and select the correct answer.</p>
                        </div>

                        {/* add new option form show and options list: single choice  */}
                        {optionMode === "showOption" && (
                            <div className="optionHeadText gap-3 pb-3">
                                <button className="addAndOptionBTN" onClick={handleAddNewOption}>
                                    <AiOutlinePlus size={22} />
                                    <span>Add A Option</span>
                                </button>


                                <div className="allOptionList">
                                    {questionData?.options && questionData.options.length > 0 &&
                                        questionData.options.map((option, opIdx) => (
                                            <div key={opIdx}>
                                                <p>{option?.option_name}</p>
                                                <div>
                                                    {questionData.question_type === "single_choice" && (
                                                        <input
                                                            type="radio"
                                                            onClick={() => handleChangeOptionAnswer(option)}
                                                            value={option?.option_value}
                                                            checked={questionData?.single_answer === option?.option_value}
                                                            name="true_false"
                                                            className="llInput sm"
                                                            readOnly
                                                        />
                                                    )}
                                                    {questionData.question_type === "multi_choice" && (
                                                        <input
                                                            type="checkbox"
                                                            onClick={(e) => handleMultiChoiceCheck(e)}
                                                            value={option?.option_value}
                                                            checked={questionData?.multi_answer?.answer.includes(option?.option_value)}
                                                            name="true_false"
                                                            className="llInput sm"
                                                            readOnly
                                                        />
                                                    )}
                                                    <div className='optionAction'>
                                                        <MdOutlineModeEditOutline onClick={() => editSingleChoiceOption(option)} size={22} />
                                                    </div>
                                                    <div className='optionAction'>
                                                        <MdOutlineDeleteOutline onClick={() => removeSingleChoiceOption(option?.option_value)} size={22} />
                                                    </div>
                                                    <div className='dragTrueFalseOption'>
                                                        <HiOutlineBars2 size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}

                        {/* add new option */}
                        {optionMode === "showOptionEdit" && (
                            <div className="single_choice_options">
                                <div>
                                    <div className="optionInputs">
                                        {
                                            (oneOption.option_format === "only_text" || oneOption.option_format === "both") && (
                                                <div>
                                                    <p className="quizFormInputText">Answer Title</p>
                                                    <input type="text"
                                                        value={oneOption.option_name}
                                                        onChange={(e) => setOneOption(prev => ({ ...prev, option_name: e.target.value, option_value: slugify(e.target.value) }))}
                                                        className="answerTitle" placeholder="answer title" />
                                                </div>
                                            )
                                        }

                                        {
                                            (oneOption.option_format === "only_image" || oneOption.option_format === "both") && (

                                                <div>
                                                    <p className="quizFormInputText">Upload Image</p>
                                                    <div className="imageOptionUpload">
                                                        <div className="imgGrid1">
                                                            {
                                                                oneOption.option_image ?
                                                                    (
                                                                        <img src={oneOption.option_image} alt="" />
                                                                    )
                                                                    :
                                                                    (
                                                                        <div>
                                                                            <BiImageAdd size={24} />
                                                                            <span>Upload Image</span>
                                                                        </div>
                                                                    )
                                                            }
                                                        </div>
                                                        <div className="imgGrid2">
                                                            <p>Size: 700x430 pixels</p>
                                                            <p>File Support: .jpg, .jpeg, .gif, or .png</p>
                                                            <input type="file" hidden={true} ref={optionImageRef} onChange={handleUploadImageOption} />
                                                            <button onClick={() => optionImageRef.current && optionImageRef.current?.click()}>
                                                                <BiImage size={22} />
                                                                <span>Upload Image</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <input type="file" hidden />
                                                </div>
                                            )
                                        }
                                        <div className="optionRadioButton">
                                            <p className="quizFormInputText">Display format for options</p>
                                            <div className="optionFormatRadios">
                                                <div>
                                                    <input type="radio" checked={oneOption.option_format === "only_text"} onChange={(e) => setOneOption(data => { return { ...data, option_format: e.target.value } })} name="option_formate" id="only_text" value="only_text" className="llInput sm" />
                                                    <label htmlFor="only_text">Only text</label>
                                                </div>
                                                <div>
                                                    <input type="radio" checked={oneOption.option_format === "only_image"} onChange={(e) => setOneOption(data => { return { ...data, option_format: e.target.value } })} value="only_image" id="only_image" name="option_formate" className="llInput sm" />
                                                    <label htmlFor="only_image">Only Image</label>
                                                </div>
                                                <div>
                                                    <input type="radio" checked={oneOption.option_format === "both"} onChange={(e) => setOneOption(data => { return { ...data, option_format: e.target.value } })} value="both" id="both" name="option_formate" className="llInput sm" />
                                                    <label htmlFor="both">Text & Image both</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="addOptionBtn">
                                            <button onClick={handleAddUpdateOption}>Update Answer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

            {/* fille in the blanks  */}
            {
                questionData?.question_type === "fill_blanks" && (
                    <div className="single_choice_options">
                        <div>
                            <div className="optionInputs">
                                <div>
                                    <p className="quizFormInputText">Question Title</p>
                                    <input type="text"
                                        value={questionData?.fill_blanks?.title}
                                        onChange={(e) => setQuestionData(data => { return { ...data, fill_blanks: { ...data?.fill_blanks, title: e.target.value } } })}
                                        className="answerTitle" placeholder="answer title" />
                                    <p className="infoText sm"> Please make sure to use the {"{blank}"} variable in your question title to show the blanks in your question. You can use multiple {"{blank}"} variables in one question.</p>
                                </div>

                                <div>
                                    <p className="quizFormInputText">Answer</p>
                                    <input type="text"
                                        value={questionData?.fill_blanks?.answer}
                                        onChange={(e) => setQuestionData(data => { return { ...data, fill_blanks: { ...data?.fill_blanks, answer: e.target.value } } })}
                                        className="answerTitle" placeholder="answer title" />
                                    <p className="infoText sm"> Separate multiple answers by a vertical bar |. 1 answer per {"{blank}"} variable is defined in the question. Example: Apple | Banana | Orange</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* matching  */}
            {
                questionData?.question_type === "matching" && (
                    <div className="singleChoiceOption">

                        <div className="optionHeadText">
                            <p className='quizFormInputText'>Input options for the question and select the correct answer.</p>
                        </div>

                        {/* add new option form show and options list: single choice  */}
                        {optionMode === "showOption" && (
                            <div className="optionHeadText gap-3 pb-3">

                                <div className="allOptionList">
                                    {questionData?.matching?.answer && questionData.matching.answer.length > 0 &&
                                        questionData.matching.answer.map((matchingAns, matchingIdx) => (
                                            <div key={matchingIdx}>
                                                <p>{matchingAns}</p>
                                                <div>
                                                    <div className='optionAction'>
                                                        <MdOutlineModeEditOutline size={22} />
                                                    </div>
                                                    <div className='optionAction'>
                                                        <MdOutlineDeleteOutline size={22} />
                                                    </div>
                                                    <div className='dragTrueFalseOption'>
                                                        <HiOutlineBars2 size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <button className="addAndOptionBTN" onClick={() => setOptionMode("showOptionEdit")}>
                                    <AiOutlinePlus size={22} />
                                    <span>Add A Option</span>
                                </button>
                            </div>
                        )}

                        {/* add new option */}
                        {optionMode === "showOptionEdit" && (
                            <div className="single_choice_options">
                                <div>
                                    <div className="optionInputs">
                                        <div>
                                            <p className="quizFormInputText">Answer Title</p>
                                            <input type="text"
                                                value={matchingOption.option1}
                                                onChange={(e) => setMatchingAnswer(mdata => { return { ...mdata, option1: e.target.value } })}
                                                className="answerTitle" placeholder="answer title" />
                                        </div>
                                        <div>
                                            <p className="quizFormInputText">Matched Answer Title</p>
                                            <input type="text"
                                                value={matchingOption.option2}
                                                onChange={(e) => setMatchingAnswer(mdata => { return { ...mdata, option2: e.target.value } })}
                                                className="answerTitle" placeholder="answer title" />
                                        </div>


                                        <div className="addOptionBtn">
                                            <button onClick={handleMatchingOptionAdd}>Update A Answer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

        </div>
    )
}

export default AddQuestion;