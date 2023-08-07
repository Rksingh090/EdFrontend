import React, { useEffect, useState } from 'react'
import "./sales.css"

import AffilateBase from '../base/AffiliateBase'
import Breadcrumb from '../../utils/Breadcrumb';

import axios from 'axios';
import { API } from '../../constant';
import { toDateString } from '../../functions/dateformate';

const Sales = () => {
	const [enrollmentData, setEnrollmentData] = useState([]);

	useEffect(() => {
		axios.get(`${API}/affiliate/enrollment`, {
			headers: {
				token: localStorage.getItem("token")
			}
		}).then((res) => {
			setEnrollmentData(res.data.coupon)
			console.log(res.data.couopon);

		})
	}, [])

	return (
		<AffilateBase>
			<div className='dashboardContainer'>
				<div className="headingBar">
					<h2 className='PageHeading'>Sales</h2>
					<Breadcrumb type={"affiliate"} breadcrumbData={[{
						link: "/affiliate/dashboard",
						text: "Dashboard"
					}]} />
				</div>

				<div className='examToppers'>
					<div className='tableHeading'>
						<h2 className='heading'>Recent Course Sell</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>
									<th>Date of Course Sell</th>
									<th>Cource Name</th>
									<th>Student</th>
									<th>Coupon Code</th>
									<th>Cource Price</th>
									<th>Coupon Pirce</th>
									<th>Sale Price</th>
									<th>Tax & Other</th>
									<th>Basic Value</th>
									<th>Amount Earn</th>
									<th>Amount Qualified</th>
								</tr>
							</thead>
							<tbody>
								{
									enrollmentData.map((result) => {

										const taxAmmount = (Number(result?.final_price) * 20) / 120;
										const basicValue = Number(result.final_price) - taxAmmount;

										const earnedAmount = Math.round((basicValue * 15) / 100);

										let showQualifiedAmm = false;
										const todayDate = new Date();
										const purchaseDate = new Date(result.start_date);

										const dateDiff = Math.abs(todayDate - purchaseDate);
										const diffDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24)); 

										if(diffDays > 25){
											showQualifiedAmm = true;
										}

										return (
											<tr key={result._id}>
												<td>{toDateString(result.start_date, true)}</td>
												<td>{result.course.title}</td>
												<td>{result.student.first_name} {result.student.last_name}</td>
												<td>{result.coupon.coupon_code}</td>
												<td>Rs. {result.course.discount_price}</td>
												<td>Rs. {result.coupon_price}</td>
												<td>Rs. {result.final_price}</td>
												<td>Rs. {taxAmmount}</td>
												<td>Rs. {basicValue}</td>
												<td>Rs. {earnedAmount}</td>
												<td>{showQualifiedAmm ? `Rs. ${earnedAmount}` : "-"}</td>
											</tr>
										)
									})
								}


							</tbody>
						</table>
					</div>
				</div>



			</div>
		</AffilateBase>
	)
}

export default Sales