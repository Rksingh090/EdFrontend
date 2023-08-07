import React, { useRef, useState } from 'react'
import "./academic1.css";
import { Link } from 'react-router-dom';

import { GiCheckMark } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";

import { BsWhatsapp, BsYoutube, BsTwitter, BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaStarOfLife } from "react-icons/fa";






const Academic1 = () => {
	const videoRef1 = useRef(null);

	const [faqMemo, setFaqMemo] = useState([
		{
			title: "What is the duration of the online math course coaching?",
			answer: "The Course will be start from 7st July 2023 and ended on 31st March 2024."
		},
		{
			title: "Can I access the course materials and resources at any time?",
			answer: "Yes, All the courses material can be accessed at any time during the course duration."
		},
		{
			title: "Is there any provision for doubt-clearing sessions outside of regular class hours?",
			answer: "Yes, Doubt classes have been provisioned here which will be different from regular classes and regular notification will be given to the students."
		},
		{
			title: "How experienced are the math coaches delivering the online course?",
			answer: "Our teachers having a master degree and more than 10 years of experiance in teaching profession."
		},
		{
			title: "Are there any assessments or quizzes to evaluate my progress?",
			answer: "Yes, Our courses includes Quiz and Assignment section, Where you can attempt test multiple times and evaluate your progress on daily basis after the class."
		},
		{
			title: "Are the course materials and resources aligned with the CBSE syllabus?",
			answer: "Yes, Our course materials and resources aligned with CBSE syllabus."
		}
	])

	const handleToggleQuestion = (index) => {
		let allFaqData = [...faqMemo];
		allFaqData[index].isOpen = allFaqData[index].isOpen === true ? false : true;
		console.log(allFaqData);
		setFaqMemo(allFaqData)
	}

	return (
		<div className='academic1Page'>

			{/* navbar  */}
			<div className='academi1Navbar'>
				<div className='A1NavDiv1'>
					<img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/logoLandscape.png"} alt="" />
					<div className='A1NavTitle'>
						<h2>Edtech Name ACADEMY</h2>
						<p>Smiley of Education</p>
					</div>
				</div>
				<div className='A1NavDiv2'>
					<Link className='registerBTN' to={"/academics/register"}>REGISTER FOR CLASS HERE</Link>
				</div>
			</div>

			{/* hero section  */}
			<div className='landingVideoA1'>
				
				<div className='A1HeroSection'>
					<div className='A1HeroPart1'>
						<p>Feeling <span className='colorTheme'>stuck and lacking confidence</span><br />
							when it comes to solving math <br /> problems? Need a comprehensive<br />
							<span className='colorTheme'> solution</span> to <span className='colorTheme'>boost your grades</span>?
						</p>
					</div>
					<div className='A1HeroPart2'>
						<h2>Master The Math</h2>
						<h4>Boost Your Grades and Math Skills<br /> with Our Comprehensive Math Course</h4>
						<Link to={"/academics/register"} className='enrollNowA1Hero'>Enroll Now</Link>
					</div>
				</div>

				<div className="landingVideoDiv">
					<video ref={videoRef1} muted loop autoPlay>
						<source src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/1b4176b937.mp4"} />
					</video>
				</div>

			</div>

			{/* about section  */}
			<div className="A1AboutUsSection">
				<div className='A1AboutFixedCorner topRight'>
					<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/aboutUsBlob.svg" alt="" />
				</div>
				<div className='A1AboutFixedCorner bottomRight'>
					<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/aboutUsBlob2.svg" alt="" />
				</div>

				<div className='A1AboutUsPart1'>
					<img src={"https://letslearn-storage.s3.ap-south-1.amazonaws.com/home/logoLandscape.png"} alt="" />
				</div>
				<div className='A1AboutUsPart2'>
					<h2>About Us</h2>
					<p className='mt-4'>
						Edtech Name, the premier educational institution in West Delhi that has been revolutionizing the way student learn since 2016. With our unwavering commitment to delivering high-quality education, we have become the fastest growing coaching institute in the area.
					</p>
					<p>
						Our primary objective at Edtech Name is to provide students with qualitative and advanced education that equips them for success. We take pride in our innovative approach to teaching and our dedication to helping students excel in foundation courses and entrance examinations.
					</p>
					<p>
						At Edtech Name, we believe in personalized learning. That's why we offer both one-on-one coaching and group sessions to ensure that every student receives the individual attention they need. Our experienced and passionate faculty members are committed to guiding students towards academic excellence.
					</p>
					<Link to="/academics/register" className='readMoreBtn'>Read More</Link>
				</div>
			</div>

			{/* choose class section  */}
			<div className="A1ChooseClassSection A1BookBackImg">
				<div className="A1WhiteBackAbs"></div>
				<div className="A1ChooseClassAbsData">
					<h2 className='A1ChooseClassHeader'>Choose Your Class</h2>
					<div className='A1ChooseClassGrid'>
						<div className="A1ChooseClassItem">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci1.jpg" alt="" />
							</div>
							<div className="A1ChooseClassMeta">
								<h3>Start your Journey to Excel in Maths</h3>
								<h2>Class 9th Mathematics</h2>
								<Link to={"https://letslearn.live/course/647868a3e65607d37428ca75/class-9th-mathematics"}>Preview Course</Link>
							</div>
						</div>
						<div className="A1ChooseClassItem">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci2.jpg" alt="" />
							</div>
							<div className="A1ChooseClassMeta">
								<h3>Enroll an Master in Maths</h3>
								<h2>Class 10th Mathematics</h2>
								<Link to={"https://letslearn.live/course/6479c1d19574265b3073339c/class-10t-mathematics"}>Preview Course</Link>
							</div>
						</div>
						<div className="A1ChooseClassItem hidden">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci3.jpg" alt="" />
							</div>
							<div className="A1ChooseClassMeta">
								<h3>Get Ready to Ace Your Math Exam</h3>
								<h2>Class 11th Mathematics</h2>
								<Link to={"https://letslearn.live/course/64719f1e4a9c5866a6151ff1/maths"}>Preview Course</Link>
							</div>
						</div>
						<div className="A1ChooseClassItem hidden">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci4.jpg" alt="" />
							</div>
							<div className="A1ChooseClassMeta">
								<h3>Unlock Your Math Potential</h3>
								<h2>Class 12th Mathematics</h2>
								<Link to={"https://letslearn.live/course/6471a0d44a9c5866a615211a/maths"}>Preview Course</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* book class section  */}
			<div className="A1ChooseClassSection A1BookBackImg">
				<div className="A1WhiteBackAbs"></div>
				<div className="A1ChooseClassBlob">
					<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/bookClassBlob.svg" alt="" />
				</div>
				<div className="A1ChooseClassAbsData">
					<div className='A1headerAlignCenter'>
						<h2 className='A1ChooseClassHeader'>Book Your Class</h2>
						<h3 className='A1ChooseClassSubHeader'>Unlock Your Math Potential - Enroll Today!</h3>
					</div>
					<div className='A1ChooseClassGrid'>
						<div className="A1ChooseClassItem A1BookClass">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci1.jpg" alt="" />
							</div>
							<div className="A1ChooseClassPrice">
								<h2>Class 9th Mathematics</h2>
								<h3>Get Full Course At</h3>
								<p className='font-bold'>Rs. 18000</p>
								<span className='A1CCAlignedPrice'>
									<b><span>Rs. </span><span>1800</span></b>
									<span className='A1CCInfoText'>(Amount after 90% Discount)</span>
								</span>
								<span className='A1CCAlignedPrice'>
									<b><span>Rs. </span><span>2160</span></b>
									<span className='A1CCInfoText'>(Inc. GST and Other Charges)</span>
								</span>
								<Link to={"/academics/register"}>Enroll Now</Link>
							</div>
						</div>
						<div className="A1ChooseClassItem A1BookClass">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci2.jpg" alt="" />
							</div>
							<div className="A1ChooseClassPrice">
								<h2>Class 10th Mathematics</h2>
								<h3>Get Full Course At</h3>
								<p className='font-bold'>Rs. 21000</p>
								<span className='A1CCAlignedPrice'>
									<b><span>Rs. </span><span>2100</span></b>
									<span className='A1CCInfoText'>(Amount after 90% Discount)</span>
								</span>
								<span className='A1CCAlignedPrice'>
									<b><span>Rs. </span><span>2520</span></b>
									<span className='A1CCInfoText'>(Inc. GST and Other Charges)</span>
								</span>
								<Link to={"/academics/register"}>Enroll Now</Link>
							</div>
						</div>
						<div className="A1ChooseClassItem A1BookClass hidden">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci3.jpg" alt="" />
							</div>
							<div className="A1ChooseClassPrice">
								<h2>Class 11th Mathematics</h2>
								<h3>Get Full Course At</h3>
								<p>Rs. 18000</p>
								<strong>Rs. 21000</strong>
								<span>(Rs. 2100 Including GST and other Charges)</span>
								<Link to={"https://letslearn.live/payment/course/64719f1e4a9c5866a6151ff1/maths"}>Enroll Now</Link>
							</div>
						</div>
						<div className="A1ChooseClassItem A1BookClass hidden">
							<div className='A1ChooseClassImg'>
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/ci4.jpg" alt="" />
							</div>
							<div className="A1ChooseClassPrice">
								<h2>Class 12th Mathematics</h2>
								<h3>Get Full Course At</h3>
								<p>Rs. 18000</p>
								<strong>Rs. 21000</strong>
								<span>(Rs. 2100 Including GST and other Charges)</span>
								<Link to={"https://letslearn.live/payment/course/6471a0d44a9c5866a615211a/maths"}>Enroll Now</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* best learning sec  */}
			<div className="A1BestLearning A1BookBackImg">
				<div className="A1WhiteBackAbs"></div>
				<div className="A1BestLearningAbsData">
					<div className="A1BestLearningPart1">
						<h2>Get The Best<br /> Learning</h2>
						<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/bestlearning.png" alt="" />
					</div>
					<div className="A1BestLearningPart2">
						<div className="A1BLPart2Item">
							<h2 className="A1BLHeading">Expert Instructors: </h2>
							<p>Learn from experienced math educators who have a deep understanding of the class curriculum and can explain complex concepts in a simple and engaging manner.</p>
						</div>
						<div className="A1BLPart2Item">
							<h2 className="A1BLHeading">Comprehensive Curriculum:</h2>
							<p>Our carefully crafted curriculum covers all essential topics, ensuring you have a solid foundation in 10th class math and are fully prepared for exams.</p>
						</div>
						<div className="A1BLPart2Item">
							<h2 className="A1BLHeading">Interactive Learning: </h2>
							<p>Dive into interactive lessons, practice problems, and quizzes that actively engage you in the learning process, making math enjoyable and accessible.</p>
						</div>
						<div className="A1BLPart2Item">
							<h2 className="A1BLHeading">Bonus Resources:</h2>
							<p>Take advantage of additional study guides, practice sheets, and real-world applications to reinforce your learning and tackle math challenges with ease.</p>
						</div>
						<div className="A1BLPart2Item">
							<h2 className="A1BLHeading">Flexible Schedule:</h2>
							<p>Access course materials anytime, anywhere, and study at your own pace. Fit your math studies into your busy life without compromising on quality.</p>
						</div>
					</div>
				</div>
			</div>

			{/* a1 features images  */}
			<div className="A1FeaturesSection A1BookBackImg">
				<div className="A1WhiteBackAbs"></div>
				<div className="A1FeaturesAbsData">
					<h2 className='heading'>What will <span>You Get</span></h2>
					<div className="A1FeaturesGrid">
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature1.svg" alt="" />
							</div>
							<h4>1 Year Support</h4>
						</div>
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature2.png" alt="" />
							</div>
							<h4>Live Classes</h4>
						</div>
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature3.png" alt="" />
							</div>
							<h4>Recorded Session</h4>
						</div>
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature4.webp" alt="" />
							</div>
							<h4>CBSE Based Carriculam</h4>
						</div>
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature5.png" alt="" />
							</div>
							<h4>Study Material</h4>
						</div>
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature6.png" alt="" />
							</div>
							<h4>Qualified Teachers</h4>
						</div>
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature7.png" alt="" />
							</div>
							<h4>Regular Quiz / Assignments</h4>
						</div>
						<div className="A1FeatureItem">
							<div className="A1FeaturedItemImg">
								<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/a1feature8.webp" alt="" />
							</div>
							<h4>Skill Development</h4>
						</div>
					</div>
					<Link to={"/academics/register"} className='A1BookSeat' >Book You Seat Now</Link>
				</div>
			</div>

			<div className="A1QualitySection A1BookBackImg">
				<div className="A1WhiteBackAbs"></div>
				<div className="A1QualityAbsData">
					<h2>Worried About the Quality?</h2>
					<p className="A1QualityBg">Unlock the true power of our Courses - experience <br /> it firsthand, share your views, and be part of a <br /> quality-driven community. No testimonials, just <br /> exceptional results.</p>
					<p className="A1QualityText">Discover a risk-free experience like no other! With<br /> our 15-day money back guarantee, you have the<br /> freedom to try our sessions and decide for<br /> yourself. Say goodbye to doubts and hello to<br /> confident decision-making.</p>
				</div>
			</div>

			{/* reserved seats  */}
			<div className="A1ReserveSeat A1BookBackImg">
				<div className="A1WhiteBackAbs"></div>
				<div className='A1ReserverBlobTL1'>
					<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/aboutUsBlob2.svg" alt="" />
				</div>
				<div className='A1ReserverBlobTL2'>
					<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/aboutUsBlob2.svg" alt="" />
				</div>
				<div className='A1ReserverBlobTL3'>
					<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/aboutUsBlob2.svg" alt="" />
				</div>
				<div className='A1ReserverBlobTL4'>
					<img src="https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/aboutUsBlob2.svg" alt="" />
				</div>

				<div className="A1ReserveAbsData">
					<div className='A1ReserveSeatHeader'>
						<h2>Reserve Your Seat</h2>
						<h3>Before it's Too late</h3>
					</div>
					<div className="A1ReserveClasses">
						<div className="A1ReserveClassItem">
							<div className="A1ReserveMeta">
								<h3>9th Class Mathematics</h3>
								<p>Rs. 2160</p>
							</div>
							<div className='A1ReserveKeys'>
								<div>
									<GiCheckMark />
									<p>Interactive live classes with<br /> experienced instructors.</p>
								</div>
								<div>
									<GiCheckMark />
									<p>Flexible scheduling options</p>
								</div>
								<div>
									<GiCheckMark />
									<p>Access to recorded class<br /> sessions for review or missed<br /> classes.</p>
								</div>
								<div>
									<GiCheckMark />
									<p>Personalized attention and<br /> feedback from instructors.</p>
								</div>
							</div>
							<div className="A1ReserverEnrollNow">
								<Link to="/academics/register">Enroll Now</Link>
							</div>
						</div>
						<div className="A1ReserveClassItem">
							<div className="A1ReserveMeta">
								<h3>10th Class Mathematics</h3>
								<p>Rs. 2520</p>
							</div>
							<div className='A1ReserveKeys'>
								<div>
									<GiCheckMark />
									<p>Interactive live classes with<br /> experienced instructors.</p>
								</div>
								<div>
									<GiCheckMark />
									<p>Flexible scheduling options</p>
								</div>
								<div>
									<GiCheckMark />
									<p>Access to recorded class<br /> sessions for review or missed<br /> classes.</p>
								</div>
								<div>
									<GiCheckMark />
									<p>Personalized attention and<br /> feedback from instructors.</p>
								</div>
							</div>
							<div className='A1ReserverEnrollNow'>
								<Link to="/academics/register">Enroll Now</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* faq section  */}
			<div className="A1FaqSection A1BookBackImg">
				<div className="A1FaqAbsData">
					<h2>Frequently Asked Questions</h2>
					<div className='A1FaqQueMap'>
						{
							faqMemo?.map((faq, index) => {
								return (
									<div className='A1FaqQueItem' key={index}>
										<div className='A1FaqQuestion' onClick={() => handleToggleQuestion(index)}>
											<img src='https://letslearn-storage.s3.ap-south-1.amazonaws.com/landing/startMark.svg' alt='' />
											<h3>{faq?.title}</h3>
											<MdKeyboardArrowDown className={`${faq?.isOpen ? "svgOpen" : "svgClose"}`} />
										</div>
										<div className={`A1FaqAnswer ${faq?.isOpen ? "open" : "close"}`}>
											<p>{faq?.answer}</p>
										</div>
									</div>
								)
							})
						}
					</div>
					<Link to="/academic/register" className='A1FaqEnrollNow'>Enroll Now to Get Started</Link>
				</div>
			</div>

			{/* contact us section  */}
			<div className='A1ContactSection'>
				<div className="A1ContactBackground"></div>
				<div className='A1ContactAbsData'>
					<div className='A1ContactParts'>
						<div className='A1ContactPart1'>
							<h4>Contact Us</h4>
							<p>428, 3rd Floor, Bhera Enclave,<br /> Paschim Vihar, New Delhi,<br /> 110087</p>
							<div className='A1MailAndPhone'>
								<a href="tel:+91 8506-03-8506">+91 8506-03-8506</a>
								<a href="mailto:Info.letslearnacademy@gmail.com">Info.letslearnacademy@gmail.com</a>
								<a href="https://www.letslearn.live">www.letslearn.live</a>
							</div>
							<div className='A1SocialIcons'>
								<Link to="/">
									<BsWhatsapp size={20} />
								</Link>
								<Link to="/">
									<FaFacebookF size={20} />
								</Link>
								<Link to="/">
									<BsTwitter size={20} />
								</Link>
								<Link to="/">
									<BsYoutube size={20} />
								</Link>
								<Link to="/">
									<BsInstagram size={20} />
								</Link>

							</div>
						</div>
						<form className='A1ContactPart2'>
							<div className='A1InputLabel'>
								<label htmlFor="A1Name">Enter Your Name <FaStarOfLife size={12} /></label>
								<input type="text" id="A1Name" />
							</div>
							<div className='A1InputLabel'>
								<label htmlFor="A1Email">Enter Your Email <FaStarOfLife size={12} /></label>
								<input type="email" id="A1Email" />
							</div>
							<div className='A1InputLabel'>
								<label htmlFor="A1MobileNo">Enter Mobile Number <FaStarOfLife size={12} /></label>
								<input type="number" id="A1MobileNo" className='noNumberStyle' />
							</div>
							<div className='A1InputLabel'>
								<label htmlFor="A1Class">Enter Your Class</label>
								<input type="text" id="A1Class" />
							</div>
							<div className='A1InputLabel'>
								<label htmlFor="A1Message">Message</label>
								<textarea rows={5} id="A1Message"></textarea>
							</div>
							<div className='A1ContactFormSubmit'>
								<button type='submit'>Submit</button>
								<p>Thanks for Submitting!</p>
							</div>
						</form>
					</div>
				</div>

			</div>

			{/* register btn  */}
			<div className='A1FixedRegister'>
				<Link to="/academics/register" className='A1RegBtn'>
					<span className='A1HurryTxt'>Hurry!</span>
					<span className='A1RegTxt'>Register Here</span>
					<span className='A1LimTxt'>Limited Seats Available</span>
				</Link>
			</div>

		</div>
	)
}

export default Academic1;