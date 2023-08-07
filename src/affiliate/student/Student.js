import React, { useState } from 'react'
import "./student.css"

import AffilateBase from '../base/AffiliateBase'
import Breadcrumb from '../../utils/Breadcrumb';
import { toDateString } from '../../functions/dateformate';

const Student = () => {
	const [enrollmentData, setEnrollmentData] = useState([]);

	return (
		<AffilateBase>
			<div className='dashboardContainer'>
				<div className="headingBar">
					<h2 className='PageHeading'>Students</h2>
					<Breadcrumb type={"affiliate"} breadcrumbData={[{
						link: "/affiliate/dashboard",
						text: "Dashboard"
					}]} />
				</div>

				<div className='examToppers'>
					<div className='tableHeading'>
						<h2 className='heading'>Student</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>
									<th>Date</th>
									<th>Student Name</th>
									<th>Cources</th>
									<th>Coupon Apply</th>
									<th>Sale Price</th>
								</tr>
							</thead>
							<tbody>
								{enrollmentData.map((result) => (
									<tr>
										<td>{toDateString(result.createdAt)}</td>
										<td>{result.student.first_name} {result.student.last_name}</td>
										<td>{result.course.title}</td>
										<td>{result.coupon.coupon_code}</td>
										<td>{result.final_price}</td>


									</tr>
								))
								}

							</tbody>
						</table>
					</div>
				</div>



			</div>
		</AffilateBase>
	)
}

export default Student