import React, { useEffect, useState } from 'react'
import "./createCoupon.css"

import BussinessBase from '../base/BussinessAss'
import Breadcrumb from '../../utils/Breadcrumb';

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API } from '../../constant';
import { generateCodes } from '../../functions/codeGenerator';

const CreateCoupon = () => {

	const [title, setTitle] = useState("");
	const [selectedCourse, setSelectedCourse] = useState("")
	const [allCourses, setAllCourses] = useState([]);
	const [generateCouponCourse, setGenerateCoupoonCourse] = useState("");
	const [courseSearch, setCourseSearch] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (!courseSearch || courseSearch === "" || courseSearch.length < 3) return;
		axios.get(`${API}/search/course/title/${courseSearch}`, {
			headers: {
				token: localStorage.getItem("token")
			}
		})
			.then((res) => {
				const { course, status } = res.data;
				if (status === "success") {
					setAllCourses(course)
				}

			})
	}, [dispatch, courseSearch]);



	const handleClickData = (data) => {
		setSelectedCourse(data)
		setAllCourses([])
		setCourseSearch("")
	}

	const handlegenerate = () => {
		const generatedCode = generateCodes(10)
		setGenerateCoupoonCourse(generatedCode)
	};

	const handlecreatecuponbutton = () => {
		axios.post(`${API}/business/coupon`, {
			title: title,
			coupon_code: generateCouponCourse,
			course: selectedCourse._id
		}, {
			headers: {
				token: localStorage.getItem("token")
			}
		}).then((res) => {
			const { status } = res.data;
			if (status === "success") {
				alert("Coupon Created")
			}
		})
	};


	return (
		<BussinessBase>
			<div className='dashboardContainer'>
				<div className="headingBar">
					<h2 className='PageHeading'>Create Coupon</h2>
					<Breadcrumb type="affiliate" breadcrumbData={[{
						link: "/affiliate/create-coupon",
						text: "Create Coupon",
						noclick: true
					}]} />
				</div>
				<div className='createCouponContainer'>
					<h1 className='heading'>Generate a link using a URL</h1>
					<input type="text" className='AffCCInput' value={title} onChange={(e) => setTitle(e.target.value)} placeholder={"title"} />


					<div className='AffCCClassSearch'>
						<input type="text" className='AffCCInput' value={courseSearch} onChange={e => setCourseSearch(e.target.value)} placeholder='search course..' />

						<div className='AffCCCourseList'>
							{allCourses && allCourses.length > 0 && allCourses.map((data) => {
								return (
									<p key={data._id} onClick={() => handleClickData(data)}>{data.title} - {data.sub_category?.name}</p>
								)
							})}
						</div>

						{
							selectedCourse && (
								<div className='AffCCSelectedCourse'>
									<p>{selectedCourse.title} - {selectedCourse.sub_category?.name}</p>
								</div>
							)
						}
					</div>
					<div className='AffCCCouponCode'>
						<input type="text" value={generateCouponCourse} className='AffCCInput' onChange={(e) => setGenerateCoupoonCourse(e.target.value)} placeholder='Coupon Code' />
						<button onClick={handlegenerate}>Generate</button>
					</div>
					<div className='AffCCBtn'>
						<button className="createCouponbutton" onClick={handlecreatecuponbutton}>Create Coupon</button>
					</div>
				</div>


			</div>
		</BussinessBase>
	)
}

export default CreateCoupon