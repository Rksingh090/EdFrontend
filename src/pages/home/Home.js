import React, { useMemo, useState } from 'react';
import './home.css';

import { BsFillPersonLinesFill } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import Base from '../../components/base/Base';

import { Splide, SplideSlide } from '@splidejs/react-splide';

// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';

import { ImQuotesLeft } from 'react-icons/im'
import { Link } from 'react-router-dom';

import LazyLoad from 'react-lazyload'


const Home = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [noOfCatShow, setNoOfCatShow] = useState(8);

    const ourcourse = useMemo(() => [
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/academics.png",
            text: "ACADEMIC",
            category: "ACADEMIC"
        },
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/govt-job.png",
            text: "GOVT. JOB",
            category: "GOVT. JOB EXAMS"
        },
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/upse.png",
            text: "UPSE",
            category: "UPSE"
        },

        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/iit-jee.png",
            text: "IIT JEE",
            category: "IIT JEE"
        },
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/neet.png",
            text: "NEET",
            category: "NEET"
        },
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/neet.png",
            text: "CAT",
            category: "CAT"
        },
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/neet.png",
            text: "GATE",
            category: "GATE"
        },
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/language.png",
            text: "LANGUAGE",
            category: "LANGUAGE"
        },
        {
            img: "https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/cuet.png",
            text: "CUET",
            category: "CUET"
        },
    ], [])


    return (
        <Base clearScrollSticky={true}>
            <div className='bg-gray-100'>

                <section className='mainSection' >
                    <img src={"https://i30learning.com/images/hero-7.jpg"} className="homeBGImg" alt='' />
                    <div className='mainSectionTexts myContentArea'>
                        <h5 className='homeHeadlineh5'>Welcome to Edtech Name</h5>
                        <h1 className='homeHeadlineh1'>The Best Online Education Platform</h1>
                        <p className='homeHeadlineP'>Learn from the Best, Be the Best</p>

                        <div className='flex gap-4 mt-5'>
                            <button className='getStartedBTN'>GET STARTED</button>
                            <Link to={"/courses/all"} className='viewCourseBTN'>VIEW COURSE</Link>
                        </div>
                        <div className='onlinecuourse'>
                            <div className='onlincouyseactive'>
                                <h1 className='lecturesnum'>260+</h1>
                                <p className='lecturesnum1'>Online Course</p>
                            </div>
                            <div className='onlincouyseactive'>
                                <h1 className='lecturesnum'>10K+</h1>
                                <p className='lecturesnum1'>Active Users</p>
                            </div>
                        </div>
                    </div>
                </section>



                {/* benefits about learning online home -2*/}
                <section className='homeSection2 allCenter'>
                    <div className='myContentArea'>

                        <div className='section2img'>
                            <h1 className='premius'>Premium Learning Experience Alignment </h1>
                            <p className='learningexp'>Unlock a premium learning experience tailored for you. Dive into a comprehensive curriculum, engaging resources, and interactive activities. Benefit from expert guidance, personalized feedback, and advanced learning tools.Explore challenging concepts, develop critical thinking skills, and excel in your educational journey. Elevate your learning with a premium experience designed to inspire and empower you.</p>
                            <div className='quailtyimges'>
                                <div className='qualityonline'>
                                    <div>
                                        <h1 className='onlinecoursealloff'>Quality online courses for all!</h1>
                                        <button className='getstartedfbottom'>Get Started</button>
                                    </div>
                                    <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/homeGirl.d9eeaffee7b085135ccc+(1).png"} height={903} width={1041} alt="" className='imgapermius' />
                                </div>
                            </div>
                        </div>

                        <div className='section2div2 paddFullArea'>
                            <h2 className='mb-4'>LEARN ANYTIME, ANYWHERE</h2>
                            <div className='sction2div2Items'>
                                <div className='section2hover'>
                                    <BsFillPersonLinesFill size={50} />
                                    <div >
                                        <h1 className='text-[20px] font-[500]'> <i>Online Courses</i> </h1>
                                        <p className='text-[#808080]'>It is now easy to learn together even if we are apart, experience extremely informative and easy to understand online video lectures with Edtech Name.</p>
                                    </div>
                                </div>
                                <div className='section2hover'>
                                    <BsFillPersonLinesFill size={50} />
                                    <div>
                                        <h1 className='text-[20px] font-[500]'> <i>Earn A Certificate</i></h1>
                                        <p className='text-[#808080]'>A bit of a motivation can help you push more, track your achievements by collecting certificates for every test you pass or every level you cross from Edtech Name</p>
                                    </div>
                                </div>
                                <div className='section2hover'>
                                    <BsFillPersonLinesFill size={50} />
                                    <div >
                                        <h1 className='text-[20px] font-[500]'> <i>Learn With Experts</i> </h1>
                                        <p className='text-[#808080]'>Learning can also be fun if you have a good teacher, get highly qualified and experienced teachers through Edtech Name who will be a great guide and mentor for you to achieve your aim.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* section -0333333 */}

                <section className='homeSection3'>
                    <div className='homeSection3div myContentArea'>
                        <div className='flex items-center gap-8'>
                            {/* <AiOutlineAlipay /> */}
                            <div>
                                <p className='numCounter' style={{ "--ncount": "20000" }}></p>
                                <p>Learners</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-8'>
                            {/* <AiTwotoneSchedule /> */}
                            <div>
                                <p className='numCounter' style={{ "--ncount": "260" }}></p>
                                <p>Courses Published</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-8'>
                            {/* <RiHomeSmileLine /> */}
                            <div>
                                <p className='numCounter' style={{ "--ncount": "200" }}></p>
                                <p>instructors</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-8'>
                            {/* <MdGolfCourse /> */}
                            <div>
                                <p className='numCounter' style={{ "--ncount": "2000" }}></p>
                                <p>Certifications</p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* section OUR COURSE EXPLORE */}
                <section className='homeSection4'>
                    <div className='homeSection4Heading'>
                        <h3>Our Courses</h3>
                        <p>Explore Our Popular Online Courses</p>
                    </div>
                    <div className='ouronlinecourses myContentArea'>
                        {
                            ourcourse && ourcourse.length > 0
                            && ourcourse
                                .slice(0, noOfCatShow)
                                .map((coursedata, idx) => {
                                    let link = "/courses/all";
                                    if (coursedata?.category) {
                                        link += "?category=" + coursedata.category;
                                    }
                                    let delay = idx * .8;
                                    if (noOfCatShow > 8) {
                                        delay = 0;
                                    }
                                    return (
                                        <Link to={link} key={idx} className='ourcoursetext' style={{ "--delay": delay + "s" }}>
                                            <div className='homeCourseCatImg'>
                                                <LazyLoad className='fullSizeLazy imgCover'>
                                                    <img src={coursedata?.img} alt="" />
                                                </LazyLoad>
                                            </div>
                                            <p>{coursedata?.text}</p>
                                        </Link>
                                    )
                                })
                        }
                    </div>
                    <div className='homesectionbutton'>
                        <button onClick={() => setNoOfCatShow(prev => prev + 4)}>Browse All</button>
                    </div>
                </section>


                {/* section Browser our online course */}
                {/* <section className='homeSection5'>
                    <div className='homeSection4Heading'>
                        <h3>Courses</h3>
                        <p>Browser Our Online Courses</p>
                    </div>
                    <div className='fullWidthCenter paddFullArea'>
                        <div className='myContentArea popularCourseCat'>
                            {categories.length > 0 &&
                                categories.slice(0, 6)
                                    .map((catwithcourse) => {
                                        const category = catwithcourse.category;
                                        return (
                                            <div key={category._id} className='courseCategoryItem'>
                                                <div>
                                                    <img src={homeSkeleton} alt="" className='w-[60px]' />
                                                </div>
                                                <h1 className='text-[17px] font-[600]'>{category.name}</h1>
                                                <p className='text-[var(--main)] font-[700]'>{catwithcourse.courses} Courses</p>
                                            </div>
                                        )
                                    })}
                        </div>
                        <div className='homesectionbutton'>
                            <button>Browse All</button>
                        </div>
                    </div>
                </section> */}


                {/* testimonial section */}
                <section className='testimonialSection faculty'>
                    <div className='homeSection4Heading py-3'>
                        <h3>OUR FACULTIES</h3>
                        <p>Hear from our teachers</p>
                    </div>
                    <div className='testimonialData paddFullArea gap-x-10'>
                        <Splide options={{
                            type: "loop",
                            rewind: true,
                            gap: '1rem',
                            arrows: false,
                            perPage: 1,
                            // interval: 2000,
                            // autoplay: true,
                            pagination: false,
                            rewindByDrag: true
                        }}
                            className='mainSlider'
                            aria-label="My Favorite Images">
                            <SplideSlide className='singleSlide'>
                                <div className='testimonialImgDiv'>
                                    <LazyLoad className='fullSizeLazy'>
                                        <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/harminder-sir.jpeg"} alt="testimonial" className='testimonialMainImg' />
                                    </LazyLoad>
                                </div>
                                <div className='testimonialDataDiv'>
                                    <ImQuotesLeft size={35} />
                                    <p className='textSlide'>
                                        I have been working with Edtech Name since 2016 as a mathematics teacher.
                                        While working here I got to know that not only the students but teachers also get training to upgrade their skills from time to time.
                                        In fact the use of technology in teaching makes it even more fun and simple.
                                    </p>
                                    <p className='textSlide'>
                                        All the staff members are very cooperative and keen, due to all these reasons I never felt like I was working under pressure.
                                    </p>
                                    <div className='slideProfile'>

                                        <div className='slideProfileData'>
                                            <h2>Harminder Singh</h2>
                                            <h3>Teacher</h3>
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                            <SplideSlide className='singleSlide'>
                                <div className='testimonialImgDiv'>
                                    <LazyLoad className='fullSizeLazy'>
                                        <img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/megha-mam.jpeg"} alt="testimonial" className='testimonialMainImg' />
                                    </LazyLoad>
                                </div>
                                <div className='testimonialDataDiv'>
                                    <ImQuotesLeft size={35} />
                                    <p className='textSlide'>
                                        You should definitely join Edtech Name as it's a really good platform to improve your child's learning pattern.
                                        With the help of all the support they are providing in the form of either study material or customer care is amazing and
                                        I'm really satisfied with the progress of my child.
                                    </p>
                                    <div className='slideProfile'>
                                        <div className='slideProfileData'>
                                            <h2>Megha Dua</h2>
                                            <h3>Tutor</h3>
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                        </Splide>
                    </div>
                </section>

                {/* recent from blog  */}
                <section className='studentTestimonialSection'>
                    <div className='homeSection4Heading'>
                        <h3>Testimonial</h3>
                        <p>Our Successful Students</p>
                    </div>

                    <div className='paddFullArea'>
                        <Splide className='studentTestimonialGrid' options={{
                            type: "loop",
                            pagination: false,
                            arrows: false,
                            autoplay: true,
                            interval: 3000,
                            perMove: 1,
                            perPage: 3,
                            gap: 20,
                            breakpoints: {
                                1200: {
                                    perPage: 2
                                },
                                800: {
                                    perPage: 1
                                }
                            }
                        }}
                            style={{
                                padding: 0
                            }}>
                            <SplideSlide>
                                <div className='studentTestimonialCard'>
                                    <div className='flex items-center gap-[20px]'>
                                        <LazyLoad className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                            <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/profileImg.jpg" className='fullImgCover' alt="" />
                                        </LazyLoad>
                                        <div>
                                            <p className='text-[#000] font-bold text-[23px]'>Ashish Kumar</p>
                                            <p className='font-[600] text-[#808080]'></p>

                                        </div>
                                    </div>
                                    <p className='pt-2'>
                                        Joining Edtech Name has been a game-changer for me.
                                        The supportive teachers and engaging learning environment have immensely contributed to my academic success.
                                        I'm thrilled to see my marks improve, thanks to the exceptional guidance and assistance provided by the educators.
                                    </p>
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className='studentTestimonialCard'>
                                    <div className='flex items-center gap-[20px]'>
                                        <LazyLoad className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                            <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/profileImg.jpg" className='fullImgCover' alt="" />
                                        </LazyLoad>
                                        <div>
                                            <p className='text-[#000] font-bold text-[23px]'>
                                                Harshita
                                            </p>
                                            <p className='font-[600] text-[#808080]'></p>

                                        </div>
                                    </div>
                                    <p className='pt-2'>
                                        Paschim Vihar boasts one of the premier coaching centers, renowned for its exceptional quality.
                                        The faculty consists of highly qualified professionals
                                        who excel in their respective fields. Their expertise and dedication make it an unparalleled learning environment for students.
                                    </p>
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className='studentTestimonialCard'>
                                    <div className='flex items-center gap-[20px]'>
                                        <LazyLoad className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                            <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/profileImg.jpg" className='fullImgCover' alt="" />
                                        </LazyLoad>
                                        <div>
                                            <p className='text-[#000] font-bold text-[23px]'>Mohanrao

                                            </p>
                                            <p className='font-[600] text-[#808080]'></p>

                                        </div>
                                    </div>
                                    <p className='pt-4'>
                                        The coaching center is widely recognized as a paragon of excellence.
                                        It distinguishes itself as one of the finest in the region, boasting a faculty of highly qualified professionals.
                                        With their wealth of knowledge and experience, the teachers provide exceptional guidance to the students.
                                    </p>
                                </div>
                            </SplideSlide>
                            <SplideSlide>

                                <div className='studentTestimonialCard'>
                                    <div className='flex items-center gap-[20px]'>
                                        <LazyLoad className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                            <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/profileImg.jpg" className='fullImgCover' alt="" />
                                        </LazyLoad>
                                        <div>
                                            <p className='text-[#000] font-bold text-[23px]'>Deepak

                                            </p>
                                            <p className='font-[600] text-[#808080]'></p>

                                        </div>
                                    </div>
                                    <p className='pt-4'>
                                        Joining Edtech Name has been beneficial for me. I'm achieving good marks, thanks to the supportive teachers.
                                        Their guidance and assistance have been invaluable in my academic progress.
                                    </p>
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className='studentTestimonialCard'>
                                    <div className='flex items-center gap-[20px]'>
                                        <LazyLoad className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                            <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/profileImg.jpg" className='fullImgCover' alt="" />
                                        </LazyLoad>
                                        <div>
                                            <p className='text-[#000] font-bold text-[23px]'>Jagdish

                                            </p>
                                            <p className='font-[600] text-[#808080]'></p>

                                        </div>
                                    </div>
                                    <p className='pt-4'>
                                        Edtech Name is an exceptional coaching center with outstanding teachers. They possess remarkable expertise, patiently addressing all my doubts and even going beyond the curriculum to impart additional knowledge. I am grateful for their dedication and the positive impact they have had on my learning journey.</p>
                                </div>
                            </SplideSlide>
                            <SplideSlide>

                                <div className='studentTestimonialCard'>
                                    <div className='flex items-center gap-[20px]'>
                                        <LazyLoad className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                                            <img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/profileImg.jpg" className='fullImgCover' alt="" />
                                        </LazyLoad>
                                        <div>
                                            <p className='text-[#000] font-bold text-[23px]'>Aditya
                                            </p>
                                            <p className='font-[600] text-[#808080]'></p>
                                        </div>
                                    </div>
                                    <p className='pt-4'>The purpose of this paper is to detail an exploratory case study which highlights a process to modernize an undergraduate marketing curriculum by incorporating aspects of  university ?</p>
                                </div>
                            </SplideSlide>
                        </Splide>
                    </div>


                </section>

                {/* section 077777777777777 our pricing */}

                <section className='faculty hidden'>

                    <div className='flex flex-col justify-center items-center pt-8'>
                        <p className='text-[var(--main)] font-bold '>OUR PRICING</p>
                        <h1 className='text-[30px] font-[600]'>Pricing & Packages</h1>
                    </div>

                    <div className='basciplan'>
                        <div className=' leading-9 bg-white p-8'>
                            <div className='text-center'>
                                <p className='font-bold pt-4'>BASIC PLAN</p>
                                <h1 className='font-bold text-[#808080] pt-5'>$ <span className='text-[30px] text-[var(--main)]'>89K</span></h1>
                                <p className='leading-5 pt-4 py-4 text-[#808080]'> Results show that by integrating digital marketing activities in all courses, graduating seniors developed not only skills but the ability to apply them and a current perspective ofation.</p>
                            </div>
                            <div className='py-4'>
                                <div className='text-center border-[1px] border-[#1891ed] text-[#1891ed] font-[600] p-1'>
                                    <p>GET STARTED</p>
                                </div>

                            </div>
                        </div>
                        <div className=' leading-9 bg-white p-8'>
                            <div className='text-center'>
                                <p className='font-bold pt-4'>BASIC PLAN</p>
                                <h1 className='font-bold text-[#808080] pt-5'>$ <span className='text-[30px] text-[var(--main)]'>59K</span></h1>
                                <p className='leading-5 pt-4 py-4 text-[#808080]'> Results show that by integrating digital marketing activities in all courses, graduating seniors developed not only skills but the ability to apply them and a current perspective ofation.</p>
                            </div>
                            <div className='py-4'>
                                <div className='text-center border-[1px] border-[#1891ed] text-[#1891ed] font-[600] p-1'>
                                    <p>GET STARTED</p>
                                </div>

                            </div>
                        </div>
                        <div className=' leading-9 bg-white p-8'>
                            <div className='text-center'>
                                <p className='font-bold pt-4'>BASIC PLAN</p>
                                <h1 className='font-bold text-[#808080] pt-5'>$ <span className='text-[30px] text-[var(--main)]'>231K</span></h1>
                                <p className='leading-5 pt-4 py-4 text-[#808080]'> Results show that by integrating digital marketing activities in all courses, graduating seniors developed not only skills but the ability to apply them and a current perspective ofation.</p>
                            </div>
                            <div className='py-4'>
                                <div className='text-center border-[1px] border-[#1891ed] text-[#1891ed] font-[600] p-1'>
                                    <p>GET STARTED</p>
                                </div>

                            </div>
                        </div>
                        <div className=' leading-9 bg-white p-8'>
                            <div className='text-center'>
                                <p className='font-bold pt-4'>BASIC PLAN</p>
                                <h1 className='font-bold text-[#808080] pt-5'>$ <span className='text-[30px] text-[var(--main)]'>49K</span></h1>
                                <p className='leading-5 pt-4 py-4 text-[#808080]'> Results show that by integrating digital marketing activities in all courses, graduating seniors developed not only skills but the ability to apply them and a current perspective ofation.</p>
                            </div>
                            <div className='py-4'>
                                <div className='text-center border-[1px] border-[#1891ed] text-[#1891ed] font-[600] p-1'>
                                    <p>GET STARTED</p>
                                </div>

                            </div>
                        </div>
                    </div>


                </section>



                {/* mobile  newsletter  */}
                <section className='newsLetter paddFullArea faculty'>
                    <div className='getaccess '>
                        <div className='newLetterHeading'>
                            <h1>Get Access To Our <span className='freeBatchTxt'>Free Batches </span> Now</h1>
                            <p>Get instant access to high-quality material</p>
                        </div>
                        <div className='newsLetterInpDiv'>
                            <p>
                                +91
                            </p>
                            <input type="number" className='newsLetterInput noNumberStyle' placeholder="WhatsApp Number" ></input>
                            <div className='iconsd'>
                                <BsChevronRight />
                            </div>
                        </div>

                    </div>
                </section>



                {/* section out courses list    */}
                <section className='homeFooterNotes'>
                    <div className='homeFooterTabs'>
                        <ul className='footerTabBtn' >
                            <li className={`${activeTab === 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>Notes <BiChevronDown /></li>
                            <li className={`${activeTab === 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>NCERT Solution <BiChevronDown /></li>
                            <li className={`${activeTab === 3 ? "active" : ""}`} onClick={() => setActiveTab(3)}>Reference Books <BiChevronDown /></li>
                            <li className={`${activeTab === 4 ? "active" : ""}`} onClick={() => setActiveTab(4)}>Study Resources <BiChevronDown /></li>
                            <li className={`${activeTab === 5 ? "active" : ""}`} onClick={() => setActiveTab(5)}>State Boards<BiChevronDown /></li>
                            <li className={`${activeTab === 6 ? "active" : ""}`} onClick={() => setActiveTab(6)}>Our Channels<BiChevronDown /></li>
                            <li className={`${activeTab === 7 ? "active" : ""}`} onClick={() => setActiveTab(7)}>Online Test<BiChevronDown /></li>
                        </ul>
                        <div className={activeTab === 1 ? "showTab" : "hideTab"}>
                            <div className='notesGrid'>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 6</p>
                                    <div className='notesContentLink'>
                                        <p>Class 6th Math's Notes</p>
                                        <p>Class 6th Science Notes</p>
                                        <p>Class 6th Social-science Notes</p>
                                        <p>Class 6th English Notes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 7</p>
                                    <div className='notesContentLink'>
                                        <p>Class 6th Math's Notes</p>
                                        <p>Class 6th Science Notes</p>
                                        <p>Class 6th Social-science Notes</p>
                                        <p>Class 6th English Notes</p>
                                        <p>Ask a Your Doubt </p>
                                    </div>
                                </div>

                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 8</p>
                                    <div className='notesContentLink'>
                                        <p>Class 6th Math's Notes</p>
                                        <p>Class 6th Science Notes</p>
                                        <p>Class 6th Social-science Notes</p>
                                        <p>Class 6th English Notes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 9</p>
                                    <div className='notesContentLink'>
                                        <p>Class 9th Math's Notes</p>
                                        <p>Class 9th Physics Notes</p>
                                        <p>Class 9th Chemistry Notes</p>
                                        <p>Class 9th Biology Notes</p>
                                        <p>Class 9th SST Notes</p>
                                        <p>Class 9th English Notes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 10</p>
                                    <div className='notesContentLink'>
                                        <p>Class 10th Math's Notes</p>
                                        <p>Class 10th Physics Notes</p>
                                        <p>Class 10th Chemistry Notes</p>
                                        <p>Class 10th Biology Notes</p>
                                        <p>Class 10th SSTNotes</p>
                                        <p>Class 10th English Notes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 11</p>
                                    <div className='notesContentLink'>
                                        <p>Class 11th Math's Notes</p>
                                        <p>Class 11th Physics Notes</p>
                                        <p>Class 11th Chemistry Notes</p>
                                        <p>Class 11th BiologyNotes</p>
                                        <p>Class 11th SSTNotes</p>
                                        <p>Class 11th English Notes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 12</p>
                                    <div className='notesContentLink'>
                                        <p>Class 12th Math's Notes</p>
                                        <p>Class 12th Physics Notes</p>
                                        <p>Class 12th Chemistry Notes</p>
                                        <p>Class 12th Biology Notes</p>
                                        <p>Class 12th SST Notes</p>
                                        <p>Class 12th EnglishNotes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={activeTab === 2 ? "showTab" : "hideTab"}>
                            <div className='notesGrid '>
                                <div className='notesContentLink'>
                                    <p>NCERT Solutions For Class 6</p>
                                    <p>NCERT Solutions For Class 7</p>
                                    <p>NCERT Solutions For Class 8</p>
                                    <p>NCERT Solutions For Class 9</p>
                                    <p>NCERT Solutions For Class 10</p>
                                    <p>NCERT Solutions For Class 11</p>
                                    <p>NCERT Solutions For Class 12</p>
                                </div>
                            </div>
                        </div>
                        <div className={activeTab === 3 ? "showTab" : "hideTab"}>
                            <div className='notesGrid '>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 6</p>
                                    <div className='notesContentLink'>
                                        <p>Practice Sheet for Grade 6 Mathe's</p>
                                        <p>Practice Sheet for Grade 6 Science</p>
                                        <p>Practice Sheet for Grade 6 English</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 7</p>
                                    <div className='notesContentLink'>
                                        <p>Practice Sheet for Grade 7 Mathe's</p>
                                        <p>Practice Sheet for Grade 7 Science</p>
                                        <p>Practice Sheet for Grade 7 English</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 8</p>
                                    <div className='notesContentLink'>
                                        <p>Practice Sheet for Grade 8 Mathe's</p>
                                        <p>Practice Sheet for Grade 8 Science</p>
                                        <p>Practice Sheet for Grade 8 English</p>
                                        <p>Science question papers for grade 8</p>
                                        <p>Important Questions Class 8 Science</p>
                                        <p>R.S Aggarwal Class 8 Solution</p>


                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 9</p>
                                    <div className='notesContentLink'>
                                        <p>Class 6th Math's Notes</p>
                                        <p>Class 6th Science Notes</p>
                                        <p>Class 6th Social-science Notes</p>
                                        <p>Class 6th Social-science Notes</p>
                                        <p>Class 6th Social-science Notes</p>
                                        <p>Class 6th English Notes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>

                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 10</p>
                                    <div className='notesContentLink'>
                                        <p>Class 6th Math's Notes</p>
                                        <p>Class 6th Science Notes</p>
                                        <p>Class 6th Social-science Notes</p>
                                        <p>Class 6th English Notes</p>
                                        <p>Ask a Your Doubt</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 11</p>
                                    <div className='notesContentLink'>
                                        <p>Math's MCQ</p>
                                        <p>Physics MCQ</p>
                                        <p>Chemistry MCQ</p>
                                        <p>Biology MCQ</p>
                                        <p>SST MCQ</p>
                                        <p>English MCQ</p>
                                        <p>NCERT Solutions</p>
                                        <p>RD Sharma Solutions</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>CLASS 12</p>
                                    <div className='notesContentLink'>
                                        <p>Fundamental Math's Questions</p>
                                        <p>Fundamental Physics Questions</p>
                                        <p>Fundamental Chemistry Questions</p>
                                        <p>Fundamental Biology Questions</p>
                                        <p>CBSE Sample papers</p>
                                        <p>CBSE Previous year Papers</p>
                                        <p>RS Agarwal's solutions</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={activeTab === 4 ? "showTab" : "hideTab"}>
                            <div className='notesGrid'>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>Entrance exam study materials.</p>
                                    <div className='notesContentLink'>
                                        <p>Practice papers for entrance exam</p>
                                        <p>JEE Main previous exam papers</p>
                                        <p>JEE Advance previous exam papers</p>
                                        <p>Questions class wise</p>
                                        <p>Biology MCQ For NEET</p>
                                        <p>Integer Based Questions</p>
                                        <p>Olympiad previous year Papers</p>
                                        <p>BITSAT previous year papers</p>
                                        <p>NEET Previous year papers</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>Exam resources and study materials</p>
                                    <div className='notesContentLink'>
                                        <p>Science formulas</p>
                                        <p>Chemistry formulas</p>
                                        <p>Math's Formulas</p>
                                        <p>About JEE Main</p>
                                        <p>About NEET</p>
                                        <p>BITSAT</p>
                                        <p>Entrance exam</p>
                                        <p>JEE Main</p>
                                        <p>NEET</p>
                                    </div>
                                </div>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>Entrance examination</p>
                                    <div className='notesContentLink'>
                                        <p>BITSAT</p>
                                        <p>More engineering exam</p>
                                        <p>More Medical Exam</p>
                                        <p>Olympiads exam</p>
                                        <p>Study Materials</p>
                                        <p>Name reactions organic chemistry</p>
                                        <p>Revision Material Biology</p>
                                        <p>Revision Material Physics</p>
                                        <p>Class 10 ICSE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={activeTab === 5 ? "showTab" : "hideTab"}>
                            <div className='notesGrid stateboard'>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'></p>
                                    <div className='notesContentLink'>
                                        <p>CBSE</p>
                                        <p>Delhi Board </p>
                                        <p>State Board</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={activeTab === 6 ? "showTab" : "hideTab"}>
                            <div className='notesGrid stateboard'>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'></p>
                                    <div className='notesContentLink'>
                                        <p>Edtech Name Foundation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={activeTab === 7 ? "showTab" : "hideTab"}>
                            <div className='notesGrid stateboard'>
                                <div className='noteGridColumn'>
                                    <p className='noteHeadingText'>Virtual quizs.</p>
                                    <div className='notesContentLink'>
                                        <p>Virtual Science quizzes for Class 6</p>
                                        <p>Virtual Science quizzes for Class 7</p>
                                        <p>Virtual Science quizzes for Class 8</p>
                                        <p>Virtual Science quizzes for Class 9</p>
                                        <p>Virtual Science quizzes for Class 10</p>
                                        <p>Chapter wise class 11 Quiz</p>
                                        <p>Chapter wise class 12 Quiz</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </Base>
    )
}

export default Home 