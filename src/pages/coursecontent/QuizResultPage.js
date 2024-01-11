import React, { useEffect, useState } from 'react'
import { API } from '../../constant';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ItemViewWrapper from './ItemViewWrapper';

import { BsQuestionSquare } from 'react-icons/bs';
import { toDateString } from '../../functions/dateformate';

const QuizResultPage = () => {
	const { quiz_id, course_id, course_slug } = useParams();

	const [quizData, setQuizData] = useState([]);
	const [quizAttempts, setQuizAttempts] = useState([]);

	const [isLoading, setIsLoading] = useState({
		qa: false,
		q: false
	})

	const [enrollmentData, setEnrollmentData] = useState({
		enrollment: false,
		preview_available: false
	})



	// get quiz attempts by id 
	useEffect(() => {
		const getQuizAttempts = async (quizId) => {
			try {
				setIsLoading(prev => ({
					...prev,
					qa: true
				}))
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

					.finally(() => {
						setIsLoading(prev => ({
							...prev,
							qa: false
						}))
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
				setIsLoading(prev => ({
					...prev,
					q: true
				}))
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
					.finally(() => {
						setIsLoading(prev => ({
							...prev,
							q: false
						}))
					})
			} catch (error) {
				console.log(error);
			}
		}
		if (quiz_id === "" || quiz_id === undefined || quiz_id === null) return;
		getQuizDetails();
	}, [quiz_id])


	return (
		<ItemViewWrapper
			loading={isLoading.q || isLoading.qa}
			validAccess={enrollmentData.enrollment === true || enrollmentData.preview_available === true}
		>
			<div className='CourseResultAndStart'>
				<div className="QuizStartBtnAndTitle">
					<Link className='startQuizBtn' to={`/course/${course_id}/${course_slug}/quiz/${quizData?._id}`}>Start Quiz</Link>
					<div className='quizPageTitle'>
						<BsQuestionSquare size={16} />
						<h2 className='quiz1'>{quizData?.quiz_title}</h2>
					</div>
					<div></div>
				</div>
				<div className='quizQuestionHeadings'>
					<p>Questions: {Number(quizData?.totalQuestions) > 9 ? 10 : quizData?.totalQuestions}</p>
					<p>Quiz Time: {quizData?.time_limit?.limit} <span className='capitalize'>{quizData?.time_limit?.limit_type}</span></p>
					<p>Total Marks: {quizData?.total_marks}</p>
					<p>Passing Grade: {quizData?.passing_mark}%</p>
				</div>

				{quizAttempts && quizAttempts.length === 0 && (
					<div className="noQuizAttempts">
						Take a quiz test to see how you are doing?
					</div>
				)}
				{quizAttempts && quizAttempts.length > 0 && (
					<div className="responsiveTable">
						<table className="styled-table desktopSize">
							<thead>
								<tr className='quizAttemptTheadRow'>
									<th><p>Attempted On</p></th>
									{/* <th><p>Quiz Info</p></th> */}
									{/* <th><p>Question</p></th>
									<th><p>Total Marks</p></th>
									<th><p>Correct Answer</p></th>
									<th><p>Incorrect Answer</p></th> */}
									<th><p>Earned Marks	</p></th>
									<th><p>Result</p></th>
									<th><p>Details</p></th>
								</tr>
							</thead>
							<tbody>
								{quizAttempts && quizAttempts.length > 0 && quizAttempts.map((qattmpt) => {
									return (
										<tr key={qattmpt._id}>
											<td><p className='capitalCase'>{toDateString(qattmpt?.createdAt, true, true, true)}</p></td>
											{/* <td>
												<div className='quizAttmptInfo'>
													<h3 className='attemptTime'>{new Date(qattmpt?.createdAt).toDateString()}</h3>
													<h2 className='quizName'>{qattmpt?.quiz_id?.quiz_title}</h2>
												</div>
											</td> */}
											{/* <td><p className='pl-3'>{qattmpt?.total_questions}</p></td>
											<td><p className='pl-3'>{qattmpt?.total_marks}</p></td>
											<td><p className='pl-3'>{qattmpt?.total_correct || 0}</p></td>
											<td><p className='pl-3'>{qattmpt?.total_incorrect || 0}</p></td> */}
											<td><p className='pl-3'>{Number(qattmpt?.obtained_mark).toFixed(2)}</p></td>
											<td className={`text-center qaStatus`}>
												{qattmpt?.passing_status === "pass" ?
													<p className='badgeSM successBadge'>Pass</p>
													:
													qattmpt?.passing_status === "fail"
														? <p className='badgeSM errorBadge'>Fail</p>
														:
														<p className='badgeSM warningBadge'>Pending</p>
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
				)}
			</div>
		</ItemViewWrapper>
	)
}

export default QuizResultPage