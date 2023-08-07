import React, { useEffect } from 'react'
import FranchiseBase from '../base/FranchiseBase';

import "./coupon.css"
import { useDispatch, useSelector } from 'react-redux';
import { getFranchiseCoupon } from '../reducers/franchiseCouponReducer';
import { toDateString } from '../../functions/dateformate';

const Coupon = () => {
	const dispatch = useDispatch();

    const { coupons } = useSelector(state => state.franchisecoupon);


	useEffect(() => {
		dispatch(getFranchiseCoupon())
	}, [])

	return (
		<FranchiseBase>
			<div className="couponMainPage">
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
									<th>Coupon Discount</th>
									<th>Start Date </th>
									<th>End Date </th>
								</tr>
							</thead>
							<tbody>
							{coupons
                                    && coupons.length > 0
                                    && coupons.map((single_coupon, idx) => (
                                        <tr className='singleRow' key={single_coupon?._id}>
                                            <td>{idx}</td>
                                            <td>{single_coupon?.coupon_code}</td>
                                            <td>{single_coupon?.title}</td>
                                            <td>
                                                {single_coupon?.coupon_type === "percent" && <span>{single_coupon?.coupon_price}% (Max {single_coupon?.max_amount})</span>}
                                                {single_coupon?.coupon_type === "amount" && <span>{single_coupon?.coupon_price} RS (Max {single_coupon?.max_amount})</span>}
                                            </td>
                                            <td>{toDateString(single_coupon?.start_time)}</td>
                                            <td>{toDateString(single_coupon?.end_time)}</td>
                                        </tr>
                                    ))}
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</FranchiseBase>
	)
}

export default Coupon