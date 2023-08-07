import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TeacherSidebar from '../../components/base/TeacherSidebar'
import { getTeacherAssignment } from '../../reducers/AssignmentReducer';

const Assignment = () => {

  const dispatch = useDispatch();
  const { teacher: { assignments } } = useSelector(state => state.assignment)


  useEffect(() => {
    dispatch(getTeacherAssignment())
  }, [dispatch])

  return (
    <TeacherSidebar>
      <div>
        <h1 className='font-[600] text-[25px]'>Assignment</h1>
      </div>

      <div className='flex justify-between border-[px] pt-8 my-8'>
        <div>
          <p className='py-3'>Courses</p>
          <select>
            <option value="volvo">All</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>

        </div>
        <div>
          <p className='py-3'>Sort By</p>
          <select>
            <option value="volvo" className='text-left'>DESC</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className=''>
          <p className='py-3'>Date</p>
          <label htmlFor="start"></label>
          <input type="date" ></input>
        </div>
      </div>

      <div>

        <table className="styled-table">
          <thead>
            <tr>
              <th><p className='py-1 text-xl font-[500]'>Assignment Name</p></th>
              <th><p className='py-1 text-xl font-[500]'>Total Marks</p></th>
              <th><p className='py-1 text-xl font-[500]'>Total Submit</p>	</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 && assignments.map((assignment) => {
              return (
                <tr key={assignment._id}>
                  <td>
                    <p className='text-lg'>{assignment.title}</p>
                    <p className='text-[#808080]'>Course: {assignment.course?.title}</p>
                  </td>
                  <td>2</td>
                  <td>2</td>
                  <td className='detailsTD'><p className='showDetails'>Details</p></td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </TeacherSidebar>
  )
}

export default Assignment