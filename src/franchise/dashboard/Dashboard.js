import React from 'react'
import "./dashboard.css";

import FranchiseBase from '../base/FranchiseBase'
import Breadcrumb from '../../utils/Breadcrumb';

import { HiOutlineUser, HiOutlineUsers } from 'react-icons/hi';
import { BiBookAlt } from 'react-icons/bi';
import { FiDollarSign } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';

const Dashboard2 = () => {

	return (
		<FranchiseBase>
			<div className='dashboardContainer'>
				<div className="headingBar">
					<h2 className='PageHeading'>Franchise  {" "} Dashboard</h2>
					<Breadcrumb breadcrumbData={[{
						link: "/franchise/dashboard",
						text: "Dashboard"
					}]} />
				</div>

				<div className='dashboardRow1'>
					<div className='dashboardCounters c1'>
						<div className='counterIcon'>
							<HiOutlineUsers />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Total Coupons</h4>
							<p className='counterCount'>0</p>
							<div className='counterProgress'><p style={{ width: "45%" }}></p></div>
							<p className='counterTitle noWrap'>45% increase in 28 Days</p>
						</div>
					</div>
					<div className='dashboardCounters c2'>
						<div className='counterIcon'>
							<HiOutlineUser />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Coupon Usage</h4>
							<p className='counterCount'>50</p>
							<div className='counterProgress'><p style={{ width: "40%" }}></p></div>
							<p className='counterTitle noWrap'>40% increase in 28 Days</p>
						</div>
					</div>
					<div className='dashboardCounters c3'>
						<div className='counterIcon'>
							<BiBookAlt />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Total Sells</h4>
							<p className='counterCount'>54</p>
							<div className='counterProgress'><p style={{ width: "85%" }}></p></div>
							<p className='counterTitle noWrap'>85% increase in 28 Days</p>
						</div>
					</div>
					<div className='dashboardCounters c4'>
						<div className='counterIcon'>
							<FiDollarSign />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Total Earning</h4>
							<p className='counterCount'>12,500 Rs.</p>
							<div className='counterProgress'><p style={{ width: "50%" }}></p></div>
							<p className='counterTitle noWrap'>50% increase in 28 Days</p>
						</div>
					</div>
				</div>

				<div className='examToppers'>
					<div className='tableHeading'>
						<h2 className='heading'>Recent Course Sell</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>
									<th>Student Name</th>
									<th>Coupon</th>
									<th>Course Price</th>
									<th>Course</th>
									<th>Class</th>
									<th>Selling Date</th>
									<th>Detail</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Rishab Singh</td>
									<td>RISHAB60</td>
									<td>21000</td>
									<td>Science</td>
									<td>Class 11th</td>
									<td>10th January, 2023</td>
									<td className='tableActionBtns'>
										<div title='View Details' className='view'><AiOutlineEye size={15} /></div>
									</td>
								</tr>
								<tr>
									<td>Suraj Singh</td>
									<td>VICKY159</td>
									<td>23000</td>
									<td>Maths</td>
									<td>Class 12th</td>
									<td>20th March 2023</td>
									<td className='tableActionBtns'>
										<div title='View Details' className='view'><AiOutlineEye size={15} /></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className='recentTransactions'>
					<div className='tableHeading'>
						<h2 className='heading'>Coupon Details</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Coupon Code</th>
									<th>Total Usage</th>
									<th>End Date</th>
									<th>Discount (Rs.)</th>
									<th>Max. Discount</th>
									<th>Detail</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>RISHU100</td>
									<td>100</td>
									<td>20th March 2024</td>
									<td>15%</td>
									<td>2000 Rs.</td>
									<td className='tableActionBtns'>
										<div title='Edit Coupon' className='view'><AiOutlineEye size={15} /></div>
									</td>
								</tr>
								<tr>
									<td>2</td>
									<td>CSOFF100</td>
									<td>25</td>
									<td>10 June 2023</td>
									<td>100 Rs.</td>
									<td>-</td>
									<td className='tableActionBtns'>
										<div title='Edit Coupon' className='view'><AiOutlineEye size={15} /></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</FranchiseBase>
	)
}

export default Dashboard2