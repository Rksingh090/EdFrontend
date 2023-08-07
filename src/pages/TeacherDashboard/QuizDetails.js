import React from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar';
import { BsArrowLeftShort } from 'react-icons/bs';
import { SiBluetooth } from 'react-icons/si';
import { AiFillExclamationCircle } from 'react-icons/ai';
import "../styles/quizdetails.css";

const QuizDetails = () => {

    return (
        <TeacherSidebar>
            <div>
                <div className='Quizarrayleft'>
                    <BsArrowLeftShort />
                    <p>Back</p>
                </div>
                <div className='pragraph text-[#494949]'>
                    <p>Course: <span>ENGLISH COMMUNICATION AND CONVERSATION</span> </p>
                    <p className='font-[600] text-[#000]'>Pick the adjective as directed:</p>
                    <p>Quiz Time: 0 Minutes
                        Attempt Time: 1 minute, 3 seconds
                    </p>
                </div>
                <div>

                    <table class="styled-table mt-4">
                        <thead>
                            <tr className='quizAttemptTheadRow'>
                                <th><p>Quiz Info</p></th>
                                <th><p>Question</p></th>
                                <th><p>Total Marks	</p></th>
                                <th><p>Correct Answer	</p></th>
                                <th><p>Incorrect Answer	</p></th>
                                <th><p>Earned Marks	</p></th>
                                <th><p>Result</p></th>
                                <th><p>Details</p></th>

                            </tr>
                            <div>

                            </div>
                            <tr>
                                <td><p>April 22,</p><p> 2023 13:57 pm</p></td>
                                <td>7</td>
                                <td>7.00</td>
                                <td>5.60 (80%)</td>
                                <td>0</td>
                                <td>6</td>
                                <td>0.00 (0%)</td>
                                <td className=''>
                                    <span className='data'>fail</span>
                                </td>

                            </tr>





                        </thead>


                    </table>
                    <div className='tabless1'>
                        <div className='py-5'>
                            <h1>Quiz Overview</h1>
                        </div>
                        <table class="styled-table">
                            <thead>
                                <tr className='quizAttemptTheadRow'>
                                    <th><p>No</p></th>
                                    <th><p>Type</p></th>
                                    <th><p>Questions	</p></th>
                                    <th><p>Given Answer	</p></th>
                                    <th><p>	Correct Answer	</p></th>
                                    <th><p>	Answer	</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>

                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>

                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>

                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>

                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>

                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>

                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>

                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <td><p></p><p> 2</p></td>
                                    </td>
                                    <td>
                                        <p className='flex items-center gap-3'>
                                            <p className='text-[40px] text-[#ffbf00]'><SiBluetooth /></p>
                                            <p className='text-[#757272]'> <AiFillExclamationCircle /></p>
                                        </p>

                                    </td>
                                    <td>
                                        <p>Rita has { } hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has          hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p>Rita has curly hair.( adj of quality)</p>
                                    </td>
                                    <td>
                                        <p className='incorrect1'>Incorrect</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>








        </TeacherSidebar>

    )
}

export default QuizDetails