import React, { useEffect, useState } from 'react'
import Base from '../../components/base/Base'
import { AiOutlineStar } from 'react-icons/ai';
import '../styles/all_courses.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import { SlGrid } from 'react-icons/sl'
import { TfiViewList } from 'react-icons/tfi'
import { getAllCourse, setPageNo } from '../../reducers/CourseReducer';

import Pagination from '../../utils/Pagination';

import LazyLoad from 'react-lazyload'

const AllCourse = () => {
    const { allCourse, pagination, totalCourses, pageNo, perPage } = useSelector(state => state.course);
    const { categories, subcategories } = useSelector(state => state.category);

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    // layout and filter btn for mobile 
    const [courseLayout, setCourseLayout] = useState(2);
    const [showMobFilter, setShowMobFilter] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("all");
    const [inputText, setInputText] = useState("all");

    const resetFilter = () => {
        setSelectedCategories([])
        setSelectedSubCategories([])
    }

    const toggleCategorySelection = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(prev => prev.filter((selectedCategoryId) => categoryId !== selectedCategoryId))
        } else {
            setSelectedCategories(prev => [...prev, categoryId])
        }
    }

    const toggleSubCategorySelection = (subCategoryId) => {
        if (selectedSubCategories.includes(subCategoryId)) {
            setSelectedSubCategories(prev => prev.filter((selectedSubCategoryId) => subCategoryId !== selectedSubCategoryId))
        } else {
            setSelectedSubCategories(prev => [...prev, subCategoryId])
        }
    }

    useEffect(() => {
        if (selectedCategories.length > 0) {
            let categoryString = selectedCategories.join(",")
            if (selectedSubCategories.length > 0) {
                let subCategoryString = selectedSubCategories.join(",")
                dispatch(getAllCourse({ perPage, pageNo, category: categoryString, subcategory: subCategoryString }))
            } else {
                dispatch(getAllCourse({ perPage, pageNo, category: selectedCategories }))
            }
        } else {
            dispatch(getAllCourse({ perPage, pageNo }))
        }
    }, [dispatch, selectedSubCategories, selectedCategories, perPage, pageNo])


    useEffect(() => {
        if (!searchParams) return;
        let category = searchParams.get("category");
        if (category && category.length > 0) {
            let catNameArray = category.split(",").filter((item) => String(item) !== "").map((item) => String(item).trim().toLowerCase());
            let catArray = categories.filter((catWID) => catNameArray.includes(String(catWID?.category?.name).toLowerCase())).map((item) => item.category._id);

            setSelectedCategories(catArray)
        }

        let subcategory = searchParams.get("subcategory");

        if (subcategory && subcategory.length > 0) {
            let subcatNameArray = subcategory.split(",").filter((item) => String(item) !== "").map((item) => String(item).trim().toLowerCase());
            let catArray = subcategories.filter((catWID) => subcatNameArray.includes(String(catWID?.name).toLowerCase())).map((item) => item._id);

            setSelectedSubCategories(catArray)
        }
    }, [searchParams, categories, subcategories])

    return (
        <Base>
            <div className='allCoursesContainer'>

                <div className='mobileFilterToggler'>
                    <p className='showMobFilter' onClick={() => setShowMobFilter(mf => !mf)}>Filter</p>
                </div>
                {/* grid 3 column */}
                <div className={`${selectedCategories.length > 0 ? "showRSidebar" : "hideRSidebar"} courseInnerDiv self-center`}>

                    {/* column 1: left sidebar */}
                    <div className={`courseLeftSidebar ${showMobFilter && "showMobfilter"}`}>
                        <h1 className='categoryHeading'>Category</h1>
                        <div className='courseCat'>
                            {categories && categories?.length > 0 && categories.map((sCat) => {
                                return (
                                    <div className='singleCategory' key={sCat.category._id}>
                                        <input checked={selectedCategories.includes(sCat.category._id)} onChange={(e) => toggleCategorySelection(sCat.category._id)} type="checkbox" id={`cat-${sCat?.category._id}`} />
                                        <label htmlFor={`cat-${sCat?.category._id}`} className='font-[400] uppercase'>{sCat?.category?.name}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* column 2: filters & courseData Card  */}
                    <div className='courseMiddle'>
                        <div className={`allCourseHeadFilter ${showMobFilter && "showMobfilter"}`}>
                            <div className="filtersRow">
                                <div className='filterSelecter'>
                                    <h3>Select Language</h3>
                                    <select>
                                        <option value="all">All</option>
                                        <option value="hinglish">Hinglish</option>
                                        <option value="english">English</option>
                                        <option value="hindi">Hindi</option>
                                    </select>
                                </div>
                                <div className='filterSelecter'>
                                    <h3>Select Subject</h3>
                                    <select className='leftBorder'>
                                        <option value="all">All</option>
                                        <option value="match">Math</option>
                                        <option value="science">Science</option>
                                        <option value="sst">SST</option>
                                    </select>
                                </div>
                                <div className='filterSelecter'>
                                    <h3>Search Here</h3>
                                    <input type="text" placeholder='Search...' />
                                </div>
                                <div className='filterSelecter justify-end' onClick={() => setCourseLayout(currLayout => currLayout === 1 ? 2 : 1)}>
                                    <div className='gridViewBTN'>
                                        {courseLayout === 1 ?
                                            (
                                                <SlGrid size={20} />
                                            ) :
                                            (
                                                <TfiViewList size={20} />
                                            )}
                                    </div>
                                </div>
                                {
                                    (selectedCategories?.length > 0 || selectedSubCategories?.length > 0 || selectedLanguage !== "all" || inputText.length > 0)
                                    && (
                                        <div className='filterSelecter justify-end'>
                                            <button className='resetBTN' onClick={resetFilter}>Reset</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* course card  */}
                        <div className={`courseCardContainer ${courseLayout === 1 ? "listLayout" : `cardLayout ${selectedCategories && selectedCategories.length > 0 ? "categorySelected" : "notSelected"}`}`}>

                            {allCourse && allCourse.length > 0 && allCourse.map((singleCourse) => {
                                return (
                                    <SingleCourseCard key={singleCourse._id} courseData={singleCourse} layout={courseLayout} />
                                )
                            })}
                        </div>

                        <Pagination
                            perPage={perPage}
                            pageNo={pageNo}
                            pagination={pagination}
                            onPageChange={page => dispatch(setPageNo(page))}
                            goPrev={() => dispatch(setPageNo(pageNo > 1 ? pageNo - 1 : pageNo))}
                            goNext={() => dispatch(setPageNo(pageNo < pagination.length ? pageNo + 1 : pageNo))}
                            totalPages={totalCourses}
                            options={{
                                whiteBG: true
                            }}
                        />
                    </div>

                    {/* column 3 : right sidebar  */}
                    {selectedCategories && selectedCategories.length > 0 && (
                        <div className={`courseRightSidebar ${showMobFilter && "showMobfilter"}`}>
                            <h1 className='categoryHeading'>Sub Category</h1>
                            <div className='courseCat'>
                                {subcategories && subcategories?.length > 0 &&
                                    subcategories
                                        .filter((subCat) => selectedCategories.includes(subCat?.parent_category))
                                        .map((subCat) => {
                                            return (
                                                <div className='singleCategory' key={subCat._id}>
                                                    <input onChange={() => toggleSubCategorySelection(subCat?._id)} checked={selectedSubCategories.includes(subCat?._id)} type="checkbox" id={`subcat-${subCat?._id}`} />
                                                    <label htmlFor={`subcat-${subCat?._id}`} className='font-[400]'>{subCat?.name}</label>
                                                </div>
                                            )
                                        })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Base>
    )
}


const SingleCourseCard = ({ layout, courseData }) => {
    const { student: { pending_courses } } = useSelector((state) => state.course);

    const checkIfStudentIsEnrolled = (courseId) => {
        try {
            if (pending_courses && pending_courses.length === 0) return false;
            let isEnrolled = pending_courses.findIndex((courseEnr) => courseEnr?.course?._id === courseId);
            if (isEnrolled === -1) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <div className='singleCourseContainer'>
            {
                layout === 1 ?
                    (
                        <div className='listCourseCard'>
                            <div className='listCourseThumbnail'>
                                <LazyLoad className='fullSizeLazy imgCover'>
                                    <img src={courseData?.thumbnail || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/image/front-view-1686118474450.webp"} alt="" />
                                </LazyLoad>
                            </div>
                            <div className='listCourseDetails'>
                                <div className='courseMeta'>
                                    <h2 className='courseCardTitle'>{courseData?.title}</h2>
                                    <p>{courseData?.sub_category?.name}</p>
                                    <div></div>
                                    <div className='courseCardMeta'>
                                        <p className='brandLogo'>
                                            {
                                                courseData.created_by?.dp ? (
                                                    <img src={courseData.created_by?.dp} alt={courseData.created_by?.first_name} />
                                                ) :
                                                    (
                                                        <span>
                                                            {courseData?.created_by?.first_name && courseData?.created_by?.first_name.length > 0 && String(courseData?.created_by?.first_name).substring(0, 1)}
                                                            {courseData?.created_by?.last_name && courseData?.created_by?.last_name.length > 0 && String(courseData?.created_by?.last_name).substring(0, 1)}
                                                        </span>
                                                    )
                                            }
                                        </p>
                                        <p className='brandName'>
                                            <span className='text-[#777] mr-1'> By</span>
                                            <span className='capitalize text-[18px] font-[600]'>{courseData?.created_by?.first_name} {courseData?.created_by?.last_name}</span>
                                        </p>
                                    </div>
                                    <div className='courseRating'>
                                        <AiOutlineStar size={22} />
                                        <AiOutlineStar size={22} />
                                        <AiOutlineStar size={22} />
                                        <AiOutlineStar size={22} />
                                        <AiOutlineStar size={22} />
                                    </div>
                                </div>
                                <div className='listcourseFooter'>
                                    <p className='price'>{Number(courseData?.discount_price) === 0 ? "Free" : `₹ ${courseData?.discount_price}`}</p>
                                    <Link to={`/course/${courseData.slug}`} className='cartBtn'>Add To Cart</Link>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div className='singleCourseCard'>
                            <div className='courseCardHeader'>
                                <LazyLoad className='fullSizeLazy imgCover'>
                                    <img src={courseData?.thumbnail || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/image/front-view-1686118474450.webp"} alt="course main " />
                                </LazyLoad>
                            </div>
                            <div className='courseBody'>
                                <div className='courseRating'>
                                    <AiOutlineStar size={22} />
                                    <AiOutlineStar size={22} />
                                    <AiOutlineStar size={22} />
                                    <AiOutlineStar size={22} />
                                    <AiOutlineStar size={22} />
                                </div>
                                <h2 className='courseCardTitle'>{courseData?.title}</h2>
                                <p>{courseData?.sub_category?.name}</p>
                                <div></div>
                                <div></div>
                                <div className='courseCardMeta'>
                                    <p className='brandLogo'>
                                        {
                                            courseData.created_by?.dp ? (
                                                <img src={courseData.created_by?.dp} alt={courseData.created_by.first_name} />
                                            ) :
                                                (
                                                    <span>
                                                        {courseData?.created_by?.first_name && courseData?.created_by?.first_name.length > 0 && String(courseData?.created_by?.first_name).substring(0, 1)}
                                                        {courseData?.created_by?.last_name && courseData?.created_by?.last_name.length > 0 && String(courseData?.created_by?.last_name).substring(0, 1)}
                                                    </span>
                                                )
                                        }
                                    </p>
                                    <div className='brandName'>
                                        <p className='text-[#777] mr-1'> By</p>
                                        <p className='text-[18px] font-[600] capitalize'>
                                            {courseData?.created_by?.first_name + "  " + courseData?.created_by?.last_name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='courseFooter'>
                                <p className='price'>{Number(courseData?.discount_price) === 0 ? "Free" : `₹ ${courseData?.discount_price}`}</p>
                                {!checkIfStudentIsEnrolled(courseData?._id) ?
                                    <Link to={`/course/${courseData?._id}/${courseData.slug}`} className='cartBtn'>Show Details</Link>
                                    :
                                    <Link to={`/course/${courseData?._id}/${courseData.slug}`} className='cartBtn enrolled'>Already Enrolled</Link>
                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default AllCourse