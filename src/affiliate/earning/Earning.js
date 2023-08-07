import React from 'react'
import "./earning.css";

import AffilateBase from '../base/AffiliateBase'
import Breadcrumb from '../../utils/Breadcrumb';

import { AiOutlineEye } from 'react-icons/ai';

const Earning = () => {
	const [enrollmentData,setEnrollmentData]=useState([]);

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
					<h2 className='PageHeading'>Earning</h2>
					<Breadcrumb type={"affiliate"} breadcrumbData={[{
						link: "/affiliate/dashboard",
						text: "Dashboard"
					}]} />
				</div>

				<div className='dashboardRow1'>
		
				</div>

				<div className='examToppers'>
					<div className='tableHeading'>
						<h2 className='heading'>Recent Course Sell</h2>
					</div>
					<div className='examToppersTable'>
						<table className="dashboardTable striped">
							<thead>
								<tr>
                                <th>Coupon</th>
							    <th>Student Name</th>
									
									<th>Course Price</th>
                                    <th>Net Earning</th>
									<th>Cources</th>
									<th>Selling Date</th>
									<th>Detail</th>
								</tr>
							</thead>
							<tbody>
							  
								<tr>
									<td>Suraj1234</td>
									<td>Suraj kumar</td>
									<td>23000</td>
                                    <td>18400</td>
									<td>Mcom</td>
									<td>20th March 2023</td>
									<td className='tableActionBtns'>
										<div title='View Details' className='view'><AiOutlineEye size={15} /></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				

			</div>
		</AffilateBase>
	)
}

export default Earning