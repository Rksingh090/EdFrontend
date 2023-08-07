import React, { useState } from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar';
import {AiTwotoneAccountBook, AiOutlineArrowDown} from 'react-icons/ai'



const Analytics = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  return (
    <TeacherSidebar>
      <div>
        <h1 className='font-[600] text-[23px]'>Analytics</h1>
      </div>

          <div className='tabMenu'>
            <p className={currentTab === "overview" ? "active": ""} onClick={() => setCurrentTab("overview")}>Overview</p>
            <p className={currentTab === "courses" ? "active": ""} onClick={() => setCurrentTab("courses")}>Courses</p>
            <p className={currentTab === "earning" ? "active": ""} onClick={() => setCurrentTab("earning")}>Earnings</p>
            <p className={currentTab === "statements" ? "active": ""} onClick={() => setCurrentTab("statements")}>Statements</p>
            <p className={currentTab === "students" ? "active": ""} onClick={() => setCurrentTab("students")}>Students</p>
            <p className={currentTab === "export" ? "active": ""} onClick={() => setCurrentTab("export")}>Export</p>
          </div>

      <div className='border-none'>
        {currentTab === "overview" && (
          <div>
            <div className='mt-8 grid grid-cols-3 gap-8'>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Total Course</p>
                </div>

              </div>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Total Student</p>
                </div>

              </div>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Reviews5</p>
                </div>

              </div>
            </div>
            <div className='mt-8'>
              <h1 className='font-[600] text-[23px]'>Earnings Graph</h1>
            </div>
            <div className='flex justify-between pt-8'>
              <div className='flex gap-6'>
                <button className='border-[1px] border-blue-500 px-4 p-2 rounded-lg text-blue-700 hover:bg-blue-500 hover:text-whitez '>
                  Today</button>
                <button className='border-[1px] border-blue-500 px-4 p-2 rounded-lg text-blue-700 hover:bg-blue-500 hover:text-whitez '>
                  Monthly</button>
                <button className='border-[1px] border-blue-500 px-4 p-2 rounded-lg text-blue-700 hover:bg-blue-500 hover:text-whitez '>
                  Yearly</button>

              </div>

              <input type="date" name="" id="" className='border-[1px] px-[100px] border-gray-500' />
            </div>
            <div className='mt-8'>
              <h1 className='font-[600] text-[23px]'>Earnings chart</h1>
              <textarea id="w3review" name="w3review" rows="4" cols="50" className='outline-none border-[1px] border-gray-400 mt-8 w-[100%]' placeholder='Earnings chart'>
              </textarea>
            </div>


          </div>
        )}

        {currentTab === "courses" && (
          <div>
            <div className='w-400 m-auto'>
              <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/nodata.png"} alt="" />
            </div>
          </div>
        )}
        {currentTab === "earning" && (
          <div>
            <div className='mt-8 grid grid-cols-3 gap-8'>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Total Course</p>
                </div>

              </div>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Total Student</p>
                </div>

              </div>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Reviews5</p>
                </div>

              </div>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Reviews5</p>
                </div>

              </div>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Reviews5</p>
                </div>

              </div>
              <div className='border-[1px] w-[290px] h-[250px] border-gray-400 flex flex-col justify-center items-center gap-[1rem]'>
                <div className='bg-gray-200 w-[50px] h-[50px] rounded-full text-center flex items-center justify-center'>
                  <AiTwotoneAccountBook className='text-[30px] text-blue-500' />

                </div>
                <div>
                  <p className='font-[600] text-[40px]'>-</p>
                </div>
                <div>
                  <p>Reviews5</p>
                </div>

              </div>
            </div>
            <div className='mt-8'>
              <h1 className='font-[600] text-[23px]'>Earnings Graph</h1>
            </div>
            <div className='flex justify-between pt-8'>
              <div className='flex gap-6'>
                <button className='border-[1px] border-blue-500 px-4 p-2 rounded-lg text-blue-700 hover:bg-blue-500 hover:text-whitez '>
                  Today</button>
                <button className='border-[1px] border-blue-500 px-4 p-2 rounded-lg text-blue-700 hover:bg-blue-500 hover:text-whitez '>
                  Monthly</button>
                <button className='border-[1px] border-blue-500 px-4 p-2 rounded-lg text-blue-700 hover:bg-blue-500 hover:text-whitez '>
                  Yearly</button>

              </div>

              <input type="date" name="" id="" className='border-[1px] px-[100px] border-gray-500' />
            </div>
            <div className='mt-8'>
              <h1 className='font-[600] text-[23px]'>Earnings chart</h1>
              <textarea id="w3review" name="w3review" rows="4" cols="50" className='outline-none border-[1px] border-gray-400 mt-8 w-[100%]' placeholder='Earnings chart'>
              </textarea>
            </div>


          </div>
        )}
        {currentTab === "statements" && (
          <div>
            <div>
              <div className='flex justify-between items-center '>
                <div>
                  <p className='py-3'>Courses</p>
                  <select name="cars" id="cars" className='px-[300px] outline-none border-[1px] p-2 flex items-start rounded-md'>
                    <option value="volvo">All</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div>
                  <p>Date</p>
                  <input type="date" className='outline-none border-[1px] px-[80px] p-2 rounded-md' />
                </div>
              </div>
            </div>
            <div className='w-400 m-auto'>
              <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/nodata.png"} alt="no data" />
            </div>


          </div>
        )}

        {currentTab === "students" && (
          <div>
            <div className='flex justify-between items-center '>
              <div>
                <p className='py-3'>Courses</p>
                <select name="cars" id="cars" className='px-[300px] outline-none border-[1px] p-2 flex items-start rounded-md'>
                  <option value="volvo">All</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div>
                <p>Date</p>
                <label for="start"></label>
                <input type="date" id="start" name="trip-start" className='outline-none border-[1px] px-[80px] p-2 rounded-md'
                  value="2018-07-22"
                  min="2022-01-01" max="2023-12-31"></input>
              </div>
            </div>
            <div className='w-400 m-auto'>
              <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/nodata.png"} alt="" />
            </div>
          </div>
        )}
        
        {currentTab === "export" && (
          <div>
            <div className='grid grid-cols-2 mt-[5rem] leading-10'>
              <div className=''>
                <p className='font-[600] text-[30px]'>Detailed Report of Your Sales & Students</p>
                <p className='text-[#808080] pt-4'>Export to keep a copy of your analytics data.</p>
                <button className='mt-4 border-[1px] border-gray-300 p-1 flex items-center gap-4 bg-gray-200 border-none rounded-lg text-[#808080]'>
                  <AiOutlineArrowDown/>
                  <p>Dowload <span>CSV</span></p>
                  
                </button>

              </div>
              <div>
                <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/analytics.jpg"} alt=""  className='w-[100%]'/>

              </div>
            </div>


          </div>
        )}

      
      </div>

    </TeacherSidebar>
  )
}

export default Analytics