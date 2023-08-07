import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { BsCheck2Circle } from "react-icons/bs"

import "./payment.css";
import axios from 'axios';
import { API } from '../../constant';
import { MdOutlineCancel } from 'react-icons/md';
import { SlGraduation } from 'react-icons/sl';
import { IoBanOutline } from 'react-icons/io5';
import { toDateString } from '../../functions/dateformate';
import { AiOutlineHome } from 'react-icons/ai';


const PaymentStatus = () => {

    const { tracking_id } = useParams();
    const navigate = useNavigate();

    const [transactionData, setTransactionData] = useState({});

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        if (!tracking_id || tracking_id === "" || tracking_id === null) return;
        axios.get(`${API}/transaction/track/${tracking_id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then((res) => {
                const { status, transaction } = res.data;
                if (status === "success") {
                    setTransactionData(transaction)
                }
            }).catch((err) => {
                alert("transaction not found")
                navigate("/")
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500)
            })
    }, [tracking_id,navigate])

    return (
        <div className='transactionPage'>
            {isLoading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className='transactionStatusContainer'>
                    <div className={`txnStatusLogo ${transactionData?.txn_status}`}>
                        {transactionData?.txn_status === "success" && (
                            <BsCheck2Circle size={70} />
                        )}
                        {transactionData?.txn_status === "failure" && (
                            <MdOutlineCancel size={70} />
                        )}
                        {transactionData?.txn_status === "cancel" && (
                            <IoBanOutline size={70} />
                        )}
                        {transactionData?.txn_status === "aborted" && (
                            <IoBanOutline size={70} />
                        )}
                    </div>
                    {transactionData?.txn_status === "success" && (
                        <h2 className='txnStatusHeader'>Transaction Successfull !!</h2>
                    )}
                    {transactionData?.txn_status === "failure" && (
                        <h2 className='txnStatusHeader'>Transaction Failed !!</h2>
                    )}
                    {transactionData?.txn_status === "cancel" && (
                        <h2 className='txnStatusHeader'>Transaction Canceled !!</h2>
                    )}
                    {transactionData?.txn_status === "aborted" && (
                        <h2 className='txnStatusHeader'>Transaction Aborted !!</h2>
                    )}
                    <div className='txnDataGrid'>
                        <div className="twoColGrid">
                            <strong>Amount</strong>
                            <p>Rs. {transactionData?.txn_amount}</p>
                        </div>
                        <div className="twoColGrid">
                            <strong>Trackin Id</strong>
                            <p>{transactionData?.tracking_id}</p>
                        </div>
                        <div className="twoColGrid">
                            <strong>Payment Method</strong>
                            <p>{transactionData?.payment_mode === "null" ? "-" : transactionData?.payment_mode}</p>
                        </div>
                        <div className="twoColGrid">
                            <strong>Course</strong>
                            <p>{transactionData?.enrollment_id?.course?.title || "-"}</p>
                        </div>
                        <div className="twoColGrid">
                            <strong>Payee</strong>
                            <p>{transactionData?.student?.first_name} {transactionData?.student?.last_name}</p>
                        </div>
                        <div className="twoColGrid lastItem">
                            <strong>Date</strong>
                            <p>{toDateString(transactionData?.createdAt, true)}</p>
                        </div>
                    </div>
                    <div className='txnPaymentsLink'>
                        <Link to="/" className='gotoHome'>
                            <AiOutlineHome size={16} />
                            <span>Go to Home</span>
                        </Link>
                        <Link to="/student/enrolled-courses" className='gotoHome'>
                            <SlGraduation size={16} />
                            <span >Enrolled Courses</span>
                        </Link>
                    </div>
                </div>

            )}
        </div>
    )
}

export default PaymentStatus