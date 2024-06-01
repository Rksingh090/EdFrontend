import React, { useEffect, useState } from 'react'
import "./coupon.css";

import AdminBase from '../../adminBase/AdminBase';
import Breadcrumb from '../../../utils/Breadcrumb';

import { useDispatch, useSelector } from 'react-redux';

import { getCouponByPage, deletCouponById, totalCouponsPagination } from '../../../reducers/CouponReducer';

import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { BsCheck2 } from 'react-icons/bs';
import { RxCopy } from 'react-icons/rx';
import Pagination from '../../../utils/Pagination';

const Coupon = () => {
    const dispatch = useDispatch();

    const [currentCopyId, setCurrentCopyId] = useState("");

    const copyID = (teacherId) => {
        if(navigator.clipboard){
            navigator.clipboard.writeText(teacherId)
            setCurrentCopyId(teacherId)
            setTimeout(() => {
                setCurrentCopyId("")
            }, 1000)
        }else{
        
        }
    }

    const { coupons, currPageNo, perPageItem } = useSelector(state => state.coupon);


    useEffect(() => {
        dispatch(getCouponByPage({ pageNo: currPageNo, perPage: perPageItem }))
    }, [dispatch, currPageNo, perPageItem])

    useEffect(() => {
        dispatch(totalCouponsPagination({ perPage: perPageItem }))
    }, [dispatch, perPageItem])


    const deleteCoupon = (couponId) => {
        dispatch(deletCouponById({ couponId }))
    }


    return (
        <div className='adminCoupons'>
            <div className="headingBar">
                <h2 className='PageHeading'>Coupons</h2>
                <Breadcrumb breadcrumbData={[
                    {
                        link: "/admin/coupon",
                        text: "Coupon"
                    }
                ]} />
            </div>
            <div className='tableContainer'>
                <div className='tableHeading'>
                    <h2 className='heading'>All Coupons</h2>
                </div>
                <div className='couponCreateDiv'>
                    <Link to={"/admin/coupon/add"}>
                        <span>Add New</span>
                        <AiOutlinePlus color='white' size={18} />
                    </Link>
                </div>
                <div className='tableSearchDiv'>
                    <div className='perEntrySelect'>
                        <span>Show</span>
                        <select>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <span>Entries</span>
                    </div>
                    <div className='tableSearchContainer'>
                        <p>Search: </p>
                        <input type="text" className='inputBG' placeholder='Search Coupon...' />
                    </div>
                </div>
                <div className="couponTable">
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Coupon Code</th>
                                <th>Coupon Title</th>
                                <th>Discount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons
                                && coupons.length > 0
                                && coupons.map((single_coupon, idx) => (
                                    <tr className='singleRow' key={single_coupon?._id}>
                                        <td>{(((currPageNo - 1) * Number(perPageItem)) + idx + 1)}</td>
                                        <td>{single_coupon?.coupon_code}</td>
                                        <td>{single_coupon?.title}</td>
                                        <td>
                                            {single_coupon?.coupon_type === "percent" && <span>{single_coupon?.coupon_price}% (Max {single_coupon?.max_amount})</span>}
                                            {single_coupon?.coupon_type === "amount" && <span>{single_coupon?.coupon_price} RS (Max {single_coupon?.max_amount})</span>}
                                        </td>
                                        <td className='tableActionBtns'>
                                            <div title='Edit Coupon' className='edit'><MdModeEdit size={15} /></div>
                                            <div title='Delete Coupon' className='delete' onClick={() => deleteCoupon(single_coupon?._id)}><AiOutlineDelete size={17} /></div>
                                            <div title='Copy Coupon' className='view' onClick={() => copyID(single_coupon.coupon_code)}>
                                                {
                                                    currentCopyId === single_coupon._id ?
                                                        (
                                                            <BsCheck2 size={17} />
                                                        )
                                                        :
                                                        (
                                                            <RxCopy size={17} />
                                                        )
                                                }

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>
                </div>
                <Pagination
                    pagination={[1]}
                    pageNo={1}
                    onPageChange={(page) => console.log(page)}
                    perPage={10}
                    totalPages={20}
                />
            </div>
        </div>
    )
}

export default Coupon