import React, { useEffect } from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentQuizAttempts } from '../../reducers/QuizAttemptReducer';


const QuizAttempts = () => {

	const { student: { quiz_attempts } } = useSelector(state => state.quizattempts);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStudentQuizAttempts())
	},[dispatch])

	return (
		<TeacherSidebar>

			<div className='font-[600] text-[24px]'>QuizAttempts</div>
			<div className='flex justify-between border-[px] pt-8 my-8'>
				<div>
					<p className='py-3'>Courses</p>
					<select name="cars" id="cars" className='px-[200px] outline-none border-[1px] p-2 flex items-start rounded-md'>
						<option value="volvo">All</option>
						<option value="saab">Saab</option>
						<option value="opel">Opel</option>
						<option value="audi">Audi</option>
					</select>

				</div>
				<div>
					<p className='py-3'>Sort By</p>
					<select name="cars" id="cars" className='px-[100px] outline-none border-[1px] p-2 flex items-start rounded-md text-left'>
						<option value="volvo" className='text-left'>DESC</option>
						<option value="saab">Saab</option>
						<option value="opel">Opel</option>
						<option value="audi">Audi</option>
					</select>
				</div>
				<div className=''>
					<p className='py-3'>Date</p>
					<label htmlFor="start"></label>

					<input type="date" id="start" name="trip-start" className='outline-none border-[1px] px-[80px] p-2 rounded-md'></input>

				</div>
			</div>

			<div className='w-full'>
				<table className="styled-table striped">
					<thead>
						<tr>
							<th>Quiz Info</th>
							<th>Question</th>
							<th>Total Marks</th>
							<th>Correct Answer</th>
							<th>Incorrect Answer</th>
							<th>Earned Mark</th>
							<th>Result</th>
							<th>Details</th>
						</tr>
					</thead>

					<tbody>
						{quiz_attempts && quiz_attempts.length > 0 && quiz_attempts.map((qattmpt) => {
							return (
								<tr key={qattmpt?._id}>
									<td className='quizAttmptInfo'>
										<p className='time'>{new Date(qattmpt?.createdAt).toDateString()}</p>
										<p className='title'>{qattmpt?.quiz_id?.quiz_title}</p>
									</td>
									<td>{qattmpt?.total_questions}</td>
									<td>{qattmpt?.total_marks}</td>
									<td>{qattmpt?.total_correct || 0}</td>
									<td>{qattmpt?.total_incorrect || 0}</td>
									<td>{qattmpt?.obtained_mark}</td>
									<td className={`qaStatus ${qattmpt?.passing_status === "pass" ? "pass" :
											qattmpt?.passing_status === "fail" ? "fail" :
												"pending"
										}`}><p>{qattmpt?.passing_status}</p></td>
									<td className='detailsTD'><p className='qaShowDetails'>Details</p></td>
								</tr>
							)
						})}


					</tbody>
				</table>

			</div>
		</TeacherSidebar>
	)
}

export default QuizAttempts