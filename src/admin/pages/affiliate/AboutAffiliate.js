import React, { useEffect, useState } from 'react'
import AdminBase from '../../adminBase/AdminBase'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API } from '../../../constant'
import Breadcrumb from '../../../utils/Breadcrumb';


import { getDayByNumber, toDateString } from "../../../functions/dateformate"
import Pagination from '../../../utils/Pagination'


const AboutTeacher = () => {

    const { affiliateId } = useParams();

    const [affiliateData, setAffiliateData] = useState({});
    const [couponData, setCouponData] = useState([]);

    const [totalCouponCount, setTotalCouponCount] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [paginationArray, setPaginationArray] = useState([]);


    // get teacher data 
    useEffect(() => {
        if (!affiliateId || affiliateId === "" || affiliateId === null) return;
        axios.get(`${API}/admin/affiliate/about/${affiliateId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status, affiliate } = res.data;
                if (status === "success") {
                    setAffiliateData(affiliate);
                }
            })
    }, [affiliateId])

    // get all courses by affiliateId and pageNo 
    useEffect(() => {
        if (!pageNo || pageNo <= 0 || pageNo === null) return;
        if (!affiliateId || affiliateId === "" || affiliateId === null) return;
        axios.get(`${API}/admin/affiliate/about/coupon/${affiliateId}?pageNo=${pageNo}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status, coupons, pagination, totalCoupons } = res.data;
                if (status === "success") {
                    setCouponData(coupons);
                    setPaginationArray(pagination);
                    setTotalCouponCount(totalCoupons)
                }
            })
    }, [affiliateId, pageNo])

    return (
        <AdminBase>
            <div className='aboutTeacherPage'>
                <div className="headingBar">
                    <h2 className='PageHeading'>Affiliate</h2>
                    <Breadcrumb breadcrumbData={[
                        {
                            link: "/admin/affiliate",
                            text: "Affiliate"
                        },
                        {
                            link: `/admin/affiliate/about/${affiliateId}`,
                            text: affiliateData.first_name + " " + affiliateData.last_name || "About",
                            noclick: true
                        }
                    ]} />
                </div>
                <div className='aboutTeacherGridData'>


                    <div className='aboutTeacherGridCol1'>

                        

                        {/* card one  */}
                        <div className="adminCard aboutTeacherMeta">
                            <div className="roundedImgDiv withOutline" style={{ height: "120px" }}>
                                <img src={affiliateData.dp ? affiliateData.dp : "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/elephant.jpg"} alt="" />
                            </div>
                            <div className='flexCenter pt-1 pb-3'>
                                <h2 className='adminBoldMDHeading'>{affiliateData?.name}</h2>
                                <p className="adminSubtitle">Teacher</p>
                            </div>
                            <div className="descLine">
                                <b>Email</b>
                                <a href={`mailto:${affiliateData?.email}`} className='descLink'>{affiliateData?.email}</a>
                            </div>
                            <div className="descLine lastItem">
                                <b>Phone No.</b>
                                <a href={`tel:${affiliateData?.phone}`} className='descLink'>{affiliateData?.phone}</a>
                            </div>
                        </div>

                        {/* card one  */}
                        <div className="adminCard">
                            <div className="cardHeading">
                                About Me
                            </div>
                            <div className='teacherAboutMeCard'>
                                <div className='text-[14px]'>
                                    {affiliateData?.bio}
                                </div>
                                <div className="descLine mt-4">
                                    <b>Gender</b>
                                    <p>{affiliateData?.gender}</p>
                                </div>
                                {
                                    affiliateData?.education?.name && (
                                        <div className="descLine">
                                            <b>Degree</b>
                                            <p>{affiliateData?.education?.name}</p>
                                        </div>
                                    )
                                }

                                <div className="descLine lastItem">
                                    <b>Coupons</b>
                                    <p>{couponData?.length}</p>
                                </div>

                                <div className='aboutTeacherSkills'>
                                    <p>Skills</p>
                                    <div className='skillItem'>
                                        {
                                            affiliateData?.skills &&
                                            affiliateData?.skills?.length > 0 &&
                                            affiliateData?.skills.map((skillItem, idx) => (
                                                <p key={idx}>{skillItem?.name}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='tableContainer dashboard'>
                        <div className="tableHeading">
                            <h2 className="heading">Teacher Courses</h2>
                        </div>
                        <div className="dashTable">
                            <table className="dashboardTable">
                                <thead>
                                    <tr>
                                        <th>Coupon Title</th>
                                        <th>Coupon Code</th>
                                        <th>Coupon Discount</th>
                                        <th>Course</th>
                                        <th>End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        couponData &&
                                        couponData.length > 0 &&
                                        couponData.map((couponItem) => (
                                            <tr key={couponItem._id}>
                                                <td>{couponItem?.title}</td>
                                                <td>{couponItem?.coupon_code}</td>
                                                <td>{couponItem?.coupon_price} {couponItem?.coupon_type === "percent" ? "%" : "RS"}</td>
                                                <td>{couponItem?.valid_courses?.title}</td>
                                                <td>{toDateString(couponItem?.end_time)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            
                            {
                                totalCouponCount > 10 &&
                                <Pagination
                                    perPage={10}
                                    pageNo={pageNo}
                                    pagination={paginationArray}
                                    totalPages={totalCouponCount}
                                    goNext={() => pageNo >= paginationArray.length ? setPageNo(1) : setPageNo(prev => prev + 1)}
                                    goPrev={() => pageNo <= 1 ? null : setPageNo(prev => prev - 1)}
                                    onPageChange={(p) => setPageNo(p)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AdminBase>
    )
}

export default AboutTeacher