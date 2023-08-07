import React from 'react'
import AddUser from '../../utils/AddUser'
import { addAffiliateByAdmin } from '../../reducers/AffiliateReducer'
import { useDispatch } from 'react-redux'

const AddAffiliate = () => {

  const dispatch = useDispatch();
  const onAddAffiliate = (affiliate) => {
    dispatch(addAffiliateByAdmin(affiliate))
  }

  return (
    <AddUser
      role={"affiliate"}
      breadcrumKey={"affiliate"}
      breadcrumbName={"Affiliates"}
      onAddUser={(user) => onAddAffiliate(user)}
    />
  )
}

export default AddAffiliate