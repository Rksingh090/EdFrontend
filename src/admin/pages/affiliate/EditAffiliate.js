import React from 'react'
import AddUser from '../../utils/AddUser'
import { updateAffiliate } from '../../reducers/AffiliateReducer'
import { useDispatch } from 'react-redux'

const AddAffiliate = () => {
  const dispatch = useDispatch();

  const onUpdateAffiliate = (user) => {
    dispatch(updateAffiliate(user))
  }

  return (
    <AddUser type={"edit"} role={"affiliate"} breadcrumKey={"affiliate"} breadcrumbName={"Affiliates"} onUpdateUser={(user) => onUpdateAffiliate(user)} />
  )
}

export default AddAffiliate