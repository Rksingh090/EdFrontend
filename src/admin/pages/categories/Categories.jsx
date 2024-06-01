import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../../reducers/AdminReducer';

const Categories = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);

  useEffect(() => {
    const getAllCategoryData = async () => {
      const cAction = await dispatch(getAllCategories());
      const {categories} = cAction.payload;

      setCategoryData((p) => {
          return categories.filter((c) => c.category_type === "category")
      })
      setSubCategoryData((p) => {
          return categories.filter((c) => c.category_type === "sub-category")
      })
    }
    getAllCategoryData();
  }, [])


  return (
    <div>

    </div>
  )
}

export default Categories