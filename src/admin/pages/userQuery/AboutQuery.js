import React, { useEffect, useState } from 'react'
import AdminBase from '../../adminBase/AdminBase'
import Breadcrumb from '../../../utils/Breadcrumb'
import './UserQuery.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { API } from '../../../constant'

function AboutQuery() {

    const { query_id } = useParams()

    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (!query_id || query_id === null || query_id === "") {
            return
        }
        axios.get(`${API}/userquery/id/${query_id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status, userquery } = res.data
                if (status === 'success') {
                    setUserData(userquery)
                }
            })
    }, [query_id])

    useEffect(() => {
        if (!userData?.coupon_code) return;

    }, [userData])


    return (
        <AdminBase>

            <div className="aboutQueryPage">
                <div className="headingBar">
                    <h2 className='PageHeading'> About User Query</h2>
                    <Breadcrumb breadcrumbData={[
                        {
                            link: "/admin/user-query/",
                            text: "User Query"
                        },
                        {
                            link: "/admin/user-query/about/xyz",
                            text: "About "
                        }
                    ]} />
                </div>

                <div className="aboutQueryGrid">


                    <div className="tableContainer">
                        <div className="tableHeading">
                            <h2 className="heading">User Query Details</h2>
                        </div>
                        <div className="queryCardBody" >


                            <div className="descLine noBorder">
                                <b>Name</b>
                                <p className="descLink capitalize">{userData.student_name}</p>
                            </div>
                            <div className="descLine">
                                <b>Father's Name</b>
                                <p className="descLink ">{userData.father_name}</p>
                            </div>
                            <div className="descLine">
                                <b>Class</b>
                                <p className="descLink ">{userData.class}</p>
                            </div>
                            <div className="descLine">
                                <b>School Name</b>
                                <p className="descLink ">{userData.school_name}</p>
                            </div>
                            <div className="descLine">
                                <b>Coupon Code</b>
                                <p className="descLink ">{userData.coupon_code}</p>
                            </div>

                        </div>

                    </div>

                    <div className="tableContainer">
                        <div className="tableHeading">
                            <h2 className="heading">Contact Details</h2>
                        </div>
                        <div className="queryCardBody">
                            <div className="descLine noBorder">
                                <b>Email</b>
                                <p className="descLink capitalize">{userData.email}</p>
                            </div>
                            <div className="descLine">
                                <b>Phone no</b>
                                <p className="descLink ">{userData.primary_number}</p>
                            </div>
                            <div className="descLine">
                                <b>Area</b>
                                <p className="descLink ">{userData.area}</p>
                            </div>
                            <div className="descLine">
                                <b>State</b>
                                <p className="descLink ">{userData.state}</p>
                            </div>
                        </div>
                    </div>


                    <div className="tableContainer">
                        <div className="tableHeading">
                            <h2 className="heading">Massage</h2>
                        </div>
                        <div className="queryCardBody">
                            <p className="descLink ">{userData.message}</p>
                        </div>
                    </div>

                    <div className="tableContainer">
                        <div className="tableHeading">
                            <h2 className="heading">Subjects</h2>
                        </div>
                        <div className="queryCardBody">
                            {
                                userData?.subjects &&
                                userData?.subjects.length > 0 &&
                                userData?.subjects.map((subItem, idx) => (
                                    <div className={`descLine ${idx === 0 ? "noBorder" : ""}`} key={idx}>
                                        <b>Subject {idx+1}</b>
                                        <p className="descLink ">{subItem}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AdminBase>
    )
}

export default AboutQuery