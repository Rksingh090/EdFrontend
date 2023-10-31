import React, { useState } from 'react';
import './home.css';

import Base from '../../components/base/Base';
import { useSelector } from 'react-redux';
import { BsArrowRight, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import homeHeroSection from "../../assets/images/home-hero.webp"

import teacherExpertise from '../../assets/images/homeSection3.png'
import { AiFillCheckCircle } from 'react-icons/ai';

const Home = () => {

    const { categories } = useSelector(({ category }) => category);

    return (
        <Base bodyClass={"flexCenter homePageBg"}>
            <div className='MaxAreaContainer'>

                <section className="homeHero">
                    <div className="homeHero-content">
                        <p className='fadeText'>Interactive Courses</p>
                        <h1>EduTech, The ultimate learning platform.</h1>
                        <p>
                            Welcome to EduTech - Where Learning Meets Innovation. Explore dynamic courses designed to empower learners. Start your journey today!
                        </p>
                        <div className='homeCourseSearch'>
                            <div className='startSearchIcon'>
                                <BsSearch size={22} />
                            </div>
                            <input type="text" name='search' placeholder='Search Course' />
                            <button className='searchBtn'>
                                <BsArrowRight size={22} />
                            </button>
                        </div>
                    </div>
                    <div className='homeHeroImage'>
                        <img src={homeHeroSection} />
                    </div>
                </section>

                <section className="teacherSection">
                    <div className="teacherCol1">
                        <img src={teacherExpertise} alt="" />
                    </div>
                    <div className="teacherCol2">
                        <h2>Join Us as a Mentor and Share Your Expertise</h2>
                        <p>High-definition video offers superior quality and resolution compared to standard-definition. While the term 'high-definition' lacks a strict definition, it typically refers to video of enhanced quality.</p>
                        <ul className='teacherCol2Ul'>
                            <li>
                                <AiFillCheckCircle size={24} />
                                Discover Our Premier Courses
                            </li>
                            <li>
                                <AiFillCheckCircle size={24} />
                                Featuring Top-Rated Instructors
                            </li>
                        </ul>
                        <button className="homeReadMoreBtn">
                            Read More
                        </button>
                    </div>
                </section>

                <section className="homeSecCategory">
                    <h2 className='homeCategoryHeading'>Categories</h2>
                    <div className='CategoryBoxes'>
                        {
                            categories &&
                            categories?.map(({ category, courses }) => {
                                return (
                                    <div className="CategoryBox" key={category?._id} >
                                        <h3>{courses} Courses</h3>
                                        <div className='CategoryBoxBottom'>
                                            <h3 className='categoryTitle'>{category?.name}</h3>
                                            <Link to={`/courses?category=${category?.name}`} className="rightArrow">
                                                <BsArrowRight className='rightArrow' size={22} />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>

            </div>
        </Base >
    )
}

export default Home 