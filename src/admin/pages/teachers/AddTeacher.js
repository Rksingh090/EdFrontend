import React from 'react';
import { addTeacherByAdmin } from '../../reducers/TeacherReducer';
import { useDispatch } from 'react-redux';
import AddUser from '../../utils/AddUser';


const AddTeacher = () => {
    const dispatch = useDispatch()
    return (
        <AddUser
            role={"teacher"}
            breadcrumKey={"teachers"}
            breadcrumbName={"Teachers"}
            onAddUser={(user) => dispatch(addTeacherByAdmin(user))}
        />
    )
}

export default AddTeacher