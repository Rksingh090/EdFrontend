import React, { useEffect, useState } from 'react'
import "./teachers.css";
import AdminBase from '../../adminBase/AdminBase';
import Breadcrumb from '../../../utils/Breadcrumb';


import { AiOutlinePlus } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { getTeacherByPage, toggleBanTeacherById } from '../../reducers/TeacherReducer';
import { Link } from 'react-router-dom';
import { RxCopy } from 'react-icons/rx';
import { BsCheck2 } from 'react-icons/bs';
import Switch from '../../../components/utils/Switch';
import Pagination from '../../../utils/Pagination';

const Teachers = () => {
	const dispatch = useDispatch();
	const { teacher: { perPage, pageNo } } = useSelector(state => state.adminteacher);

	const [viewMode, setViewMode] = useState("table");

	useEffect(() => {
		dispatch(getTeacherByPage({ perPage, pageNo }))
	}, [dispatch, perPage, pageNo])

	return (
		<AdminBase>
			<div className='adminCoupons'>
				<div className="headingBar">
					<h2 className='PageHeading'>Teachers</h2>
					<Breadcrumb breadcrumbData={[
						{
							link: "/admin/teachers",
							text: "Teachers"
						}
					]} />
				</div>

				<div className='displayDataView'>
					<button className={`${viewMode === "table" ? "active" : ""}`} onClick={() => setViewMode("table")}>List View</button>
					<button className={`${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>Grid View</button>
				</div>
				{viewMode === "table" ?
					(
						<TeachersTableView />
					)
					: (
						<TeachersGridView />
					)
				}

			</div>
		</AdminBase>
	)
}

const TeachersGridView = () => {

	const { teacher: { teachers } } = useSelector(state => state.adminteacher);

	return (
		<div className='gridView'>
			{teachers
				&& teachers.length > 0 &&
				teachers.map((teacherItem) => {
					return (
						<div className='TeacherCard' key={teacherItem?._id}>
							<div className='teacherProfileImg'>
								<img src={teacherItem?.dp || "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"} alt={teacherItem?.first_name || "profile"} />
							</div>
							<h3 className='teacherName'>{teacherItem?.first_name} {teacherItem?.last_name}</h3>
							<p className='teacherPText'>{teacherItem?.skills?.length > 0 && teacherItem?.skills[0]?.name}</p>
							<p className='teacherPText'>{teacherItem?.bio}</p>
							<p className='teacherPText'>{teacherItem?.email} </p>
							<a className='mobileNo' href={`tel:+91 ${teacherItem?.phone}`}>{teacherItem?.phone}</a>
							<button className='teacherReadMore'>Read More</button>
						</div>
					)
				})
			}
		</div>
	)
}

const TeachersTableView = () => {
	const dispatch = useDispatch();
	const { teacher: { teachers, totalTeachers, perPage, pageNo, pagination } } = useSelector(state => state.adminteacher);

	const [currentCopyId, setCurrentCopyId] = useState("")

	// const deleteTeacher = (id) => {
	// 	dispatch(deleteTeacherById(id))
	// }

	const copyID = (teacherId) => {
		navigator.clipboard.writeText(teacherId)
		setCurrentCopyId(teacherId)
		setTimeout(() => {
			setCurrentCopyId("")
		}, 1000)
	}

	const banTeacherById = (teacherId, accountStatus) => {
		dispatch(toggleBanTeacherById({ teacherId }))
	}

	return (
		<div className='tableContainer'>
			<div className='tableHeading'>
				<h2 className='heading'>All Teachers</h2>
			</div>
			<div className='couponCreateDiv'>
				<Link to="/admin/teacher/add">
					<span>Add New</span>
					<AiOutlinePlus color='white' size={18} />
				</Link>
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
					<input type="text" className='inputBG' placeholder='Search Teacher...' />
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
						{teachers
							&& teachers.length > 0 &&
							teachers.map((teacherItem, idx) => {
								return (
									<tr className='singleRow' key={teacherItem?._id}>
										<td>{(Number(perPage) * Number(pageNo - 1)) + idx + 1}</td>

										<td>
											<Link className='text-[var(--main)]' to={`/admin/teacher/about/${teacherItem?._id}`}>
												{teacherItem?.first_name} {teacherItem?.last_name}
											</Link>
										</td>
										<td className='capitalize'>{teacherItem?.gender || "male"}</td>
										<td>{teacherItem?.education?.name || "Phd"}</td>
										<td>{teacherItem?.phone}</td>
										<td>{teacherItem?.email}</td>
										<td>{new Date(teacherItem?.createdAt).toLocaleDateString()}</td>
										<td className='tableActionBtns'>
											<Switch title={teacherItem?.account_status === "active" ? "Ban Teacher" : "Unban Teacher"} className={"noStyle"} value={teacherItem?.account_status === "active"} onChange={() => banTeacherById(teacherItem._id, teacherItem.account_status)} />
											<Link title='Edit Coupon' to={`/admin/teacher/edit/${teacherItem?._id}`} className='edit'><MdModeEdit size={18} /></Link>
											{/* <div title='Delete Coupon' className='delete' onClick={() => deleteTeacher(teacherItem?._id)}><AiOutlineDelete size={17} /></div> */}
											<div title='Copy Teacher ID' className='view' onClick={() => copyID(teacherItem?._id)} >
												{
													currentCopyId === teacherItem?._id ?
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
			<Pagination
				pageNo={pageNo}
				pagination={pagination}
				perPage={perPage}
				totalPages={totalTeachers}
				onPageChange={(page) => dispatch({type: "adminteacher/setPageNo", payload: page})}
				goNext={() => pageNo < pagination.length ? dispatch({type: "adminteacher/setPageNo", payload: pageNo + 1 }) : null}
				goPrev={() => pageNo > 1 ? dispatch({type: "adminteacher/setPageNo", payload: pageNo -1 }) : null}
			/>
		</div>
	)
}
export default Teachers