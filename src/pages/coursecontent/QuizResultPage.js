import React, { useEffect, useState } from 'react'
import { API } from '../../constant';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ItemViewWrapper from './ItemViewWrapper';

const QuizResultPage = () => {
	const [quizData, setQuizData] = useState([]);
	const [quizAttempts, setQuizAttempts] = useState([]);

	const [enrollmentData, setEnrollmentData] = useState({
		enrollment: false,
		preview_available: false
	})

	const { quiz_id, course_id, course_slug } = useParams();


	// get quiz attempts by id 
	useEffect(() => {
		const getQuizAttempts = async (quizId) => {
			try {

				axios.get(`${API}/quiz-attempts/quiz/${quizId}`, {
					headers: {
						token: localStorage.getItem("token")
					}
				})
					.then((res) => {
						const { quiz_attempts, status } = res.data;
						if (status === "success") {
							setQuizAttempts(quiz_attempts);
						}
					})
			} catch (error) {
				console.warn(error);
			}
		}
		if (quiz_id === "" || quiz_id === undefined || quiz_id === null) return;
		getQuizAttempts(quiz_id)
	}, [quiz_id])

	// get quiz meta 
	useEffect(() => {
		const getQuizDetails = () => {
			try {
				axios.get(`${API}/quiz/meta/${quiz_id}`, {
					headers: {
						token: localStorage.getItem("token")
					}
				})
					.then(res => {
						const { status, enrollment, preview_available } = res.data;
						setEnrollmentData({
							enrollment,
							preview_available
						})
						if (status === "success") {
							setQuizData(res.data.quiz);
						}
					})
			} catch (error) {
				console.log(error);
			}
		}
		if (quiz_id === "" || quiz_id === undefined || quiz_id === null) return;
		getQuizDetails();
	}, [quiz_id])


	return (
		<ItemViewWrapper validAccess={enrollmentData.enrollment === true && enrollmentData.preview_available === true} >
			<div className='w-[85%] py-4'>
				<div className='courseConentPageQuiz'>
					<div className='quizPageTitle'>
						<p>Quiz</p>
						<h2 className='quiz1'>{quizData?.quiz_title}</h2>
					</div>
					<div className='quizQuestionHeadings'>
						<p>Questions: {Number(quizData?.totalQuestions) > 9 ? 10 : quizData?.totalQuestions}</p>
						<p>Quiz Time: {quizData?.time_limit?.limit} <span className='capitalize'>{quizData?.time_limit?.limit_type}</span></p>
						<p>Total Marks: {quizData?.total_marks}</p>
						<p>Passing Marks: {quizData?.passing_mark}%</p>
					</div>

					<Link className='startQuiz' to={`/course/${course_id}/${course_slug}/quiz/${quizData?._id}`}>Start Quiz</Link>

					<table className="styled-table">
						<thead>
							<tr className='quizAttemptTheadRow'>
								<th><p>Quiz Info</p></th>
								<th><p>Question</p></th>
								<th><p>Total Marks</p></th>
								<th><p>Correct Answer</p></th>
								<th><p>Incorrect Answer</p></th>
								<th><p>Earned Marks	</p></th>
								<th><p>Result</p></th>
								<th><p>Details</p></th>
							</tr>
						</thead>
						<tbody>
							{quizAttempts && quizAttempts.length > 0 && quizAttempts.map((qattmpt) => {
								return (
									<tr key={qattmpt._id}>
										<td>
											<div className='quizAttmptInfo'>
												<h3 className='attemptTime'>{new Date(qattmpt?.createdAt).toDateString()}</h3>
												<h2 className='quizName'>{qattmpt?.quiz_id?.quiz_title}</h2>
											</div>
										</td>
										<td><p className='pl-3'>{qattmpt?.total_questions}</p></td>
										<td><p className='pl-3'>{qattmpt?.total_marks}</p></td>
										<td><p className='pl-3'>{qattmpt?.total_correct || 0}</p></td>
										<td><p className='pl-3'>{qattmpt?.total_incorrect || 0}</p></td>
										<td><p className='pl-3'>{qattmpt?.obtained_mark}</p></td>
										<td className={`text-center qaStatus`}>
											{qattmpt?.passing_status === "pass" ?
												<p className='badgeSM successBadge'>pass</p>
												:
												qattmpt?.passing_status === "fail"
													? <p className='badgeSM errorBadge'>fail</p>
													:
													<p className='badgeSM warningBadge'>pending</p>
											}
										</td>
										<td className="detailsTD">
											<Link className='qaShowDetails'
												to={`/course/${course_id}/${course_slug}/quiz-attempt/${qattmpt._id}`}
												onClick={() => {
													// setQuizData(prev => ({ ...prev, item_type: "quizAttemptDetails" }))
													// setQuizAttemptData(qattmpt)
												}}
											>Details</Link>
										</td>
									</tr>
								)
							})}

						</tbody>
					</table>
				</div>
			</div>
		</ItemViewWrapper>
	)
}

export default QuizResultPage