import { useState } from "react";
import ModalForm from "../utils/ModalForm";
import Switch from "../utils/Switch";
import AddQuestion from "./AddQuestion";

import { useCourse } from "../../context/CourseBuilderProvider";

import { BiGridVertical } from "react-icons/bi";
import { BsGearFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { RiAddBoxFill } from "react-icons/ri";

import { IconQuestionType } from "../utils/IconQuestionType";
import { QuizFormFooter } from "./FormFooter";

// add quiz form 
const AddNewQuiz = ({ quizVisibility }) => {
    const [showAdvanceMenu, setShowAdvanceMenu] = useState(false)


    const {
        quizUpdateData: { isEditType },
        quizPage, setQuizPage,
        handleFormSubmitPage1,
        setQuestionId, quizData,
        setQuizData, questionData, setQuestionData,
        addNewQuestionAndBack,
        updateQuestionAndBack, updateQuizDataAndClose, closeQuizForm } = useCourse();


    // edit created question: fill data 
    const handleEditQuestion = (question) => {
        setQuestionId(question._id);
        setQuizPage("addQue")
        setQuestionData({
            type: "edit",
            ...question
        })
    }

    // add new question: show emtry form
    const handleAddNewQuestion = () => {
        try {
            setQuizPage("addQue")
            setQuestionData({
                type: "new",
                question_title: "",
                question_description: "",
                point: 1,
                display_point: true,
                options: [
                ],
                ordering: {
                    randomize: true,
                    orders: [],
                    ordering_answer: [],
                },
                matching: {
                    option1: [],
                    option2: [],
                    answer: []
                },
                single_answer: "",
                multi_answer: {
                    max_choice: 1,
                    answer: []
                },
                image: {
                    image_url: "",
                    answer: ""
                },
                true_false_answer: true,
                question_type: "true_false",
                answer_required: false,
                randomise: true
            })
        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <ModalForm visible={quizVisibility}>
            <div className='quizForm'>
                {/* quiz form header  */}
                <div className="quizFormHeader">
                    <div className='widthManager flex gap-y-4 flex-col'>
                        <h2 className='quizHeadText'>Quiz</h2>
                        <div className='quizProgress'>
                            <div className='quizProgressText'>
                                <div style={{ textAlign: "left" }}>Quiz Info</div>
                                <div></div>
                                <div style={{ textAlign: "center" }}>Questions</div>
                                <div></div>
                                <div style={{ textAlign: "right" }}>Setting</div>
                            </div>
                            <div className='quizProgressLine'>
                                <div
                                    className={`quizNumber ${(quizPage >= 1 || quizPage === "addQue") && "fillLine"}`}
                                    onClick={() => setQuizPage(1)}
                                >
                                    1
                                </div>
                                <div className={`quizLine ${(quizPage >= 2 || quizPage === "addQue") && "fillLine"}`}></div>
                                <div
                                    className={`quizNumber ${(quizPage >= 2 || quizPage === "addQue") && "fillLine"}`}
                                    onClick={() => setQuizPage(2)}
                                >
                                    2
                                </div>
                                <div className={`quizLine ${quizPage >= 3 && "fillLine"}`}></div>
                                <div
                                    className={`quizNumber ${quizPage >= 3 && "fillLine"}`}
                                    onClick={() => setQuizPage(3)}
                                >
                                    3
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* quiz form body */}
                <div className="quizFormBody">
                    <div className='centerBody'>
                        {/* page 1  */}
                        {quizPage === 1 && (
                            <div className='quizFormPage1'>
                                <div className="qfpInputDiv">
                                    <p className='quizFormInputText'>Quiz Title</p>
                                    <input type="text" value={quizData.quiz_title}
                                        onChange={(e) => setQuizData({ ...quizData, quiz_title: e.target.value })}
                                        placeholder='Quiz title here' className='quizFormInput' />
                                </div>
                                <div className="qfpInputDiv">
                                    <p className='quizFormInputText'>Summary</p>
                                    <textarea value={quizData.quiz_description} onChange={(e) =>
                                        setQuizData({ ...quizData, quiz_description: e.target.value })}
                                        rows="6" className='quizFormInput'></textarea>
                                </div>
                                <div className="qfpInputDiv">
                                    <p>Enable Course Preview</p>
                                    <Switch value={quizData.preview_available} onChange={(value) => setQuizData((prev) => ({ ...prev, preview_available: value }))} />
                                </div>
                            </div>
                        )}

                        {/* page 2  */}
                        {quizPage === 2 && (
                            <div className='quizFormPage2'>

                                {/* questions list  */}
                                {quizData.questions && quizData.questions?.length > 0 &&
                                    quizData.questions.map((question, qIdx) => {

                                        let type = "";
                                        switch (question.question_type) {
                                            case "single_choice":
                                                type = "Single Choice";
                                                break;
                                            case "true_false":
                                                type = "True/False";
                                                break;
                                            case "multi_choice":
                                                type = "Multi Choice";
                                                break;
                                            case "open_ended":
                                                type = "Open Ended";
                                                break;
                                            case "image":
                                                type = "Image";
                                                break;
                                            case "fill_blanks":
                                                type = "Fill in the Blank";
                                                break;
                                            case "short_answer":
                                                type = "Short Answer";
                                                break;
                                            case "matching":
                                                type = "Matching";
                                                break;
                                            case "ordering":
                                                type = "Ordering";
                                                break;
                                            default:
                                                type = "N/A"
                                                break;
                                        }

                                        return (
                                            <div className='singleQuestion' key={qIdx}>
                                                <BiGridVertical className='dragBtn' size={25} />
                                                <p>{question.question_title}</p>

                                                <IconQuestionType questionType={question.question_type} />

                                                <p> {type} </p>
                                                <div className='quizQueContextMenu' onClick={() => handleEditQuestion(question)}>
                                                    <MdOutlineModeEditOutline size={22} />
                                                </div>
                                                <div className='quizQueContextMenu'>
                                                    <MdOutlineDelete size={22} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <button className='quizAddQuestionBtn' onClick={handleAddNewQuestion}>
                                    <RiAddBoxFill size={25} />
                                    <p>Add Question </p>
                                </button>
                            </div>
                        )}

                        {/* page 3  */}
                        {quizPage === 3 && (
                            <div className='quizFormPage3 py-8'>

                                {/* page 3 time limit  */}
                                <div className='quizFormPage3Time'>
                                    <p className='quizFormInputText'>Time Limit</p>
                                    <div className='quizFormTimeInput'>

                                        {/* time limit input:number  */}
                                        <input type="number"
                                            value={quizData.time_limit.limit}
                                            onChange={(e) => setQuizData(data => {
                                                return {
                                                    ...data,
                                                    time_limit: { ...data.time_limit, limit: Number(e.target.value) }
                                                }
                                            })}
                                            className='quizInput timeInput' />

                                        {/* time limit type select */}
                                        <select
                                            value={quizData.time_limit.limit_type}
                                            onChange={(e) => setQuizData(data => {
                                                return {
                                                    ...data,
                                                    time_limit: {
                                                        ...data.time_limit,
                                                        limit_type: e.target.value
                                                    }
                                                }
                                            })}
                                            className='quizInput timeInput'>
                                            <option value="second">Seconds</option>
                                            <option value="minute">Minutes</option>
                                            <option value="hour">Hours</option>
                                            <option value="day">Days</option>
                                            <option value="week">Weeks</option>
                                        </select>

                                        {/* time limit show toggle switch */}
                                        <div className='flex items-center gap-4'>
                                            <div className='cursor-pointer'>
                                                <Switch value={quizData.time_limit.show_time_limit}
                                                    onChange={(e) => setQuizData(data => {
                                                        return {
                                                            ...data,
                                                            time_limit: { ...data.time_limit, show_time_limit: !data.time_limit.show_time_limit }
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <p>Hide quiz time - display</p>
                                        </div>

                                    </div>
                                    <p className='infoText sm'>Time limit for this quiz. 0 means no time limit.</p>
                                </div>

                                {/* quiz feedback  */}
                                <div className='quizFormPage3Feedback'>
                                    <div>
                                        <p className='quizFormInputText'>Quiz Feedback Mode</p>
                                        <p className='infoText sm'>(Pick the quiz system"s behaviour on choice based questions.)</p>
                                    </div>

                                    {/* question feedback radio  */}
                                    <div className='quizFeedbackMode'>
                                        <div className="feedbackRadio" onClick={() => setQuizData({ ...quizData, feedback_mode: "default" })}>
                                            <div>
                                                <input type="radio"
                                                    name='quizFeedback'
                                                    checked={quizData.feedback_mode === "default"}
                                                    className="llInput sm"
                                                    readOnly
                                                />
                                            </div>
                                            <p>Default</p>
                                            <div></div>
                                            <p className='infoText xs'>Answers shown after quiz is finished</p>
                                        </div>
                                        <div className="feedbackRadio" onClick={() => setQuizData({ ...quizData, feedback_mode: "reveal_mode" })}>
                                            <div>
                                                <input type="radio"
                                                    name='quizFeedback'
                                                    checked={quizData.feedback_mode === "reveal_mode"}
                                                    className="llInput sm"
                                                    readOnly
                                                />
                                            </div>
                                            <p>Reveal Mode</p>
                                            <div></div>
                                            <p className='infoText xs'>Show result after the attempt.</p>
                                        </div>
                                        <div className="feedbackRadio" onClick={() => setQuizData({ ...quizData, feedback_mode: "retry_mode" })}>
                                            <div>
                                                <input type="radio"
                                                    name='quizFeedback'
                                                    checked={quizData.feedback_mode === "retry_mode"}
                                                    className="llInput sm"
                                                    readOnly
                                                />
                                            </div>
                                            <p>Retry Mode</p>
                                            <div></div>
                                            <p className='infoText xs'>Reattempt quiz any number of times. Define Attempts Allowed below.</p>
                                        </div>
                                    </div>

                                </div>

                                {/* passign grade input:number  */}
                                <div className="quizPassingGrade">
                                    <p className='quizFormInputText'>Passing Grade (%)</p>
                                    <input type="number" placeholder='10'
                                        value={quizData.passing_mark}
                                        onChange={(e) => setQuizData({ ...quizData, passing_mark: Number(e.target.value) })}
                                        className='quizInput passGradeInp' />
                                    <p className='infoText sm'>Set the passing percentage for this quiz</p>
                                </div>

                                <div className="quizPassingGrade">
                                    <p className='quizFormInputText'>Max questions allowed to answer</p>
                                    <input type="number" placeholder='10' value={quizData.max_answers} onChange={(e) => setQuizData({ ...quizData, max_answers: Number(e.target.value) })} className='quizInput passGradeInp' />
                                    <p className='infoText sm'>This amount of question will be available for students to answer, and question will comes randomly from all available questions belongs with a quiz, if this amount greater than available question, then all questions will be available for a student to answer.</p>
                                </div>

                                {/* advance setting page 3 */}
                                <div className='advanceSettingContainer'>

                                    {/* advance setting context toggle button  */}
                                    <div className='advanceMenu ' onClick={() => setShowAdvanceMenu(!showAdvanceMenu)}>
                                        <div className='iconCenter gearIcon'><BsGearFill /></div>
                                        <h4 className='advanceSettingH4'>Advance Setting</h4>
                                        <div className={`iconCenter arrowDown ${showAdvanceMenu && "rotate180deg"}`}><IoIosArrowDown /></div>
                                    </div>

                                    <div className={`${showAdvanceMenu ? "showAdvMenu" : "hideAdvMenu"} advContextMenu`}>

                                        {/* auto start quiz switch  */}
                                        <div className='flex gap-y-2 flex-col'>
                                            <div className='flex items-center gap-x-2'>
                                                <Switch
                                                    value={quizData.advance.auto_start_quiz}
                                                    onChange={() => setQuizData(data => {
                                                        return {
                                                            ...data,
                                                            advance: {
                                                                ...data.advance,
                                                                auto_start_quiz: !data.advance.auto_start_quiz
                                                            }
                                                        }
                                                    })}
                                                />
                                                <span className='font-[500]'>Quiz Auto Start</span>
                                            </div>
                                            <p className='infoText sm'>If you enable this option, the quiz will start automatically after the page is loaded.</p>
                                        </div>

                                        <div className='questionLayoutMode'>
                                            {/* question layout select  */}
                                            <div>
                                                <p className='quizFormInputText'>Question Layout</p>
                                                <select className='quizInput'
                                                    value={quizData.question_layout}
                                                    onChange={(e) => setQuizData(data => {
                                                        return {
                                                            ...data,
                                                            question_layout: e.target.value
                                                        }
                                                    })}
                                                >
                                                    <option value="" disabled>Set Question Layout</option>
                                                    <option value="single_question">Single Question</option>
                                                    <option value="question_pagination">Question Pagination</option>
                                                    <option value="question_below">Question Below Each Other</option>
                                                </select>
                                            </div>

                                            {/* question order select  */}
                                            <div>
                                                <p className='quizFormInputText'>Questions Order</p>
                                                <select className='quizInput'
                                                    value={quizData.question_order}
                                                    onChange={(e) => setQuizData(data => {
                                                        return {
                                                            ...data,
                                                            question_order: e.target.value
                                                        }
                                                    })}
                                                >
                                                    <option value="random">Random</option>
                                                    <option value="sorting">Sorting</option>
                                                    <option value="ascending">Ascending</option>
                                                    <option value="descending">Descending</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* show question numbering to student switch  */}
                                        <div className='flex gap-y-2 flex-col w-full'>
                                            <div className='flex items-center gap-x-2'>
                                                <Switch
                                                    value={quizData.advance.show_question_number}
                                                    onChange={(e) => setQuizData(data => {
                                                        return {
                                                            ...data,
                                                            advance: {
                                                                ...data.advance,
                                                                show_question_number: !quizData.show_question_number
                                                            }
                                                        }
                                                    })} />
                                                <span className='font-[500]'>Hide question number</span>
                                            </div>
                                            <p className='infoText sm'>Show/hide question number during attempt.</p>
                                        </div>

                                        {/* limit for short answer input:number  */}
                                        <div className='flex gap-y-2 flex-col w-full mt-3'>
                                            <p className='quizFormInputText'>Short answer characters limit</p>
                                            <input
                                                value={quizData.advance.short_answer_limit}
                                                onChange={(e) => setQuizData(data => {
                                                    return {
                                                        ...data,
                                                        advance: {
                                                            ...data.advance,
                                                            short_answer_limit: Number(e.target.value)
                                                        }
                                                    }
                                                })}
                                                type="number" className='quizInput' />
                                            <p className='infoText sm'>Student will place answer in short answer question type within this characters limit.</p>
                                        </div>

                                        {/* limit for essay input:number  */}
                                        <div className='flex gap-y-2 flex-col w-full mt-3'>
                                            <p className='quizFormInputText'>Open-Ended/Essay questions answer character limit</p>
                                            <input
                                                value={quizData.advance.essay_limit}
                                                onChange={(e) => setQuizData(data => {
                                                    return {
                                                        ...data,
                                                        advance: {
                                                            ...data.advance,
                                                            essay_limit: Number(e.target.value)
                                                        }
                                                    }
                                                })}
                                                type="number" className='quizInput' />
                                            <p className='infoText sm'>Students will place the answer in the Open-Ended/Essay question type within this character limit.</p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        )}

                        {/* add question to quiz  */}
                        {quizPage === "addQue" && <AddQuestion allQuestions={quizData} questionData={questionData} setQuestionData={setQuestionData} onBack={() => setQuizPage(2)} />}

                    </div>
                </div>

                {/* quiz form footer  */}
                <div className="quizFormFooter">
                    {quizPage === 1 && <QuizFormFooter onSubmit={isEditType === true ? () => setQuizPage(2) : handleFormSubmitPage1} submitText={"Next"} onCancle={closeQuizForm} />}
                    {quizPage === 2 && <QuizFormFooter onSubmit={() => setQuizPage(3)} submitText={"Save & Next"} enableBack={true} onBack={() => setQuizPage(1)} onCancle={closeQuizForm} />}
                    {quizPage === 3 && <QuizFormFooter onSubmit={updateQuizDataAndClose} submitText={"Submit"} enableBack={true} onBack={() => setQuizPage(2)} onCancle={closeQuizForm} />}
                    {quizPage === "addQue" && <QuizFormFooter onSubmit={questionData.type === "edit" ? updateQuestionAndBack : addNewQuestionAndBack} submitText={questionData.type === "edit" ? "Update" : "Add Question"} onCancle={closeQuizForm} />}
                </div>

            </div>
        </ModalForm>
    )
}


export default AddNewQuiz