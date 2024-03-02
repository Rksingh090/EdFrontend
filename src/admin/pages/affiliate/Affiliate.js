import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsCheck2 } from 'react-icons/bs'
import { RxCopy } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import Switch from '../../../components/utils/Switch'
import { MdModeEdit } from 'react-icons/md'

import "./affiliate.css";
import Pagination from '../../../utils/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getAffiliateByPageNo } from '../../reducers/AffiliateReducer'

const Affiliate = () => {

	const dispatch = useDispatch()

	const { pageNo } = useSelector(state => state.adminaffiliate)

	useEffect(() => {
		try {
			dispatch(getAffiliateByPageNo({ pageNo }))
		} catch (error) {
			console.log(error);
		}
	}, [pageNo, dispatch])

	return (
		<div className='affiliatePage'>
			<AffiliateTableView />
		</div>
	)
}

const AffiliateTableView = () => {

	const { pageNo, affiliates, pagination, totalAffiliates } = useSelector(state => state.adminaffiliate)

	const [currentCopyId, setCurrentCopyId] = useState("");
	const dispatch = useDispatch()

	const copyID = (affiliateId) => {
		navigator.clipboard.writeText(affiliateId)
		setCurrentCopyId(affiliateId)
		setTimeout(() => {
			setCurrentCopyId("")
		}, 1000)
	}

	return (

		<div className='tableContainer'>
			<div className='tableHeading'>
				<h2 className='heading'>All Affilaites</h2>
			</div>
			<div className='couponCreateDiv'>
				<Link to="/admin/affiliate/add">
					<span>Add New Affiliate</span>
					<AiOutlinePlus color='white' size={18} />
				</Link>
			</div>

			<div className="couponTable">
				<table className='styled-table'>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Gender</th>
							<th>Account Status</th>
							<th>Mobile No.</th>
							<th>Email</th>
							<th>Joining Date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{
							affiliates &&
							affiliates.length > 0 &&
							affiliates.map((affiliateItem, idx) => {
								return (
									<tr className='singleRow' key={affiliateItem?._id}>
										<td>{idx + 1}</td>

										<td>
											<Link className='text-[var(--main)]' to={`/admin/affiliate/about/${affiliateItem?._id}`}>
												{affiliateItem?.first_name} {affiliateItem?.last_name}
											</Link>
										</td>
										<td className='capitalize'>{affiliateItem?.gender || "male"}</td>
										<td>{affiliateItem?.account_status}</td>
										<td>{affiliateItem?.phone}</td>
										<td>{affiliateItem?.email}</td>
										<td>{new Date(affiliateItem?.createdAt).toLocaleDateString()}</td>
										<td className='tableActionBtns'>
											<Switch title={
												affiliateItem?.account_status === "active" ?
													"Ban Affiliate" :
													affiliateItem?.account_status === "not-approved" ?
														"Approve Affiliate" :
														affiliateItem?.account_status === "not-verified" ?
															"Activate Account"
															: "Unban Affiliate"
											} className={"noStyle"} value={affiliateItem?.account_status === "active"} />
											<Link title='Edit Coupon' to={`/admin/affiliate/edit/${affiliateItem?._id}`} className='edit'><MdModeEdit size={18} /></Link>
											{/* <div title='Delete Coupon' className='delete'><AiOutlineDelete size={17} /></div> */}
											<div title='Copy Teacher ID' className='view' onClick={() => copyID(affiliateItem?._id)} >
												{
													currentCopyId === affiliateItem?._id ?
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
				totalPages={totalAffiliates}
				perPage={10}
				onPageChange={(page) => dispatch({ type: "adminaffiliate/setPageNo", payload: page })}
				goNext={() => pageNo < pagination.length ? dispatch({ type: "adminaffiliate/setPageNo", payload: pageNo + 1 }) : null}
				goPrev={() => pageNo > 1 ? dispatch({ type: "adminaffiliate/setPageNo", payload: pageNo - 1 }) : null}
			/>
		</div>
	)
}

export default Affiliate;