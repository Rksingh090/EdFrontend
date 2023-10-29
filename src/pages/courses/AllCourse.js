import React, { useEffect, useState } from 'react'
import Base from '../../components/base/Base'
import { AiFillCaretDown, AiOutlineStar } from 'react-icons/ai';
import '../styles/all_courses.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import { SlGrid } from 'react-icons/sl'
import { BsSearch } from 'react-icons/bs'
import { CiFilter } from 'react-icons/ci'
import { TfiViewList } from 'react-icons/tfi'
import { GrPowerReset } from 'react-icons/gr'

import { getAllCourse, setPageNo } from '../../reducers/CourseReducer';
import Pagination from '../../utils/Pagination';
import LazyLoad from 'react-lazyload'
import SelectOption from '../../components/utils/SelectOption';


import elephantImg from '../../assets/images/elephant.jpg'

const AllCourse = () => {
    const { allCourse, pagination, totalCourses, pageNo, perPage } = useSelector(state => state.course);
    const { categories, subcategories } = useSelector(state => state.category);

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();


    // show extra filters  
    const [showMoreFilter, setShowMoreFilter] = useState(false);

    // state for sub category

    const [filteredSubCategories, setFilteredSubCategories] = useState([])

    // layout and filter btn for mobile 
    const [courseLayout, setCourseLayout] = useState(2);
    const [showMobFilter, setShowMobFilter] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [selectedLanguage, setSelectedLanguage] = useState("");
    // const [inputText, setInputText] = useState("all");

    const onChangeCategory = (cId) => {
        setSelectedCategory(cId)
        const filterSC = subcategories.filter((subC) => subC?.parent_category === cId)
        setFilteredSubCategories(filterSC)
    }

    useEffect(() => {
        dispatch(getAllCourse({
            perPage,
            pageNo,
            category: selectedCategory,
            subcategory: selectedSubCategory,
            language: selectedLanguage
        }))
    }, [pageNo, selectedCategory, selectedSubCategory, selectedLanguage])

    const resetFilter = () => {
        setSelectedCategory("")
        setSelectedSubCategory("")
        setSelectedLanguage("")
        setFilteredSubCategories([])
    }

    useEffect(() => {
        const uCat = searchParams.get("category")
        if (uCat) {
            const getCat = categories.find((c) => c?.category?.name === uCat)
            if (getCat) {
                console.log(getCat);
                setSelectedCategory(getCat?.category?._id);
            }
        }
    }, [URLSearchParams])

    return (
        <Base bodyClass={"flexCenter allCoursePage"}>
            <div className='MaxAreaContainer allCoursesContainer'>

                <div className='mobileFilterToggler'>
                    <p className='showMobFilter' onClick={() => setShowMobFilter(mf => !mf)}>Filter</p>
                </div>

                {/* flex column */}
                <div className={`courseInnerDiv`}>

                    <div className={`allCourseHeadFilter ${showMobFilter && "showMobfilter"}`}>

                        <div className="filterRow1">

                            <div className='allCourseSearch'>
                                <div>
                                    <BsSearch size={22} />
                                </div>
                                <input
                                    type="text"
                                    placeholder='Search...'
                                />
                            </div>
                            <div className='gridViewBTN' onClick={() => setShowMoreFilter(prev => !prev)}>
                                <CiFilter size={28} />
                            </div>
                            <div className='gridViewBTN' onClick={() => setCourseLayout(currLayout => currLayout === 1 ? 2 : 1)}>
                                {courseLayout === 1 ?
                                    (
                                        <SlGrid size={20} />
                                    ) :
                                    (
                                        <TfiViewList size={20} />
                                    )}
                            </div>
                        </div>

                        {showMoreFilter && (
                            <div className="filterRow2">
                                <SelectOption
                                    label={"Category"}
                                    value={selectedCategory}
                                    onChange={onChangeCategory}
                                    options={categories}
                                    textField={"category.name"}
                                    valueField={"category._id"}
                                />
                                {
                                    selectedCategory &&
                                    <SelectOption
                                        label={"Subcategory"}
                                        value={selectedSubCategory}
                                        onChange={(cId) => setSelectedSubCategory(cId)}
                                        options={filteredSubCategories}
                                        textField={"name"}
                                        valueField={"_id"}
                                    />
                                }
                                <SelectOption
                                    label={"Language"}
                                    value={selectedLanguage}
                                    onChange={l => setSelectedLanguage(l)}
                                    options={["English", "Hindi", "Hinglish"]}
                                    textField={""}
                                    valueField={""}
                                />
                                {!selectedCategory && <div></div>}
                                <div></div>
                                {
                                    (selectedCategory || selectedSubCategory || selectedLanguage) &&
                                    <button className='resetBTN' onClick={resetFilter}>
                                        Reset
                                    </button>
                                }
                            </div>
                        )}
                    </div>

                    {/* course card  */}
                    {
                        allCourse && allCourse.length > 0 &&
                        <div className={`courseCardContainer ${courseLayout === 1 ? "listLayout" : "cardLayout"}`}>
                            {allCourse.map((singleCourse) => {
                                return (
                                    <SingleCourseCard key={singleCourse._id} courseData={singleCourse} layout={courseLayout} />
                                )
                            })}
                        </div>
                    }

                    {/* if no course found  */}
                    {allCourse.length === 0 &&
                        <div className='noCourseFound'>
                            <img src={elephantImg} alt="" />
                            <h2 className='noCourseText'>No course found !!!</h2>
                        </div>
                    }

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

    // list laylout 
    if (layout === 1) {
        return (
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
    }

    return (
        <div className='singleCourseCard'>
            <div className='courseCardHeader'>
                <LazyLoad className='fullSizeLazy imgCover'>
                    <img src={courseData?.thumbnail || "https://letslearn-storage.s3.ap-south-1.amazonaws.com/image/front-view-1686118474450.webp"} alt="course main " />
                </LazyLoad>
            </div>
            <div className='courseBody'>

                <div className='courseDetails'>
                    <h2 className='courseCardTitle'>{courseData?.title}</h2>
                    <p>{courseData.category.name}, {courseData.sub_category.name}</p>
                </div>

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
                    <div className="brandNameAndTag">
                        <p className='full_name capitalize'>
                            {courseData?.created_by?.first_name + "  " + courseData?.created_by?.last_name}
                        </p>
                        <p>Instructor</p>
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

export default AllCourse