import React, { useEffect, useState } from 'react'
import CourseContentBase from './CourseContentBase'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API } from '../../constant';
import { shuffle } from '../../functions/suffle';
import { IconQuestionType, getTitle } from '../../components/utils/IconQuestionType';
import ItemViewWrapper from './ItemViewWrapper';

const NewQuizAttempt = () => {

    const { quiz_id } = useParams();

    const [quizData, setQuizData] = useState();

    const [quizStarted, setQuizStarted] = useState("not_started");
    const [currQuestion, setCurrentQuestion] = useState("not_started");
    const [currQuestionData, setCurrentQuestionData] = useState({});
    const [totalAttempted, setTotalAttempted] = useState(0);

    const [enrollmentData, setEnrollmentData] = useState({
        enrollment: false,
        preview_available: false
    })

    // all answer array
    const [allAnswers, setAllAnswers] = useState([]);

    // single answer
    const [singleAnswer, setSingleAnswer] = useState({
        question_type: "",
        question_id: "",
        question_answer: ""
    });


    // get quiz data 
    useEffect(() => {
        const getQuizData = (quizId) => {
            try {
                axios.get(`${API}/quiz/id/${quizId}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        const { status, quiz, enrollment, preview_available } = res.data;
                        setEnrollmentData({
                            enrollment,
                            preview_available
                        })
                        if (status === "success") {
                            setQuizData(quiz)
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
        if (!quiz_id || quiz_id === "" || quiz_id === null || quiz_id === undefined) return;
        getQuizData(quiz_id)
    }, [quiz_id]);

    // set quiz question 
    useEffect(() => {
        if (quizStarted === "not_started") return;
        if (currQuestion === "not_started") return;
        if (quizData?.questions.length === 0) return;
        if (quizData?.questions.length <= currQuestion) return;

        let currQue = quizData?.questions[currQuestion];

        setCurrentQuestionData(currQue);
        if (currQue.question_type === "multi_choice") {
            setSingleAnswer({ question_answer: [], question_id: currQue?._id, question_type: currQue?.question_type });
        } else if (currQue.question_type === "matching") {
            let option1Suffled = shuffle(currQue.matching?.option1)
            let option2Suffled = shuffle(currQue.matching?.option2)
            setCurrentQuestionData(prev => ({
                ...prev,
                matching: {
                    ...prev.matching,
                    option1: option1Suffled,
                    option2: option2Suffled
                }
            }))
            let fillBlanksOption = currQue.matching.option1.map((op) => ({ user_answer: "", build_answer: "" }));
            setSingleAnswer({ question_answer: fillBlanksOption, question_id: currQue?._id, question_type: currQue?.question_type });
        }
        else if (currQue.question_type === "fill_blanks") {
            let blanksCount = (String(currQue?.fill_blanks?.title).toLowerCase().match(/{blank}/g) || []).length;
            let qa = [];
            for (let i = 0; i < blanksCount; i++) {
                qa.push("");
            }
            setSingleAnswer({ question_answer: qa, question_id: currQue?._id, question_type: currQue?.question_type })
        } else {
            setSingleAnswer({ question_answer: "", question_id: currQue?._id, question_type: currQue?.question_type });
        }
    }, [currQuestion]);


    // handle start quiz 
    const handleStartQuiz = () => {
        if (quizData?.questions.length > 0) {
            setCurrentQuestion(0);
            // set quiz state: started
            setQuizStarted("started")
        } else {
            // show no question page on empty question in quiz
            setQuizStarted("no_questions")
        }
    }

    // go to next question 
    const goToNextQuestion = () => {
        if (currQuestion === quizData?.questions.length - 1) {
            setQuizStarted("ended")
            submitQuizAnswer(singleAnswer);
            return;
        }

        setAllAnswers(prev => ([
            ...prev,
            singleAnswer
        ]));

        if (singleAnswer.question_answer !== "" || singleAnswer.question_answer.length !== 0) {
            setTotalAttempted(prev => prev + 1);
        }

        setCurrentQuestion(prev => prev + 1);
    }

    // submit quiz answer 
    const submitQuizAnswer = (lastAnswer) => {
        try {
            const totalAnswers = [
                ...allAnswers,
                lastAnswer
            ];
            axios.post(`${API}/quiz-attempts/quiz/${quizData?._id}`, { answers: totalAnswers },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                .then((res) => {
                    const { status } = res.data;
                    if (status === "success") {
                        console.log("quiz submitted successfully");
                    }
                });
        } catch (error) {
            console.warn(error);
        }
    }

    // handle multi choice option 
    const handleMultiChoiceSelect = (e) => {
        // check if answer is already in question_answer array
        const { value } = e.target;

        const isInArray = singleAnswer.question_answer.findIndex((ans) => String(ans) === String(value));

        if (isInArray !== -1) {
            let removeFromArray = singleAnswer.question_answer.filter((ans) => String(ans) !== String(value));
            setSingleAnswer(prev => ({ ...prev, question_answer: removeFromArray }))
        } else {
            console.log(currQuestionData?.multi_answer?.max_choice);
            console.log(singleAnswer.question_answer?.length);

            if (singleAnswer.question_answer?.length >= currQuestionData?.multi_answer?.max_choice) {
                alert(`Select at most ${currQuestionData.multi_answer.max_choice} options only.`)
                return;
            }
            setSingleAnswer(prev => ({ ...prev, question_answer: [...prev.question_answer, value] }))
        }
    }

    // answer matching 
    const handleMatchingAnswer = (e, idx) => {
        const { value } = e.target;
        let qA = singleAnswer.question_answer;
        qA[idx].user_answer = value;

        const splitedValue = value.split("-");
        let [opIdx1, opIdx2] = splitedValue;

        opIdx1 -= 1
        opIdx2 -= 1

        if (opIdx1 < 0 || opIdx2 < 0) {
            qA[idx].error = `Invalid Option 0`
        }
        else if (splitedValue.length > 2) {
            qA[idx].error = `Invalid Format`
        } else if (splitedValue.length === 1) {
            qA[idx].error = `Invalid format Eg. 2-1`
        } else if (
            opIdx1 >= singleAnswer.question_answer?.length &&
            opIdx2 >= singleAnswer.question_answer?.length
        ) {
            qA[idx].error = `Invalid Option ${opIdx1} and ${opIdx2}`
        } else if (
            opIdx2 >= singleAnswer.question_answer?.length
        ) {
            qA[idx].error = `Invalid Option ${opIdx2}`
        } else if (
            opIdx1 >= singleAnswer.question_answer?.length
        ) {
            qA[idx].error = `Invalid Option ${opIdx1}`
        } else {
            qA[idx].error = ``
            const option1 = currQuestionData.matching?.option1[opIdx1];
            const option2 = currQuestionData.matching?.option2[opIdx2];
            qA[idx].build_answer = option1 + "-" + option2;
            qA[idx].option1 = option1
            qA[idx].option2 = option2
        }


        setSingleAnswer(prev => ({
            ...prev,
            question_answer: qA
        }))
    }

    return (
        <CourseContentBase>
            <ItemViewWrapper validAccess={enrollmentData.enrollment && enrollmentData.preview_available} >
                <div className='quizstarted'>
                    {quizStarted === "started" && (
                        <div className='SingleQuestion'>
                            <div className='questionMeta'>
                                <p>Question No: {Number(currQuestion) + 1}/{quizData?.questions.length}</p>
                                <p>Total Attempted: {totalAttempted}/{quizData?.questions.length}</p>
                                <div className='flex items-center gap-2'>
                                    <span>Question Type: </span>
                                    <span>{getTitle(currQuestionData?.question_type)}</span>
                                    <IconQuestionType size={25} questionType={currQuestionData?.question_type} />
                                </div>
                            </div>
                            <div className='questionArea'>

                                {currQuestionData?.question_type === "fill_blanks"
                                    ? (
                                        <h2 className='questionTitle'>{Number(currQuestion) + 1}. {String(currQuestionData?.fill_blanks?.title).replaceAll("{blank}", " _____ ")}</h2>
                                    )
                                    :
                                    (
                                        <h2 className='questionTitle'>{Number(currQuestion) + 1}. {currQuestionData?.question_title}</h2>
                                    )}

                                {
                                    currQuestionData?.question_img && (
                                        <div className='singleQuestionImage'>
                                            <img src={currQuestionData?.question_img} className='singleQuestionImage' alt="" />
                                        </div>
                                    )
                                }

                                {/* single_choice question view */}
                                {currQuestionData?.question_type === "single_choice" && (
                                    <div className='singleChoiceContainer'>
                                        {currQuestionData.options && currQuestionData.options && (
                                            currQuestionData.options.map((option, opIdx) => {
                                                return (
                                                    <div className='singleChoiceSingleOption' key={option?._id}>
                                                        <input
                                                            type="radio"
                                                            onChange={(e) => setSingleAnswer(prev => ({ ...prev, question_answer: e.target.value }))}
                                                            name={currQuestionData?._id} id={`${currQuestionData?._id}-${opIdx}`} value={option.option_value}
                                                            className='llInput'
                                                        />
                                                        {

                                                            option.option_format === "only_text" && (
                                                                <label className="singleChoiceOptionLabel" htmlFor={`${currQuestionData?._id}-${opIdx}`}>{option.option_name}</label>
                                                            )
                                                        }
                                                        {
                                                            option.option_format === "only_image" && (
                                                                <div className='both_option_format'>
                                                                    <label htmlFor={`${currQuestionData?._id}-${opIdx}`}>
                                                                        <img src={option.option_image} alt="" />
                                                                    </label>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            option.option_format === "both" && (
                                                                <div className='both_option_format'>
                                                                    <label htmlFor={`${currQuestionData?._id}-${opIdx}`}>
                                                                        <span className="singleChoiceOptionLabel">{option.option_name}</span>
                                                                        <img src={option.option_image} alt="" />
                                                                    </label>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        )}

                                    </div>
                                )}

                                {/* true_false question view  */}
                                {currQuestionData?.question_type === "true_false" && (
                                    <div className='singleChoiceContainer'>
                                        <div className='trueFalseSingleOption'>
                                            <input
                                                type="radio"
                                                className='llInput'
                                                id={`${currQuestionData?._id}-true`}
                                                checked={singleAnswer.question_answer === true}
                                                onChange={() => setSingleAnswer(prev => ({ ...prev, question_answer: true }))}
                                                value={true}
                                            />
                                            <label htmlFor={`${currQuestionData?._id}-true`}>True</label>
                                        </div>
                                        <div className='trueFalseSingleOption'>
                                            <input
                                                type="radio"
                                                className='llInput'
                                                id={`${currQuestionData?._id}-false`}
                                                checked={singleAnswer.question_answer === false}
                                                onChange={() => setSingleAnswer(prev => ({ ...prev, question_answer: false }))}
                                                value={false} />
                                            <label htmlFor={`${currQuestionData?._id}-false`}>False</label>
                                        </div>
                                    </div>
                                )}

                                {/* multi_choice question view */}
                                {currQuestionData?.question_type === "multi_choice" && (
                                    <div className='singleChoiceContainer'>
                                        {currQuestionData.options && currQuestionData.options && (
                                            currQuestionData.options.map((option, opIdx) => {
                                                return (
                                                    <div className='singleChoiceSingleOption' key={option?._id}>
                                                        <input type="checkbox"
                                                            className='llInput'
                                                            onChange={handleMultiChoiceSelect}
                                                            name={currQuestionData?._id}
                                                            checked={singleAnswer.question_answer?.includes(option.option_value)}
                                                            id={`${currQuestionData?._id}-${opIdx}`}
                                                            value={option.option_value} />
                                                        <label htmlFor={`${currQuestionData?._id}-${opIdx}`}>{option.option_name}</label>
                                                    </div>
                                                )
                                            })
                                        )}

                                    </div>
                                )}

                                {/* open ended question view  */}
                                {currQuestionData?.question_type === "open_ended" && (
                                    <div className='singleChoiceContainer'>
                                        <textarea rows="5" className='openEndedTextarea' placeholder='type your answer'
                                            value={singleAnswer.question_answer}
                                            onChange={(e) => setSingleAnswer(prev => ({ ...prev, question_answer: e.target.value }))}>
                                        </textarea>
                                    </div>
                                )}

                                {/* open ended question view  */}
                                {currQuestionData?.question_type === "short_answer" && (
                                    <div className='singleChoiceContainer'>
                                        <textarea rows="5" className='openEndedTextarea' placeholder='Short Answer'
                                            value={singleAnswer.question_answer}
                                            onChange={(e) => setSingleAnswer(prev => ({ ...prev, question_answer: e.target.value }))}>
                                        </textarea>
                                    </div>
                                )}

                                {/* open ended question view  */}
                                {currQuestionData?.question_type === "fill_blanks" && (
                                    <div className='fillBlankChoiceContainer'>
                                        {
                                            singleAnswer.question_answer &&
                                            singleAnswer.question_answer.length > 0 &&
                                            singleAnswer.question_answer.map((ans, idx) => {
                                                return (
                                                    <input type="text"
                                                        key={idx}
                                                        value={ans} onChange={(e) => {
                                                            let allAns = singleAnswer.question_answer;
                                                            allAns[idx] = e.target.value
                                                            setSingleAnswer(prev => ({ ...prev, question_answer: allAns }))
                                                        }}
                                                    />
                                                )
                                            })

                                        }
                                    </div>
                                )}


                                {/* matching question view  */}
                                {currQuestionData?.question_type === "matching" && (

                                    <div className='matchingChoiceContainer'>
                                        <div className="matchingOptionGrid">
                                            <div className='matchingOptionCol1'>
                                                {
                                                    currQuestionData.matching?.option1 &&
                                                    currQuestionData.matching?.option1.length > 0 &&
                                                    currQuestionData.matching?.option1.map((op1, opidx) => {
                                                        return (
                                                            <div key={opidx}>
                                                                <span>{opidx + 1}.</span>
                                                                <span>{op1}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='matchingOptionCol2'>
                                                {
                                                    currQuestionData.matching?.option2 &&
                                                    currQuestionData.matching?.option2.length > 0 &&
                                                    currQuestionData.matching?.option2.map((op2, opidx) => {
                                                        return (
                                                            <div key={opidx}>
                                                                <span>{opidx + 1}.</span>
                                                                <span>{op2}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className='matchingAnswerInputs'>
                                            {/*Matching Answer View  */}
                                            {
                                                singleAnswer.question_answer &&
                                                singleAnswer.question_answer?.length > 0 &&
                                                singleAnswer.question_answer?.map((uAns, idx) => (
                                                    <div key={idx}>
                                                        <input placeholder='eg. 3-4' type="text" className='matchingInput' value={uAns.user_answer} onChange={(e) => handleMatchingAnswer(e, idx)} />
                                                        {uAns.error ?
                                                            (<p>{uAns.error}</p>)
                                                            :
                                                            (<p>{uAns.build_answer.split("-").join(" - ")}</p>)
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}


                            </div>

                            <button className='goToNextQuestion' onClick={() => goToNextQuestion()}>Next Questions</button>
                        </div>
                    )}

                    {/* quiz not started page  */}
                    {quizStarted === "not_started" && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <div className='quizStart'>
                                <div className='quizStart1'>
                                    <p>Quiz</p>
                                    <p className='quizparagraph'>Choose the correct verb:</p>
                                </div>
                                <div className='quizparagraph1'>
                                    <p>Questions: <span>{quizData?.questions.length}</span></p>
                                    <p>Total Attempted: <span>0/1</span></p>
                                    <p>Passing Grade <span>({quizData?.passing_mark}%)</span></p>
                                </div>
                                <div className='buttonicons'>
                                    <button className='stratquizbutton' onClick={() => handleStartQuiz()}>Start Quiz</button>
                                    <button className='stratquizbutton'>Skip Quiz</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* when no question is there in quiz  */}
                    {quizStarted === "no_questions" && (
                        <div className='quizInfoText'>No Question Found In this Quiz</div>
                    )}

                    {/* quiz ended  */}
                    {quizStarted === "ended" && (
                        <div className='quizInfoText'>Quiz has been successfully Submitted.</div>
                    )}

                </div>
            </ItemViewWrapper>
        </CourseContentBase >
    )
}

export default NewQuizAttempt