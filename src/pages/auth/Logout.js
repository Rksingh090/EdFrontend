import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserLogOut } from '../../reducers/UserReducer'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const {loggedIn} = useSelector(state => state.user)
    useEffect(() => {
        dispatch(UserLogOut())
    }, [dispatch])

    useEffect(() => {
        if(!loggedIn) {
            navigate("/")
        }
    }, [loggedIn, navigate])

  return (
    <div>Logout</div>
  )
}

export default Logout