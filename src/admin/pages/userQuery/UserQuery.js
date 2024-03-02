import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../utils/Breadcrumb'
import { AiOutlineEye } from 'react-icons/ai'
import "./UserQuery.css";
import Pagination from '../../../utils/Pagination';
import axios from 'axios'
import { API } from '../../../constant';
import { toDateString } from '../../../functions/dateformate';
import { Link } from 'react-router-dom';

function UserQuery() {
    const [pageNo, setPageno] = useState(1)
    const [data, setData] = useState([])
    const [paginationNo, setpaginationNo] = useState([])
    const [totalQueryNo, settotalQueryNo] = useState(0)


    useEffect(() => {
        axios.get(`${API}/userquery/page/${pageNo}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status, userquery, totalQuery, pagination } = res.data
                if (status === 'success') {
                    setData(userquery)
                    setpaginationNo(pagination)
                    settotalQueryNo(totalQuery)
                }
            })
    }, [pageNo])




    return (

        <div className='userQueryPage'>
            <div className="headingBar">
                <h2 className='PageHeading'>User Query</h2>
                <Breadcrumb breadcrumbData={[
                    {
                        link: "/admin/user-query",
                        text: "User Query"
                    }
                ]} />
            </div>
            <div className='tableContainer'>
                <div className='tableHeading'>
                    <h2 className='heading'>All User query</h2>
                </div>

                <div className="couponTable">
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No.</th>
                                <th>father name</th>
                                <th>School name</th>
                                <th>Query Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{(((pageNo - 1) * Number(10)) + index + 1)}</td>
                                        <td>
                                            <Link className='text-[var(--main)]' to={`/admin/user-query/about/${item?._id}`}>
                                                {item?.student_name}
                                            </Link>
                                        </td>
                                        {/* <td>{item?.student_name}</td> */}
                                        <td>{item.email}</td>
                                        <td>{item.primary_number}</td>
                                        <td>{item.father_name}</td>
                                        <td>{item.school_name}</td>
                                        <td>{toDateString(item.createdAt, true)}</td>
                                        <td className='tableActionBtns'>
                                            <Link title='Delete Coupon' className='view' to={`/admin/user-query/about/${item?._id}`}>
                                                {/* {item?.student_name}        */}
                                                <AiOutlineEye size={17} />
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>

                <Pagination
                    pageNo={pageNo}
                    pagination={paginationNo}
                    perPage={10}
                    totalPages={totalQueryNo}
                    goNext={() => pageNo < paginationNo.length ? setPageno(pageNo + 1) : null}
                    goPrev={() => pageNo > 1 ? setPageno(pageNo - 1) : null}
                    onPageChange={(page) => {
                        setPageno(page)
                    }}
                />
            </div>
        </div>
    )
}

export default UserQuery