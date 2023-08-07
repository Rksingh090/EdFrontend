import React from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar';

const OrderHistory = () => {
    return (
        <TeacherSidebar>
            <div className='OrderHistoryPage'>
                <h2 className='OHHeading'>Order history</h2>
                <div className='OHTableContainer'>
                    <table className="dashboardTable">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Transaction Id</th>
                                <th>Order Id</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>3546456547457</td>
                                <td>Ofdkjsg879sgsg897eav4t</td>
                                <td>1st July 2023</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </TeacherSidebar>
    )
}

export default OrderHistory