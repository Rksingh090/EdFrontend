import React from 'react'
import AddUser from '../../utils/AddUser'
import { useDispatch } from 'react-redux'
import { updateTeacherByAdmin } from '../../reducers/TeacherReducer'

const EditTeacher = () => {
  const dispatch = useDispatch();
  return (
    // <AddTeacher type={"edit"} />
    <AddUser
      type={"edit"}
      role={"teacher"}
      breadcrumKey={"teachers"}
      breadcrumbName={"Teachers"}
      onUpdateUser={(user) => dispatch(updateTeacherByAdmin(user))}
    />
  )
}

export default EditTeacher