import React, { useEffect } from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTeacherQuizAttempts } from '../../reducers/QuizAttemptReducer';

const Quiz = () => {

    const dispatch = useDispatch();
    const { teacher: { quiz_attempts } } = useSelector(state => state.quizattempts);

    useEffect(() => {
        dispatch(getTeacherQuizAttempts())
    }, [dispatch])
    return (
        <TeacherSidebar>
            <div className='font-[600] text-[25px]'>Quiz</div>
            <table className="styled-table mt-4">
                <thead>
                    <tr className='quizAttemptTheadRow'>
                        <th><p>Quiz Info</p></th>
                        <th><p>Question</p></th>
                        <th><p>Total Marks	</p></th>
                        <th><p>Correct Answer	</p></th>
                        <th><p>Incorrect Answer	</p></th>
                        <th><p>Earned Marks	</p></th>
                        <th><p>Result</p></th>
                        <th><p>Details</p></th>
                    </tr>
                </thead>

                <tbody>
                    {quiz_attempts && quiz_attempts.length > 0 && quiz_attempts.map((qattmpt) => {
                        return (
                            <tr key={qattmpt?._id}>
                                <td>
                                    <div className='quizAttmptInfo'>
                                        <h3 className='attemptTime'>{new Date(qattmpt?.createdAt).toDateString()}</h3>
                                        <h2 className='quizName'>{qattmpt?.quiz_id?.quiz_title}</h2>
                                        <p className='student'>
                                            Student: <span>{qattmpt?.answered_by?.first_name} {qattmpt?.answered_by?.last_name}</span>
                                        </p>
                                    </div>
                                </td>
                                <td><p className='pl-3'>{qattmpt?.total_questions}</p></td>
                                <td><p className='pl-3'>{qattmpt?.total_marks}</p></td>
                                <td><p className='pl-3'>{qattmpt?.total_correct || 0}</p></td>
                                <td><p className='pl-3'>{qattmpt?.total_incorrect || 0}</p></td>
                                <td><p className='pl-3'>{qattmpt?.obtained_mark}</p></td>
                                <td className={`text-center qaStatus ${qattmpt?.passing_status === "pass" ? "pass" :
                                    qattmpt?.passing_status === "fail" ? "fail" :
                                        "pending"
                                    }`}>
                                    <p>{qattmpt?.passing_status}</p>
                                </td>
                                <td className="detailsTD"><p className='qaShowDetails'>
                                    <Link to="/">Details</Link>
                                    </p></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>


        </TeacherSidebar>
    )
}

export default Quiz
