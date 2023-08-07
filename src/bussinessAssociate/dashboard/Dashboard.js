import React, { useEffect } from 'react'
import "./dashboard.css";

import BussinessBase from '../base/BussinessAss'
import Breadcrumb from '../../utils/Breadcrumb';

import { HiOutlineUser, HiOutlineUsers } from 'react-icons/hi';
import { BiBookAlt } from 'react-icons/bi';
import { FiDollarSign } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../reducer/bussinessDashboardReducer';
import { toDateString } from '../../functions/dateformate';

const Dashboard2 = () => {
	const dispatch = useDispatch();

	const { dashboard: { coupons, couponCount, enrollmentCount, enrollments, totalSellAmount, totalEarnings } } = useSelector(state => state.bussinessDashboard);


	useEffect(() => {
		dispatch(getDashboardData())
	}, [dispatch])

	return (
		<BussinessBase>
			<div className='dashboardContainer'>
				<div className="headingBar">
					<h2 className='PageHeading'>Associate Dashboard</h2>
					<Breadcrumb type="affiliate"  breadcrumbData={[{
						link: "/affilate/dashboard",
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

							<p className='counterCount'>{couponCount}</p>
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
							<p className='counterCount'>{enrollmentCount}</p>
							<div className='counterProgress'><p style={{ width: "40%" }}></p></div>
							<p className='counterTitle noWrap'>40% increase in 28 Days</p>
						</div>
					</div>

					<div className='dashboardCounters c3'>
						<div className='counterIcon'>
							<BiBookAlt />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Total Sell Amount</h4>
							<p className='counterCount'>{totalSellAmount} Rs.</p>
							<div className='counterProgress'><p style={{ width: "100%" }}></p></div>
							<p className='counterTitle noWrap'>Sell Course Amount (Last 28 Days)</p>
						</div>
					</div>

					<div className='dashboardCounters c4'>
						<div className='counterIcon'>
							<FiDollarSign />
						</div>
						<div className="dashCounterData">
							<h4 className='counterTitle'>Total Earning</h4>
							<p className='counterCount'>{totalEarnings} Rs.</p>
							<div className='counterProgress'><p style={{ width: "100%" }}></p></div>
							<p className='counterTitle noWrap'>Total Earning (All time)</p>
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
									<th>Date of Course Sell</th>
									<th>Cource Name</th>
									<th>Student</th>
									<th>Coupon Code</th>
									<th>Cource Price</th>
									<th>Coupon Price</th>
									<th>Sale Price</th>
									<th>Tax & Other</th>
									<th>Basic Value</th>
									<th>Amount Earn</th>
									<th>Amount Qualified</th>
								</tr>
							</thead>
							<tbody>
								{
									enrollments &&
									enrollments?.length > 0 &&
									enrollments?.map((enrollmentItem) => {
										const taxAmmount = (Number(enrollmentItem?.final_price) * 20) / 120;
										const basicValue = Number(enrollmentItem.final_price) - taxAmmount;

										const earnedAmount = Math.round((basicValue * 15) / 100);

										let showQualifiedAmm = false;
										const todayDate = new Date();
										const purchaseDate = new Date(enrollmentItem.start_date);

										const dateDiff = Math.abs(todayDate - purchaseDate);
										const diffDays = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

										if (diffDays > 25) {
											showQualifiedAmm = true;
										}

										return (
											<tr key={enrollmentItem?._id}>
												<td>{toDateString(enrollmentItem.start_date, true)}</td>
												<td>{enrollmentItem.course.title}</td>
												<td>{enrollmentItem.student.first_name} {enrollmentItem.student.last_name}</td>
												<td>{enrollmentItem.coupon.coupon_code}</td>
												<td>Rs. {enrollmentItem.course.discount_price}</td>
												<td>Rs. {enrollmentItem.coupon_price}</td>
												<td>Rs. {enrollmentItem.final_price}</td>
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

				<div className='recentTransactions'>
					<div className='tableHeading'>
						<h2 className='heading'>Coupon Details</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>

									<th>Sr.</th>
									<th>Coupon Code</th>
									<th>Coupon Name</th>
									<th>Course Name</th>
									<th>Coupon Discount</th>
									<th>Start Date </th>
									<th>End Date </th>
								</tr>
							</thead>
							<tbody>
								{
									coupons &&
									coupons.length > 0 &&
									coupons.map((single_coupon, idx) => (
										<tr className='singleRow' key={single_coupon?._id}>
											<td>{idx + 1}</td>
											<td>{single_coupon?.coupon_code}</td>
											<td>{single_coupon?.title}</td>
											<td>{single_coupon?.valid_courses[0]?.title}</td>
											<td>
												{single_coupon?.coupon_type === "percent" && <span>{single_coupon?.coupon_price}% (Max {single_coupon?.max_amount})</span>}
												{single_coupon?.coupon_type === "amount" && <span>{single_coupon?.coupon_price} RS (Max {single_coupon?.max_amount})</span>}
											</td>
											<td>{toDateString(single_coupon?.start_time)}</td>
											<td>{toDateString(single_coupon?.end_time)}</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</BussinessBase>
	)
}

export default Dashboard2