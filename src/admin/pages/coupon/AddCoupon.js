import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { generateCodes } from '../../../functions/codeGenerator';
import { createNewCoupon } from '../../../reducers/CouponReducer';

import AdminBase from '../../adminBase/AdminBase';
import Breadcrumb from '../../../utils/Breadcrumb';

import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { searchCourseByName } from '../../../reducers/CourseReducer';
import { searchFranchiseByName } from '../../../reducers/UserReducer';

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [courseSearch, setCourseSearch] = useState("");
    const [searchCourseData, setSearchCourseData] = useState([]);

    const [selectedCourses, setSelectedCourse] = useState([]);

    const [franchiseSearch, setFranchiseSearch] = useState("");
    const [searchFranchiseData, setSeachFranchiseData] = useState("");

    const [selectedFranchise, setSelectedFranchise] = useState("");

    const [couponData, setCouponData] = useState({
        title: "",
        description: "",
        coupon_price: 1,
        coupon_code: "",
        coupon_type: "amount",
        max_amount: 100,
        max_usage: 5,
        max_user_usage: 2,
        start_time: new Date().toISOString().substring(0, 16),
        end_time: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().substring(0, 16),
        valid_courses: [],
        valid_product_type: "all",
        seller: "",
        seller_type: "all"
    })

    const generateCodeAndSet = () => {
        const uniqueCode = generateCodes(10);
        setCouponData(prev => ({
            ...prev,
            coupon_code: uniqueCode
        }))
    }

    // create new coupon action dispatch 
    const onCreateCoupon = (e) => {
        e.preventDefault();

        if(couponData.valid_product_type === "all"){
            setCouponData(prev => ({
                ...prev,
                valid_courses: []
            }))
        }

        if(couponData.seller_type === "all"){
            let allData = couponData;
            delete allData.seller;
            setCouponData(allData)
        }

        dispatch(createNewCoupon(couponData))
            .then(() => {
                navigate("/admin/coupon")
            })
    }

    const handleCourseSearch = (e) => {
        const { value } = e.target;
        setCourseSearch(value)
        if (value.length < courseSearch.length) return;
        if (value.length > 3) {
            dispatch(searchCourseByName(value))
                .then((action) => {
                    const { status, course } = action.payload;
                    if (status === "success") {
                        console.log(course)
                        setSearchCourseData(course)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const handleFranchiseSearch = (e) => {
        const { value } = e.target;
        setFranchiseSearch(value)
        if (value.length < franchiseSearch.length) return;
        if (value.length > 3) {
            dispatch(searchFranchiseByName(value))
                .then((action) => {
                    const { status, franchise } = action.payload;
                    if (status === "success") {
                        console.log(franchise)
                        setSeachFranchiseData(franchise)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const handleCourseItemClick = (courseItem) => {
        try {
            setCourseSearch("")
            setSearchCourseData([])

            setSelectedCourse(prev => [
                ...prev,
                courseItem
            ])

            setCouponData(prev => ({
                ...prev,
                valid_courses: [...prev.valid_courses, courseItem?._id]
            }))

        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectFranchise = (franchise) => {
        try {
            setFranchiseSearch("")
            setSeachFranchiseData([])

            setSelectedFranchise(franchise)
            setCouponData(prev => ({
                ...prev,
                seller: franchise?._id
            }))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminBase>
            <div className='addNewCouponForm'>
                <div className="headingBar">
                    <h2 className='PageHeading'>Coupon</h2>
                    <Breadcrumb breadcrumbData={[
                        {
                            link: "/admin/coupon",
                            text: "Coupons"
                        },
                        {
                            link: "/admin/coupon/add",
                            text: "Add Coupon"
                        }
                    ]} />
                </div>
                <div className="tableContainer">
                    <div className="tableHeading">
                        <h2 className='heading'>Add New Coupon</h2>
                    </div>

                    <form className='createCouponForm' onSubmit={onCreateCoupon}>
                        <div className='flexColInput'>
                            <label>Title</label>
                            <input
                                value={couponData.title}
                                onChange={(e) => setCouponData(prev => ({ ...prev, title: e.target.value }))}
                                type="text" id="formTitle" className="FormInput" />
                        </div>
                        <div className='flexColInput'>
                            <label>Description</label>
                            <textarea
                                value={couponData.description}
                                onChange={(e) => setCouponData(prev => ({ ...prev, description: e.target.value }))}
                                type="text" id="formDescrition" className="FormInput" rows={6} />
                        </div>
                        <div className='flexColInput'>
                            <label>Coupon Code</label>
                            <div className='customGenerateButton'>
                                <input
                                    value={couponData.coupon_code}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, coupon_code: String(e.target.value).toUpperCase() }))}
                                    type="text" className="FormInput" />
                                <div className='generateCouponCodeDiv'>
                                    <button type='button' onClick={generateCodeAndSet} className=''>Generate</button>
                                </div>
                            </div>
                        </div>
                        <div className='inputDivideDiv two'>
                            <div className='flexColInput'>
                                <label>Start Date-Time</label>
                                <input
                                    value={couponData.start_time}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, start_time: e.target.value }))}
                                    type="datetime-local" className="FormInput" />
                            </div>
                            <div className='flexColInput'>
                                <label>End Date-Time</label>
                                <input
                                    value={couponData.end_time}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, end_time: e.target.value }))}
                                    type="datetime-local" className="FormInput" />
                            </div>
                        </div>
                        <div className='inputDivideDiv two'>
                            <div className='flexColInput'>
                                <label>Coupon Discount</label>
                                <input
                                    value={couponData.coupon_price}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, coupon_price: e.target.value }))}
                                    type="number" className="FormInput noNumberStyle" />
                            </div>
                            <div className='flexColInput'>
                                <label>Coupon Type</label>
                                <select className="FormInput"
                                    value={couponData.coupon_type}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, coupon_type: e.target.value }))}
                                >
                                    <option value="percent">percent</option>
                                    <option value="amount">amount</option>
                                </select>
                            </div>
                        </div>
                        <div className='inputDivideDiv two' >
                            <div className='flexColInput'>
                                <label>Max. Discount (RS.)</label>
                                <input
                                    value={couponData.max_amount}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, max_amount: e.target.value }))}
                                    type="number" className="FormInput noNumberStyle" />
                            </div>
                        </div>
                        <div className='inputDivideDiv two'>
                            <div className='flexColInput'>
                                <label>Max Use (0 for no limit)</label>
                                <input
                                    value={couponData.max_usage}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, max_usage: e.target.value }))}
                                    type="number" className="FormInput noNumberStyle" />
                            </div>
                            <div className='flexColInput'>
                                <label>Max Usage by User (0 for no limit)</label>
                                <input
                                    value={couponData.max_user_usage}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, max_user_usage: e.target.value }))}
                                    type="number" className="FormInput noNumberStyle" />
                            </div>
                        </div>
                        <div className='inputDivideDiv two'>
                            <div className='flexColInput'>
                                <label>Coupon Usage Type</label>
                                <select className='FormInput'
                                    value={couponData.valid_product_type}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, valid_product_type: e.target.value }))}
                                >
                                    <option value="all" >all</option>
                                    <option value="course">course</option>
                                </select>
                            </div>
                        </div>

                        {
                            couponData.valid_product_type === "course" && (
                                <div className='flexColInput'>
                                    <label>Select Course</label>
                                    <input value={courseSearch} onChange={handleCourseSearch} type="text" className='FormInput' />
                                    <div className='couponSelectedCourse'>
                                        <div className='showSearch'>
                                            {
                                                searchCourseData &&
                                                searchCourseData.length > 0 &&
                                                searchCourseData.map((courseItem) => {
                                                    return (
                                                        <p key={courseItem?._id} onClick={() => handleCourseItemClick(courseItem)}>{courseItem?.sub_category?.name} - {courseItem?.title}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                        {
                                            selectedCourses &&
                                            selectedCourses.length > 0 &&
                                            selectedCourses.map((courseItem) => {
                                                return (
                                                    <p key={courseItem?._id}>{courseItem?.sub_category?.name} - {courseItem?.title}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            )
                        }
                        <div className='inputDivideDiv two'>
                            <div className='flexColInput'>
                                <label>Assign To</label>
                                <select className='FormInput'
                                    value={couponData.seller_type}
                                    onChange={(e) => setCouponData(prev => ({ ...prev, seller_type: e.target.value }))}
                                >
                                    <option value="all" >all</option>
                                    <option value="franchise">franchise</option>
                                </select>
                            </div>
                        </div>

                        {
                            couponData.seller_type === "franchise" && (
                                <div className='flexColInput'>
                                    <label>Select Franchise</label>
                                    <input type="text" value={franchiseSearch} onChange={handleFranchiseSearch} className='FormInput' />
                                    <div className='couponSelectedCourse'>
                                        <div className='showSearch'>
                                            {
                                                searchFranchiseData &&
                                                searchFranchiseData.length > 0 &&
                                                searchFranchiseData.map((franchiseItem) => {
                                                    return (
                                                        <p key={franchiseItem?._id} onClick={() => handleSelectFranchise(franchiseItem)}>{franchiseItem?.first_name} {franchiseItem?.last_name} - {franchiseItem?.email}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                        {selectedFranchise.email && (
                                            <p>{selectedFranchise.first_name} {selectedFranchise.last_name} - {selectedFranchise.email}</p>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                        <button className='createFormBtn'>
                            <AiOutlinePlus size={20} />
                            <span>Add Coupon</span>
                        </button>
                    </form>
                </div>
            </div>
        </AdminBase>
    )
}

export default AddCoupon