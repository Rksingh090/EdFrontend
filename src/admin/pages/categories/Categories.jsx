import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllCategories, createCategory } from '../../reducers/AdminReducer';
import "./../../adminBase/adminbase.css";
import "../course/addcourse.css";

const Categories = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);

  // Form states
  const [catName, setCatName] = useState("");
  const [catPosition, setCatPosition] = useState(0);

  const [subCatName, setSubCatName] = useState("");
  const [subCatPosition, setSubCatPosition] = useState(0);
  const [subCatParent, setSubCatParent] = useState("");

  const fetchCategories = async () => {
    const cAction = await dispatch(getAllCategories());
    const { categories } = cAction.payload || {};
    if (categories) {
        setCategoryData(categories.filter((c) => c.category_type === "category"));
        setSubCategoryData(categories.filter((c) => c.category_type === "sub-category"));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [])

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if(!catName) return alert("Name is required");
    await dispatch(createCategory({
        name: catName,
        position: catPosition,
        category_type: "category"
    }));
    setCatName("");
    setCatPosition(0);
    fetchCategories();
  }

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    if(!subCatName || !subCatParent) return alert("Name and Parent Category are required");
    await dispatch(createCategory({
        name: subCatName,
        position: subCatPosition,
        category_type: "sub-category",
        parent_category: subCatParent
    }));
    setSubCatName("");
    setSubCatPosition(0);
    setSubCatParent("");
    fetchCategories();
  }

  return (
    <div className='editCoursePage'>
      <div className='editCoursePageGrid'>
        {/* Column 1: Add Forms */}
        <div className="editCourseCol1">
          {/* Add Category */}
          <div className='tableContainer'>
            <div className='tableHeading'>
              <h2 className='heading'>Add Category</h2>
            </div>
            <form onSubmit={handleAddCategory} className='editCourseContainer'>
              <div className="flexColInput">
                <label>Category Name</label>
                <input type="text" value={catName} onChange={e => setCatName(e.target.value)} className="FormInput" required />
              </div>
              <div className="flexColInput">
                <label>Position</label>
                <input type="number" value={catPosition} onChange={e => setCatPosition(Number(e.target.value))} className="FormInput noNumberStyle" />
              </div>
              <button type="submit" className="llBtn w-max mt-2">Add Category</button>
            </form>
          </div>

          {/* Add Sub Category */}
          <div className='tableContainer'>
            <div className='tableHeading'>
              <h2 className='heading'>Add Sub Category</h2>
            </div>
            <form onSubmit={handleAddSubCategory} className='editCourseContainer'>
              <div className="flexColInput">
                <label>Sub Category Name</label>
                <input type="text" value={subCatName} onChange={e => setSubCatName(e.target.value)} className="FormInput" required />
              </div>
              <div className="flexColInput">
                <label>Position</label>
                <input type="number" value={subCatPosition} onChange={e => setSubCatPosition(Number(e.target.value))} className="FormInput noNumberStyle" />
              </div>
              <div className="flexColInput">
                <label>Parent Category</label>
                <select value={subCatParent} onChange={e => setSubCatParent(e.target.value)} className="FormInput" required>
                  <option value="">Select Parent Category</option>
                  {categoryData.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="llBtn w-max mt-2">Add Sub Category</button>
            </form>
          </div>
        </div>

        {/* Column 2: List */}
        <div className="editCourseCol2">
           <div className='tableContainer'>
            <div className='tableHeading'>
              <h2 className='heading'>All Categories</h2>
            </div>
            <div className='editCourseContainer'>
              {categoryData.length === 0 && <p>No categories found.</p>}
              <ul className='flex flex-col gap-3'>
                  {categoryData.map(cat => (
                      <li key={cat._id} className="p-3 border rounded shadow-sm bg-white">
                          <p className="font-semibold">{cat.name} <span className="text-sm text-gray-500">(Position: {cat.position})</span></p>
                          {/* Render subcategories for this category */}
                          {subCategoryData.filter(sub => sub.parent_category === cat._id).length > 0 && (
                              <ul className="ml-5 mt-2 flex flex-col gap-2">
                                  {subCategoryData.filter(sub => sub.parent_category === cat._id).map(sub => (
                                      <li key={sub._id} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                                          - {sub.name} <span className="text-xs text-gray-400">(Position: {sub.position})</span>
                                      </li>
                                  ))}
                              </ul>
                          )}
                      </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories