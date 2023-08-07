import React, { useState } from 'react';
import { TfiAnnouncement } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';

import TeacherSidebar from '../../components/base/TeacherSidebar';
import { MdOutlineClose } from 'react-icons/md';
import ModalForm from '../../components/utils/ModalForm';
import { DivOutsideClick } from '../../components/utils/Outsideclick';
import { useEffect } from 'react';
import { addNewAnnouncement, getTeacherAnnouncement } from '../../reducers/AnnouncementReducer';

const Announcements = () => {

	const dispatch = useDispatch();

	const { teacher: { announcements } } = useSelector(state => state.announcement);
	const { teacher: { mycourses } } = useSelector(state => state.course);

	const [showForm, setshowForm] = useState(false)
	const [announcementData, setAnnouncementData] = useState({
		course: "",
		title: "",
		description: "",
	});

	// hide create announcement form 
	const handleForm = () => {
		setshowForm(!showForm)
	}

	const addAnnouncement = () => {
		dispatch(addNewAnnouncement(announcementData))
		setshowForm(false);
	}

	// set first course id as course 
	useEffect(() => {
		if(announcementData?.course === "" && mycourses?.length > 0) {
			setAnnouncementData(prev => (
				{
					...prev,
					course: mycourses[0]._id
				}
			))
		}
	}, [announcementData?.course])

	useEffect(() => {
		dispatch(getTeacherAnnouncement())
	}, [dispatch])

	return (
		<TeacherSidebar>
			<ModalForm visible={showForm}>
				<DivOutsideClick onOutsideClick={() => setshowForm(false)} className='w-[600px] bg-white rounded-[20px] flex flex-col p-4'>
					<div className='announcementFormHeader'>
						<h1 className='announcementHeadText '>Add Announcement</h1>
						<MdOutlineClose size={22} onClick={handleForm} />
					</div>
					<div className='announcementFormBody'>
						<div className='flex flex-col gap-1'>
							<p className='announcementFormInputText'>Select Course</p>
							<select name="cars" id="cars" className='announcementFormInput' onChange={(e) => setAnnouncementData(prev => ({ ...prev, course: e.target.value }))}>
								<option value={""} disabled={true}>Select Course</option>
								{
									mycourses &&
									mycourses.length > 0 &&
									mycourses.map((mycourse) => {
										return (
											<option key={mycourse?._id} value={mycourse?._id}>{mycourse?.title}</option>
										)
									})
								}
							</select>
						</div>
						<div className='flex flex-col gap-1'>
							<p className='announcementFormInputText'>Announcement Title</p>
							<input type="text"
								value={announcementData?.title}
								onChange={(e) => setAnnouncementData(prev => ({ ...prev, title: e.target.value }))}
								placeholder='Announcement Title' className='announcementFormInput' />
						</div>
						<div className='flex flex-col gap-1'>
							<p className='announcementFormInputText'>Summary</p>
							<textarea
								value={announcementData?.description}
								onChange={(e) => setAnnouncementData(prev => ({ ...prev, description: e.target.value }))}
								rows="6" placeholder='Summary.....'
								className='announcementFormInput'>

							</textarea>
						</div>
						<div className='flex items-center gap-3'>
							<input type="checkbox" />
							<p className='font-[500] text-[#808080]'>Send on-site notification to all students of this course.</p>
						</div>
						<div className='flex items-center gap-3'>
							<input type="checkbox" />
							<p className='font-[500] text-[#808080]'>Send on-site notification to all students of this course.</p>
						</div>
						<div className='flex justify-between py-4'>
							<button onClick={handleForm} className='bg-white text-[#6363e9] border-[1px] border-[#6363e9] px-3 rounded-md py-1'>Cancel</button>
							<button onClick={addAnnouncement} className='text-white bg-[#6363e9] border-[1px] border-[#6363e9] px-3 rounded-md py-1'>Publish</button>
						</div>

					</div>
				</DivOutsideClick>
			</ModalForm>

			<div className='w-[100%] pt-8'>

				<div className='flex justify-between border-[1px] p-4'>
					<div className='flex items-center gap-8'>
						<div className='w-[50px] h-[50px] bg-gray-100 flex justify-center items-center rounded-full'>
							<TfiAnnouncement className='text-[#0000FF]' />

						</div>
						<div>
							<p className='text-[15px] text-[#808080]'>Create Announcement</p>
							<p className='text-[24px]'>Notify all students of your course</p>

						</div>
					</div>
					<div>
						<button className='addNewAssignmentFormBTN' onClick={handleForm}>Add New Announcement</button>
					</div>

				</div>
				<div className='flex flex-row items-center justify-start flex-wrap gap-x-4 pt-4 pb-6'>
					<div>
						<p className='py-3'>Courses</p>
						<select className='outline-none border-[1px] min-w-[150px] p-2 px-6 rounded-md'>
							<option value="volvo">All</option>
							<option value="saab">Saab</option>
							<option value="opel">Opel</option>
							<option value="audi">Audi</option>
						</select>

					</div>
					<div>
						<p className='py-3'>Sort By</p>
						<select className='outline-none border-[1px] min-w-[120px] p-2 px-6 rounded-md'>
							<option value="desc">DESC</option>
							<option value="saab">Saab</option>
							<option value="opel">Opel</option>
							<option value="audi">Audi</option>
						</select>
					</div>
					<div>
						<p className='py-3'>Date</p>
						<input className='outline-none border-[1px] min-w-[100px] p-2 px-6 rounded-md' type='date' defaultValue={new Date().toISOString().substring(0, 10)} min="2022-01-01" max="2023-12-31" ></input>
					</div>

				</div>
				<div className=''>
					<table className="styled-table m-0">
						<thead className='announcementTableHead'>
							<tr>
								<th><p className='py-1 text-xl font-[500]'>Date</p></th>
								<th><p className='py-1 text-xl font-[500]'>Announcement</p></th>
								<th></th>
							</tr>
						</thead>
						<tbody className='announcementTableBody'>
							{announcements.length > 0 && announcements.map((announcement) => {
								return (
									<tr key={announcement._id}>
										<td>
											<p className='font-[500]'>July 12, 2022</p>
											<span className='text-[#808080]'>2:32pm</span>
										</td>
										<td>
											<p className='text-lg'>{announcement.title}</p>
											<p className='text-[#808080]'>Course: {announcement.course?.title}</p>
										</td>
										<td className='detailsTD'><p className='showDetails'>Details</p></td>
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

export default Announcements