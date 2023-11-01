import React, { useEffect, useState } from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentQuizAttempts } from '../../reducers/QuizAttemptReducer';
import SelectOption from '../../components/utils/SelectOption';


const QuizAttempts = () => {

	const { student: { quiz_attempts } } = useSelector(state => state.quizattempts);

	const dispatch = useDispatch();
	const [filterQuizAttempts, setFilteredQuizAttempts] = useState([])
	const [courseList, setCourseList] = useState([])

	// filteres 
	const [selectedCourse, setSelectedCourse] = useState("")
	const [selectedSort, setSelectedSort] = useState("")
	const [selectedOrder, setSelectedOrder] = useState("")


	useEffect(() => {
		if (quiz_attempts) {
			setFilteredQuizAttempts(quiz_attempts)
			let courses = []
			let added = []
			quiz_attempts.forEach((qa) => {
				if (qa?.course && !added.includes(qa?.course?._id)) {
					courses.push(qa.course)
					added.push(qa?.course?._id)
				}
			})
			setCourseList(courses)
		}
	}, [quiz_attempts])

	const handleFilterCourse = (type, data) => {
		let filtered = quiz_attempts;

		// filtering 
		let filterCourse = ""
		if (type === "byCourse") {
			filterCourse = data;
			setSelectedCourse(data)
		} else if (selectedCourse) {
			filterCourse = selectedCourse
		}
		if (filterCourse) {
			filtered = filtered.filter((qa) => qa?.course?._id === filterCourse);
		}

		// sorting & ordering
		let sortBy = "";
		let orderBy = "Ascending"

		if (type === "sortBy") {
			sortBy = data
			setSelectedSort(data)
		} else if (selectedSort) {
			sortBy = selectedSort;
		}

		if (type === "order") {
			orderBy = data
			setSelectedOrder(data)
		} else if (selectedOrder) {
			orderBy = selectedOrder
		}

		if (sortBy && sortBy === "Earned Mark") {
			filtered = [...filtered].sort((a, b) => {
				let ret = 1;
				if (orderBy === "Descending") ret *= -1
				if (a.obtained_mark > b.obtained_mark) return ret;
				return ret * -1;
			})
		}


		console.log(filterCourse, sortBy);
		setFilteredQuizAttempts(filtered)
	}

	useEffect(() => {
		dispatch(getStudentQuizAttempts())
	}, [dispatch])

	return (
		<TeacherSidebar>
			<div className="SQuizAttemptPage">
				<h2 className='SQuizAttemptHeading'>Quiz Attempts</h2>
				<div className='SQuizAttemptsFilter'>
					<SelectOption
						style={{
							height: "100%",
							padding: "10px"
						}}
						value={selectedCourse}
						onChange={(cid) => handleFilterCourse("byCourse", cid)}
						label={"Select Course"}
						options={courseList}
						textField={"title"}
						valueField={"_id"}
					/>
					<SelectOption
						style={{
							height: "100%",
							padding: "10px"
						}}
						value={selectedSort}
						onChange={(cid) => handleFilterCourse("sortBy", cid)}
						label={"Sort By"}
						options={["Earned Mark"]}
						textField={""}
						valueField={""}
					/>
					<SelectOption
						style={{
							height: "100%",
							padding: "10px"
						}}
						value={selectedOrder}
						onChange={(cid) => handleFilterCourse("order", cid)}
						label={"Order"}
						options={["Ascending", "Descending"]}
						textField={""}
						valueField={""}
					/>
				</div>

				<div className='responsiveTable'>
					<table className="styled-table striped desktopSize">
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
							{filterQuizAttempts && filterQuizAttempts.length > 0 && filterQuizAttempts.map((qattmpt) => {
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
			</div>
		</TeacherSidebar>
	)
}

export default QuizAttempts