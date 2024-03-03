import React, { useEffect, useState } from 'react'
import "./student.css";
import AdminBase from '../../adminBase/AdminBase';
import Breadcrumb from '../../../utils/Breadcrumb';


import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { getStudentByPage } from '../../reducers/StudentReducer';
import { BsCheck2 } from 'react-icons/bs';
import { RxCopy } from 'react-icons/rx';
import Pagination from '../../../utils/Pagination';
import { BACKEND_URL } from '../../../constant';

const Student = () => {

	const [viewMode, setViewMode] = useState("table");

	const dispatch = useDispatch();
	const { student: { perPage, pageNo, totalStudents, pagination } } = useSelector(state => state.adminstudent);

	console.log(perPage, pageNo);
	

	useEffect(() => {
		dispatch(getStudentByPage({ perPage, pageNo }))
	}, [dispatch, perPage, pageNo])

	return (
		<div className='adminCoupons'>
			<div className="headingBar">
				<h2 className='PageHeading'>Students</h2>
				<Breadcrumb breadcrumbData={[
					{
						link: "/admin/student",
						text: "Students"
					}
				]} />
			</div>

			<div className='displayDataView'>
				<button className={`${viewMode === "table" ? "active" : ""}`} onClick={() => setViewMode("table")}>List View</button>
				<button className={`${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>Grid View</button>
			</div>
			{viewMode === "table" ?
				(
					<StudentTableView />
				)
				: (
					<StudentGridView />
				)
			}

			<Pagination
				pageNo={pageNo}
				pagination={pagination}
				perPage={perPage}
				options={{
					whiteBG: true
				}}
				totalPages={totalStudents}
				onPageChange={(page) => dispatch({ type: "adminstudent/setPageNo", payload: page })}
				goNext={() => pageNo < pagination.length ? dispatch({ type: "adminstudent/setPageNo", payload: pageNo + 1 }) : null}
				goPrev={() => pageNo > 1 ? dispatch({ type: "adminstudent/setPageNo", payload: pageNo - 1 }) : null}
			/>

		</div>
	)
}

const StudentGridView = () => {
	const { student: { students } } = useSelector(state => state.adminstudent);


	return (
		<div className='gridView'>
			{students &&
				students.length > 0 &&
				students.map((studentItem) => {
					return (
						<div className='TeacherCard' key={studentItem?._id}>
							<div className='teacherProfileImg'>
								<img src={studentItem?.dp ? `${BACKEND_URL}/${studentItem?.dp}` : "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"} alt={studentItem?.first_name || "profile"} />
							</div>
							<h3 className='teacherName'>{studentItem?.first_name} {studentItem?.last_name}</h3>
							<p className='teacherPText'>{studentItem?.skills?.length > 0 ? studentItem?.skills[0]?.name : "N/A"} </p>
							<p className='teacherPText'>{studentItem?.bio}</p>
							<p className='teacherPText'>{studentItem?.email} </p>
							<a className='mobileNo' href={`tel:+91 ${studentItem?.phone}`}>{studentItem?.phone}</a>
							<button className='teacherReadMore'>Read More</button>
						</div>
					)
				})}
		</div>
	)
}

const StudentTableView = () => {

	const [currentCopyId, setCurrentCopyId] = useState("")

	const { student: { students, perPage, pageNo, } } = useSelector(state => state.adminstudent);

	const copyID = (teacherId) => {
		navigator.clipboard.writeText(teacherId)
		setCurrentCopyId(teacherId)
		setTimeout(() => {
			setCurrentCopyId("")
		}, 1000)
	}


	return (
		<div className='tableContainer'>
			<div className='tableHeading'>
				<h2 className='heading'>All Teachers</h2>
			</div>
			<div className='couponCreateDiv'>
				<button>
					<span>Add New</span>
					<AiOutlinePlus color='white' size={18} />
				</button>
			</div>
			<div className='tableSearchDiv'>
				<div className='perEntrySelect'>
					<span>Show</span>
					<select>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
					<span>Entries</span>
				</div>
				<div className='tableSearchContainer'>
					<p>Search: </p>
					<input type="text" className='inputBG' placeholder='Search Student...' />
				</div>
			</div>
			<div className="couponTable">
				<table className='styled-table'>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Gender</th>
							<th>Degree</th>
							<th>Mobile No.</th>
							<th>Email</th>
							<th>Joining Date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>

						{
							students &&
							students.length > 0 &&
							students.map((studentItem, idx) => {
								return (
									<tr key={studentItem?._id}>
										<td>{(Number(perPage) * Number(pageNo - 1)) + idx + 1}</td>
										<td>{studentItem?.first_name} {studentItem?.last_name}</td>
										<td>{studentItem?.gender || "-"}</td>
										<td>{studentItem?.highest_education || "B.Sc"}</td>
										<td>{studentItem?.phone}</td>
										<td>{studentItem?.email}</td>
										<td>{new Date(studentItem?.createdAt).toLocaleDateString()}</td>

										<td className='tableActionBtns'>
											<div title='Edit Coupon' className='edit'><MdModeEdit size={18} /></div>
											<div title='Delete Coupon' className='delete'><AiOutlineDelete size={17} /></div>
											<div title='Copy Student ID' className='view' onClick={() => copyID(studentItem?._id)} >
												{
													currentCopyId === studentItem?._id ?
														(
															<BsCheck2 size={20} />
														) :
														(
															<RxCopy size={20} />
														)
												}
											</div>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>




			{/* <div className='paginationDiv'>
				<div className='paginationShown'>
					<span>Showing {1} to {10} of {18} entries</span>
				</div>
				<div className='paginationNo'>
					<p>Previous</p>
					<p className='active'>1</p>
					<p>Next</p>
				</div>
			</div> */}
		</div>
	)
}
export default Student