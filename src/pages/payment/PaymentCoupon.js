import React, { useEffect, useState } from 'react'
import Base from "../../components/base/Base";

import "./payment.css";

import { MdCurrencyRupee } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { addIntoPendinCourse, getCourseById } from '../../reducers/CourseReducer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API } from '../../constant';

const PaymentCoupon = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { course_id } = useParams();

    const { oneCourse } = useSelector(state => state.course);

    const [couponData, setCouponData] = useState({
        coupon: {},
        code: "",
        discount: 0,
        applied: false
    })

    useEffect(() => {
        if (!course_id || course_id === "" || course_id === null || course_id === undefined) return;
        dispatch(getCourseById({ courseId: course_id }))
    }, [dispatch, course_id])


    // apply coupon 
    const checkCouponGetDiscount = async () => {
        try {

            const response = await axios.get(`${API}/coupon/course/${oneCourse?._id}/${couponData?.code}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            const data = response.data;
            if (data.status === "success") {
                setCouponData(prev => ({
                    ...prev,
                    coupon: data.coupon,
                    discount: data.discount,
                    applied: true
                }))
            }
        } catch (error) {
            console.warn(error);
        }
    }

    // remove coupon 
    const removeCoupon = () => {
        setCouponData(prev => ({
            ...prev,
            applied: false,
            coupon: {},
            discount: 0
        }))
    }

    // enroll in course
    const handleEnrollNow = async () => {
        let expiration = Number(oneCourse?.setting?.expiration);
        const expireData = new Date(new Date().setMonth(new Date().getMonth() + expiration));

        let data = {
            course: oneCourse?._id,
            completion_date: expireData
        }

        if (couponData.applied && couponData.coupon?._id) {
            data = {
                ...data,
                coupon: couponData.coupon?._id
            }
        }

        // enroll new student in course: free
        const response = await axios.post(`${API}/enrollment`, data, {
            headers: {
                token: localStorage.getItem("token")
            }
        });

        const { status, enrolled, enrollment, course } = response.data;
        if (status === "success" && enrolled) {
            dispatch(addIntoPendinCourse({ course, enrollment }))
            navigate(`/course/${oneCourse?._id}/${oneCourse?.slug}`)
        } else {
            axios.post(`${API}/payment/request`, {
                order_id: enrollment._id
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
                .then((res) => {
                    const { status, paymentPage } = res.data;
                    if (status === "success") {
                        window.location.href = paymentPage;
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }

    const proceedToBuy = () => {
        handleEnrollNow()
    }

    return (
        <Base className={"paymentPage"}>
            <div className='paymentCouponPage'>
                <div className={"paymentContainer"}>
                    <h2 className='orderSummary'>Order Summary</h2>
                    <div className="itemsAndCouponArea">
                        <div className="itemsColBox">
                            <h3 className='itemColBoxHeader'>Items in Cart</h3>
                            <div className="itemBox">
                                <div className="itemImgBox">
                                    <img src={oneCourse?.thumbnail || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/image/front-view-1686118474450.webp"} alt="" />
                                </div>
                                <div className="metaData">
                                    <div>
                                        <h4 className='title'>{oneCourse?.title}</h4>
                                        <p className='subTitle'>{oneCourse?.sub_category?.name}</p>
                                    </div>

                                    <div className='price'>
                                        <p className='itemPrice original'>
                                            <MdCurrencyRupee />
                                            <span>{oneCourse?.discount_price}</span>
                                        </p>
                                        {
                                            Number(oneCourse?.course_price) > Number(oneCourse?.discount_price) && (
                                                <p className='itemPrice discount'>
                                                    <MdCurrencyRupee />
                                                    <span>{oneCourse?.course_price}</span>
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='couponPriceArea'>
                            <div className='couponArea'>
                                <div className='couponFind'>
                                    <input type="text" value={couponData.code} onChange={e => setCouponData(prev => ({ ...prev, code: String(e.target.value).toUpperCase() }))} placeholder='Coupon Code' />

                                    <p className='findArea' onClick={!couponData.applied ? checkCouponGetDiscount : null}>
                                        Apply
                                    </p>
                                </div>
                            </div>

                            {
                                couponData.applied && (
                                    <div className='appliedCoupon'>
                                        <div>
                                            <p className='title'>{couponData?.coupon?.title}</p>
                                            <span className='discount'>
                                                {couponData?.coupon?.coupon_type === "percent" ?
                                                    `${couponData?.coupon?.coupon_price}% off (Max. ${couponData?.coupon?.max_amount})`
                                                    :
                                                    `Rs. ${couponData?.coupon?.coupon_price}`
                                                }
                                            </span>
                                        </div>
                                        <p className='removeCoupon' onClick={removeCoupon}>
                                            Remove
                                        </p>
                                    </div>
                                )
                            }

                            <hr className='hrFullWithSubtle' />

                            <div className='pricingCalculation'>
                                <h3 className='paymentSummaryTitle'>Payment Summary</h3>
                                <div className='titleWithPrice'>
                                    <p className="priceType">Price (1 item)</p>
                                    <span className='priceWithRupee'><MdCurrencyRupee /><span>{oneCourse?.course_price}</span></span>
                                </div>
                                <div className='titleWithPrice success'>
                                    <p className="priceType">Discount</p>
                                    <p className='priceWithRupee'>
                                        <span>-</span>
                                        <MdCurrencyRupee />
                                        <span>{String(Number(oneCourse?.course_price) - Number(oneCourse?.discount_price))}</span>
                                    </p>
                                </div>
                                <div className='titleWithPrice'>
                                    <p className="priceType">Delivery Charges</p>
                                    <span className='priceWithRupee'><MdCurrencyRupee /><span>0</span></span>
                                </div>
                                <div className='titleWithPrice success'>
                                    <p className="priceType">Coupon Discount</p>
                                    <span className='priceWithRupee'>-<MdCurrencyRupee /><span>{couponData?.discount}</span></span>
                                </div>

                                <hr className='hrFullWithSubtle my1' />
                                <div className='titleWithPrice bigBoldText'>
                                    <p className="priceType">Total</p>
                                    <span className='priceWithRupee'><MdCurrencyRupee /><span>{String(Number(oneCourse?.discount_price) - Number(couponData.discount))}</span></span>
                                </div>
                            </div>

                            <button className='paymentProcessPage' onClick={() => proceedToBuy()}>
                                Proceed to Buy
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default PaymentCoupon