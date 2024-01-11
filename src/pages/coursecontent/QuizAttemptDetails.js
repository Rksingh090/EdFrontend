import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../constant';
import { IconQuestionType } from '../../components/utils/IconQuestionType';
import ItemViewWrapper from './ItemViewWrapper';

import { MdOutlineKeyboardBackspace, MdOutlineQuiz } from 'react-icons/md';
import { IoTimeOutline } from 'react-icons/io5';
import { BsQuestionSquare } from 'react-icons/bs';


const QuizAttemptDetails = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [quizData, setQuizData] = useState({});
    const [quizAttemptData, setQuizAttemptData] = useState({});
    const [isValidUser, setIsValidUser] = useState(false);

    const { quiz_attempt_id, course_id, course_slug } = useParams();

    // on quiz id change get quiz attempts 
    useEffect(() => {
        const getQuizAttempts = async (quizAttemptId) => {
            try {
                setIsLoading(true)
                axios.get(`${API}/quiz-attempts/id/${quizAttemptId}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
                    .then((res) => {
                        const { quiz_attempt, quizMeta, status, isValidUser } = res.data;
                        setIsValidUser(isValidUser)
                        if (status === "success") {
                            setQuizAttemptData(quiz_attempt);
                            setQuizData(quizMeta)
                        }
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            } catch (error) {
                console.warn(error);
            }
        }
        if (quiz_attempt_id === "" || quiz_attempt_id === undefined || quiz_attempt_id === null) return;
        getQuizAttempts(quiz_attempt_id)
    }, [quiz_attempt_id])

    return (
        <ItemViewWrapper
            loading={isLoading}
            validAccess={isValidUser}
        >
            <div className='QuizResultPage'>
                <div className="QuizResultPageHeading">

                    <Link
                        className='courseBackBtn'
                        to={`/course/${course_id}/${course_slug}/quiz/result/${quizData?._id}`}
                    >
                        <MdOutlineKeyboardBackspace size={20} />
                        <span>Back</span>
                    </Link>
                    <div className='middle'>
                        <BsQuestionSquare size={18} />
                        <h2 className='QuizResultPageTitle'>{quizData?.quiz_title}</h2>
                    </div>
                    <p className='quizDetailsTiming'>
                        <IoTimeOutline size={20} />
                        <span className='capitalCase'>{quizData?.time_limit?.limit} {quizData?.time_limit?.limit_type}</span>
                    </p>
                </div>
                <div className="responsiveTable quizDetailsTables">

                    <table className="styled-table desktopSize">
                        <thead>
                            <tr className='quizAttemptTheadRow'>
                                <th><p>Date</p></th>
                                <th><p>Question</p></th>
                                <th><p>Total Marks</p></th>
                                <th><p>Passing Mark</p></th>
                                <th><p>Incorrect Answer</p></th>
                                <th><p>Earned Marks	</p></th>
                                <th><p>Result</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='quizAttmptInfo'>
                                        <p>{new Date(quizAttemptData?.createdAt).toDateString()}</p>
                                    </div>
                                </td>
                                <td><p className='pl-3'>{quizAttemptData?.total_questions || 0}</p></td>
                                <td><p className='pl-3'>{quizAttemptData?.total_marks}</p></td>
                                <td><p className='pl-3'>{quizAttemptData?.passing_percent}%</p></td>
                                <td><p className='pl-3'>{quizAttemptData?.total_incorrect}</p></td>
                                <td>
                                    <p className='pl-3'>{
                                        String(quizAttemptData?.obtained_mark).length > 4 ?
                                            String(quizAttemptData?.obtained_mark).substring(0, 4)
                                            : String(quizAttemptData?.obtained_mark)}
                                    </p>
                                </td>
                                <td className={`text-center qaStatus`}>
                                    {
                                        quizAttemptData?.passing_status === "pass" ?
                                            <p className="badgeSM successBadge">Pass</p>
                                            :
                                            quizAttemptData?.passing_status === "fail"
                                                ?
                                                <p className='badgeSM errorBadge'>Fail</p>
                                                :
                                                <p className="badgeSM warningBadge">Pending</p>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="styled-table desktopSize">
                        <thead>
                            <tr className='quizAttemptTheadRow'>
                                <th><p>No</p></th>
                                <th><p>Type</p></th>
                                <th><p>Question</p></th>
                                <th><p>Given Answer</p></th>
                                <th><p>Correct Answer</p></th>
                                <th><p>Que. Point</p></th>
                                <th><p>Answer</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizAttemptData && quizAttemptData.answers &&
                                quizAttemptData.answers.length > 0 &&
                                quizAttemptData.answers.map((oneAnswer, ansIdx) => {
                                    const questionType = oneAnswer?.question_type;
                                    return (
                                        <tr key={oneAnswer._id}>
                                            {/* serial no  */}
                                            <td><p className='quizAttmptInfo'>{ansIdx + 1}</p></td>

                                            {/* question type  */}
                                            <td>
                                                <IconQuestionType questionType={questionType} />
                                            </td>

                                            {/* question title  */}
                                            <td>
                                                {questionType === "fill_blanks" ?
                                                    (
                                                        <p className='pl-3'>{String(oneAnswer?.fill_blanks?.question).replaceAll("{blank}", " ____ ")}</p>
                                                    )
                                                    :
                                                    (
                                                        <p className='pl-3'>{oneAnswer?.question_id?.question_title}</p>
                                                    )}
                                            </td>

                                            {/* given answer */}
                                            <td>

                                                {(questionType === "single_choice" || questionType === "true_false") && (
                                                    <p className='pl-3'>{oneAnswer?.student_answer}</p>
                                                )}
                                                {questionType === "multi_choice" && (
                                                    <>
                                                        {oneAnswer?.multi_answers?.answers?.length > 0
                                                            && oneAnswer?.multi_answers?.answers?.map((_mans, idx) => (
                                                                <p className='pl-3' key={idx}>
                                                                    {_mans?.answer || ""}
                                                                </p>
                                                            ))
                                                        }
                                                    </>
                                                )}

                                                {questionType === "matching" && (
                                                    oneAnswer?.matching.answers &&
                                                    oneAnswer?.matching.answers.length > 0 &&
                                                    oneAnswer?.matching.answers.map((m_ans, mAnsIdx) => (
                                                        <p className='pl-3' key={mAnsIdx}>{m_ans.option1} - {m_ans.option2}</p>
                                                    ))
                                                )}

                                                {(questionType === "open_ended" || questionType === "short_answer") && (
                                                    <p className='pl-3'>{oneAnswer?.student_answer}</p>
                                                )}

                                                {questionType === "fill_blanks" && (
                                                    <>
                                                        {
                                                            oneAnswer?.fill_blanks?.answers &&
                                                            oneAnswer?.fill_blanks?.answers.length > 0 &&
                                                            oneAnswer?.fill_blanks?.answers.map((fbAns, fbIdx) => {
                                                                return (
                                                                    <p key={fbIdx} className='pl-3'>{fbAns?.answer}</p>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )}

                                            </td>

                                            {/* correct answer  */}
                                            <td>

                                                {(questionType === "single_choice" || questionType === "true_false") && (
                                                    <p className='pl-3'>{oneAnswer?.correct_answer}</p>
                                                )}

                                                {(questionType === "multi_choice" &&
                                                    oneAnswer?.correct_multi_answer &&
                                                    oneAnswer?.correct_multi_answer.length > 0 &&
                                                    oneAnswer?.correct_multi_answer.map((c_ans, cIdx) => (
                                                        <p className='pl-3' key={cIdx}>{c_ans}</p>
                                                    ))
                                                )}

                                                {(questionType === "open_ended" &&
                                                    <p className='pl-3'>{oneAnswer?.correct_answer}</p>
                                                )}

                                                {(questionType === "matching" &&
                                                    oneAnswer?.matching?.correct_answers &&
                                                    oneAnswer?.matching?.correct_answers.length > 0 &&
                                                    oneAnswer?.matching?.correct_answers.map((c_ans, cmIdx) => (
                                                        <p className='pl-3' key={cmIdx}>{c_ans.option1} - {c_ans.option2} </p>
                                                    ))
                                                )}

                                                {(questionType === "open_ended" || questionType === "short_answer") && (
                                                    <p className='pl-3'>-</p>
                                                )}

                                                {questionType === "fill_blanks" && (
                                                    <>
                                                        {
                                                            oneAnswer?.fill_blanks?.correct_answers &&
                                                            oneAnswer?.fill_blanks?.correct_answers.length > 0 &&
                                                            oneAnswer?.fill_blanks?.correct_answers.map((fbAns, fbIdx) => {
                                                                return (
                                                                    <p key={fbIdx} className='pl-3'>{fbAns}</p>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )}

                                            </td>
                                            <td>
                                                <p className='pl-3'>
                                                    {
                                                        String(oneAnswer?.point).length > 4 ?
                                                            String(oneAnswer?.point).substring(0, 4)
                                                            : String(oneAnswer?.point)
                                                    }
                                                </p>
                                            </td>
                                            <td className={`text-center qaStatus`}>
                                                {
                                                    oneAnswer?.answer_status === "pending" ? (
                                                        <p className='badgeSM warningBadge'>Pending</p>
                                                    ) : (
                                                        oneAnswer?.correct === true ?
                                                            <p className='badgeSM successBadge'>Correct</p>
                                                            :
                                                            oneAnswer?.correct === false
                                                            && <p className='badgeSM errorBadge'>Incorrect</p>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </ItemViewWrapper>
    )
}

export default QuizAttemptDetails