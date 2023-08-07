import React, { useEffect, useState } from 'react'
import "./dashboard.css";

import AdminBase from '../adminBase/AdminBase';
import Breadcrumb from '../../utils/Breadcrumb';

import { HiOutlineUser, HiOutlineUsers } from 'react-icons/hi';
import { BiBookAlt } from 'react-icons/bi';
import { FiDollarSign } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

import QuillToolbar, { formats, modules } from '../../components/utils/EditorToolbar';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDashboarData } from '../reducers/AdminReducer';
import { toDateString } from '../../functions/dateformate';
import axios from 'axios';
import { API } from '../../constant';


const Dashboard2 = () => {

	const dispatch = useDispatch();
	const { dashboard: { teachers, newStudents, transaction, courseCount, studentCounts, newStudentsCount } } = useSelector(state => state.admin);

	useEffect(() => {
		dispatch(getAllDashboarData())
	}, [dispatch])

	const [mailData, setMailData] = useState({
		sendTo: "",
		subject: "",
		htmlData: ""
	});

	const sendMailToUser = () => {
		try {
			if(mailData.sendTo === "") return;
			axios.post(`${API}/mail/send`, mailData, {
				headers: {
					token: localStorage.getItem("token")
				}
			})
				.then((res) => {
					const { status } = res.data;
					if (status === "success") {
						alert("Mail Sent")
					}
				})
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<AdminBase>
			<div className='dashboardContainer'>
				<div className="headingBar">
					<h2 className='PageHeading'>Dashboard</h2>
					<Breadcrumb breadcrumbData={[{
						link: "/admin/dashboard",
						text: "Dashboard"
					}]} />
				</div>

				<div className='dashboardRow1'>
					<div className='dashboardCounters c1'>
						<div className='counterIcon'>
							<HiOutlineUsers />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Total Student</h4>
							<p className='counterCount'>{studentCounts || 0}</p>
							<div className='counterProgress'><p style={{ width: "45%" }}></p></div>
							<p className='counterTitle noWrap'>45% increase in 28 Days</p>
						</div>
					</div>
					<div className='dashboardCounters c2'>
						<div className='counterIcon'>
							<HiOutlineUser />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>New Student</h4>
							<p className='counterCount'>{newStudentsCount || 0}</p>
							<div className='counterProgress'><p style={{ width: "40%" }}></p></div>
							<p className='counterTitle noWrap'>40% increase in 28 Days</p>
						</div>
					</div>
					<div className='dashboardCounters c3'>
						<div className='counterIcon'>
							<BiBookAlt />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Total Courses</h4>
							<p className='counterCount'>{courseCount}</p>
							<div className='counterProgress'><p style={{ width: "85%" }}></p></div>
							<p className='counterTitle noWrap'>85% increase in 28 Days</p>
						</div>
					</div>
					<div className='dashboardCounters c4'>
						<div className='counterIcon'>
							<FiDollarSign />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Fees Collection</h4>
							<p className='counterCount'>12,500 $</p>
							<div className='counterProgress'><p style={{ width: "50%" }}></p></div>
							<p className='counterTitle noWrap'>50% increase in 28 Days</p>
						</div>
					</div>
				</div>

				<div className='dashboardRow2'>
					<div className='tableContainer dashboard'>
						<div className='tableHeading'>
							<h2 className='heading'>Teachers List</h2>
						</div>
						<div className="dashTable">
							<table className="dashboardTable">
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Email</th>
										<th>Course Created</th>
										<th>Rating</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{
										teachers &&
										teachers.length > 0 &&
										teachers.map((teacherItem) => {
											return (
												<tr key={teacherItem?._id}>
													<td className='tableProfileImg'><img src={teacherItem?.dp || "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"} alt={teacherItem?.first_name} /></td>
													<td>{teacherItem?.first_name} {teacherItem?.last_name}</td>
													<td>{teacherItem?.email || "N/A"} </td>
													<td>{teacherItem?.courseCreated || 0}</td>
													<td>4.5 / 5</td>
													<td className='tableActionBtns'>
														<div title='Edit Coupon' className='edit'><MdModeEdit size={15} /></div>
														<div title='Delete Coupon' className='delete'><AiOutlineDelete size={17} /></div>
													</td>
												</tr>

											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className='examToppers'>
					<div className='tableHeading'>
						<h2 className='heading'>Exam Toppers</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>
									<th>Role No.</th>
									<th>Name</th>
									<th>Course</th>
									<th>Quiz</th>
									<th>Total Questions</th>
									<th>Percent</th>
								</tr>
							</thead>
							<tbody>
								<tr>

									<td>545</td>
									<td>Vicky</td>
									<td>Class 11th Science</td>
									<td>Quiz Test 1</td>
									<td>20</td>
									<td>85%</td>
									<td className='tableActionBtns'>
										<div title='Edit Coupon' className='edit'><MdModeEdit size={15} /></div>
										<div title='Delete Coupon' className='delete'><AiOutlineDelete size={17} /></div>
									</td>
								</tr>
								<tr>
									<td>255</td>
									<td>Rishab Singh</td>
									<td>Class 12th Maths</td>
									<td>Set Theory Quiz</td>
									<td>11</td>
									<td>92%</td>
									<td className='tableActionBtns'>
										<div title='Edit Coupon' className='edit'><MdModeEdit size={15} /></div>
										<div title='Delete Coupon' className='delete'><AiOutlineDelete size={17} /></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className='recentTransactions'>
					<div className='tableHeading'>
						<h2 className='heading'>Recent Transcations</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>
									<th>Sr. No.</th>
									<th>Tracking ID</th>
									<th>Order ID</th>
									<th>Student</th>
									<th>Course</th>
									<th>Status</th>
									<th>Amount</th>
									<th>Txn. Time</th>
								</tr>
							</thead>
							<tbody>
								{
									transaction &&
									transaction.length > 0 &&
									transaction.map((txnItem, idx) => {
										return (
											<tr key={txnItem._id}>
												<td>{idx + 1}</td>
												<td>{txnItem?.tracking_id}</td>
												<td>{txnItem?.enrollment_id}</td>
												<td>{txnItem?.student?.first_name} {txnItem?.student?.last_name}</td>
												<td>{txnItem?.course?.title}</td>
												<td className='txnStatus'>
													{txnItem?.txn_status === "success" && (
														<>
															<span className='success'></span>
															<span>Success</span>
														</>

													)}
													{txnItem?.txn_status === "failure" && (
														<>
															<span className='failed'></span>
															<span>Failed</span>
														</>
													)}
													{txnItem?.txn_status === "cancel" && (
														<>
															<span className='cancel'></span>
															<span>Canceled</span>
														</>
													)}
													{txnItem?.txn_status === "aborted" && (
														<>
															<span className='cancel'></span>
															<span>Aborted</span>
														</>
													)}
												</td>
												<td>Rs. {txnItem?.txn_amount}</td>
												<td>{toDateString(txnItem?.createdAt, true)}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>

				{/* <div className="dashboardRow3 gridCol2">
				</div> */}

				<div className="dashboardRow4 ">
					<div className="adminMailSender">
						<div className='tableHeading'>
							<h2 className='heading'>Send Email</h2>
						</div>
						<div className='adminSendMail'>
							<div className='adminMailInput'>
								<label htmlFor="mailtoEmail">To:</label>
								<input value={mailData.sendTo} onChange={e => setMailData(prev => ({ ...prev, sendTo: e.target.value }))} type="text" id="mailtoEmail" />
							</div>
							{/* <div className='adminMailInput'>
								<label htmlFor="mailCC">Cc:</label>
								<input type="text" id="mailCC" />
							</div>
							<div className='adminMailInput'>
								<label htmlFor="mailtoEmail">Bcc:</label>
								<input type="text" id="mailtoEmail" />
							</div> */}
							<div className='adminMailInput'>
								<label htmlFor="mailSubject">Subject:</label>
								<input value={mailData.subject} onChange={e => setMailData(prev => ({ ...prev, subject: e.target.value }))} type="text" id="mailSubject" />
							</div>
							<div>
								<QuillToolbar hasSeparation={true} />
								<ReactQuill theme={"snow"}
									placeholder={"Write something awesome..."}
									modules={modules}
									formats={formats}
									className='adminDashEditor'
									value={mailData.htmlData}
									onChange={(data) => setMailData(prev => ({ ...prev, htmlData: data }))}
								/>
							</div>
							<div>
								<button onClick={sendMailToUser} className='sendThisMail'>Send Mail!</button>
							</div>
						</div>
					</div>
				</div>

				<div className='dashboardRow2'>
					<div className='tableContainer dashboard'>
						<div className='tableHeading'>
							<h2 className='heading'>New Student List</h2>
						</div>
						<div className="dashTable">
							<table className="dashboardTable">
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Date of Joining</th>
										<th>Fees</th>
										<th>Enrolled Courses</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{
										newStudents &&
										newStudents.length > 0 &&
										newStudents.map((student, idx) => {
											return (
												<tr key={student?._id}>
													<td>{idx + 1}</td>
													<td>{student?.first_name} {student?.last_name}</td>
													<td>{new Date(student.createdAt).toLocaleDateString()}</td>
													<td className='tableBadge success'><p>Paid</p></td>
													<td>{student?.enrolledCourseCount}</td>
													<td className='tableActionBtns'>
														<div title='Edit Coupon' className='edit'><MdModeEdit size={15} /></div>
														<div title='Delete Coupon' className='delete'><AiOutlineDelete size={17} /></div>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>

			</div>
		</AdminBase>
	)
}

export default Dashboard2