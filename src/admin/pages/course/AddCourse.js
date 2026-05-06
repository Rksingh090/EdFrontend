import React from 'react'
import AdminBase from '../../adminBase/AdminBase'

import "./../../adminBase/adminbase.css";
import "./addcourse.css";

import ReactQuill from 'react-quill'
import QuillToolbar, { formats, modules } from '../../../components/utils/EditorToolbar';
import { FaRegImages } from 'react-icons/fa';
import { LuFileVideo } from 'react-icons/lu';
import { BsInfoCircle } from 'react-icons/bs';
import Switch from '../../../components/utils/Switch';
import { useSelector } from 'react-redux';

const EditCourse = () => {
    const { categories, subcategories } = useSelector(state => state.category);

	return (
		<div>
			<div className='editCoursePage'>

				<div className='editCoursePageGrid'>

					{/* column 1 */}
					<div className="editCourseCol1">

						{/* course meta  */}
						<div className='tableContainer'>
							<div className='tableHeading'>
								<h2 className='heading'>Course Meta</h2>
							</div>
							<div className='editCourseContainer'>
								<div className="flexColInput">
									<label htmlFor="courseName">Title</label>
									<input type="text" id='courseName' className="FormInput" />
								</div>
								<div className="flexColInput">
									<label htmlFor="courseSlug">Course Slug</label>
									<input type="text" id='courseSlug' className="FormInput" />
								</div>
								<div className="flexColInput">
									<label htmlFor="courseDescription">Course Description</label>
									<div className='editCourseRQuill'>
										<QuillToolbar hasSeparation={true} />
										<ReactQuill
											theme='snow'
											placeholder={"Write Course Description..."}
											modules={modules}
											formats={formats}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* course image video  */}
						<div className='tableContainer'>
							<div className="tableHeading">
								<h2 className="heading">Course Media</h2>
							</div>
							<div className="courseMediaUpload">
								<div className="flexColImg">
									<p className='labelText'>Upload Thumbnail</p>
									<div className='imgPlaceholder'>
										<FaRegImages size={25} />
										<span className='infoText'>Upload Image of 700x430 Pixel</span>
									</div>
									<div className="infoText sm flexed">
										<div>
											<BsInfoCircle />
										</div>
										<span>Image of size 700x430 PX is recommended. Bigger images will be automatically croped to this size.</span>
									</div>
								</div>
								<div className='flex flex-col gap-4'>
									<div className="flexColImg">
										<p className='labelText'>Upload Preview Video</p>
										<div className='imgPlaceholder'>
											<LuFileVideo size={25} />
											<span className='infoText'>Upload Video (Max: 50MB)</span>
										</div>
									</div>
									<div className='flexColInput'>
										<label htmlFor="courseLanguage">Video Type</label>
										<select id='courseLanguage' className="FormInput" >
											<option value="none">none</option>
											<option value="youtube">YouTube</option>
											<option value="html5">HTML5</option>
											<option value="vimeo">Vimeo</option>
											<option value="external-url">External URL</option>
											<option value="embeded">Embeded</option>
											<option value="shortcode">ShortCode</option>
										</select>
									</div>

								</div>
							</div>
						</div>

						<div className='tableContainer'>
							<div className="tableHeading">
								<h2 className="heading">Team Link</h2>
							</div>
							<div className="editCourseContainer">
								<div className="flexColInput">
									<input type="text" id="courseTeamLink" placeholder='Paste Microsoft Team Link Here..' className='FormInput' />
								</div>
							</div>
						</div>

					</div>

					{/* column 2  */}
					<div className="editCourseCol2">

						{/* course settings  */}
						<div className='tableContainer'>
							<div className="tableHeading">
								<h2 className="heading">Course Pricing</h2>
							</div>
							<div className="editCourseContainer">
								<div className="flexColInput">
									<label>Course Type</label>
									<div className='flex flex-row items-center gap-x-4'>

										<div className='flex flex-row items-center gap-x-2'>
											<input type="radio" id="course_type_free" value={"free"} name="course_type" className="llInput" />
											<label htmlFor="course_type_free">Free</label>
										</div>
										<div className='flex flex-row items-center gap-x-2'>
											<input type="radio" id="course_type_paid" value={"paid"} name="course_type" className="llInput" />
											<label htmlFor="course_type_paid">Paid</label>
										</div>
									</div>
								</div>

								<div className="flexColInput">
									<label htmlFor="coursePrice">Course Price (Rs.)</label>
									<input type="number" id='coursePrice' className="FormInput noNumberStyle" />
								</div>
								<div className="flexColInput">
									<label htmlFor="courseDiscount">Course Discount (Rs.)</label>
									<input type="number" id='courseDiscount' className="FormInput noNumberStyle" />
								</div>
								<div className="flexColInput">
									<label htmlFor="courseCat">Category</label>
									<select id='courseCat' className="FormInput" >
                                        <option value="">Select Category</option>
                                        {categories.map(catItem => (
                                            <option key={catItem.category._id} value={catItem.category._id}>{catItem.category.name}</option>
                                        ))}
									</select>
								</div>
								<div className="flexColInput">
									<label htmlFor="courseSubCat">Sub Category</label>
									<select id='courseSubCat' className="FormInput" >
                                        <option value="">Select Sub Category</option>
                                        {subcategories.map(subCat => (
                                            <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
                                        ))}
									</select>
								</div>
								<div className='flexColInput'>
									<label htmlFor="courseLanguage">Course Language</label>
									<select id='courseLanguage' className="FormInput" >
										<option value="hindi">Hindi</option>
										<option value="english">English</option>
										<option value="hinglish">Hinglish</option>
									</select>
								</div>
							</div>
						</div>

						{/* batch details  */}
						<div className='tableContainer'>
							<div className="tableHeading">
								<h2 className="heading">Course Batch Details</h2>
							</div>
							<div className='editCourseContainer'>
								<div className='flex flex-col gap-2'>
									<label>Batch Timing</label>
									<div className='grid grid-cols-2 gap-4'>
										<div className="flexColInput">
											<label htmlFor='StartTime'>Start Time</label>
											<input type="text" placeholder='10AM' id="StartTime" className='FormInput' />
										</div>
										<div className="flexColInput">
											<label htmlFor='EndTime'>End Time</label>
											<input type="text" placeholder='12PM' id="EndTime" className='FormInput' />
										</div>
									</div>
								</div>

								<div className='flexColInput'>
									<label>Batch Days</label>
									<div className='flex flex-row gap-4 flex-wrap'>
										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="[0,1,2,3,4,5,6]" id="ALL" className='llInput sm' />
											<label htmlFor='ALL'>ALL</label>
										</div>

										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="0" id="MON" className='llInput sm' />
											<label htmlFor='MON'>MON</label>
										</div>

										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="1" id="TUE" className='llInput sm' />
											<label htmlFor='TUE'>TUE</label>
										</div>

										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="2" id="WED" className='llInput sm' />
											<label htmlFor='WED'>WED</label>
										</div>


										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="3" id="THU" className='llInput sm' />
											<label htmlFor='THU'>THU</label>
										</div>

										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="4" id="FRI" className='llInput sm' />
											<label htmlFor='FRI'>FRI</label>
										</div>


										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="5" id="SAT" className='llInput sm' />
											<label htmlFor='SAT'>SAT</label>
										</div>


										<div className="flex flex-row items-center gap-2">
											<input type="checkbox" value="6" id="SUN" className='llInput sm' />
											<label htmlFor='SUN'>SUN</label>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* course settings  */}
						<div className='tableContainer'>
							<div className="tableHeading">
								<h2 className="heading">Course Setting</h2>
							</div>
							<div className='editCourseContainer'>
								<div className="flexColInput">
									<label htmlFor='StartDate'>Course Start Date</label>
									<input type="datetime-local" id="StartDate" className='FormInput' />
								</div>
								<div className="flexColInput">
									<label htmlFor='EndDate'>End Time</label>
									<input type="datetime-local" id="EndDate" className='FormInput' />
								</div>
								<div className="flexColInput">
									<label htmlFor='EndDate'>Publish Course</label>
									<Switch value={true} onChange={(val) => console.log(val)} />
									<div className='infoText sm flexed'>
										<div>
											<BsInfoCircle />
										</div>
										<span>You can publish and draft course from here.</span>
									</div>
								</div>


							</div>


						</div>

						{/* course offers  */}
						<div className='tableContainer'>
							<div className="tableHeading">
								<h2 className="heading">Course Discounts</h2>
							</div>
							<div className='editCourseContainer'>
								<div className='flex flex-col gap-2'>
									<label>Affiliate Discount</label>
									<div className='grid grid-cols-2 gap-4'>
										<div className="flexColInput">
											<label htmlFor='affiliateDiscount'>Discount (Rs. or %)</label>
											<input type="text" placeholder='' id="affiliateDiscount" className='FormInput' />
										</div>
										<div className="flexColInput">
											<label htmlFor='affiliateDisType'>Type</label>
											<select id="affiliateDisType" className="FormInput">
												<option value="percent">Percent</option>
												<option value="amount">Amount</option>
											</select>
										</div>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<label>Franchise Discount</label>
									<div className='grid grid-cols-2 gap-4'>
										<div className="flexColInput">
											<label htmlFor='franchiseDiscount'>Discount (Rs. or %)</label>
											<input type="text" placeholder='' id="franchiseDiscount" className='FormInput' />
										</div>
										<div className="flexColInput">
											<label htmlFor='franchiseDisType'>Type</label>
											<select id="franchiseDisType" className="FormInput">
												<option value="percent">Percent</option>
												<option value="amount">Amount</option>
											</select>
										</div>
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<label>Bussiness Ass. Discount</label>
									<div className='grid grid-cols-2 gap-4'>
										<div className="flexColInput">
											<label htmlFor='businessAssDiscount'>Discount (Rs. or %)</label>
											<input type="text" placeholder='' id="businessAssDiscount" className='FormInput' />
										</div>
										<div className="flexColInput">
											<label htmlFor='businessAssDisType'>Type</label>
											<select id="businessAssDisType" className="FormInput">
												<option value="percent">Percent</option>
												<option value="amount">Amount</option>
											</select>
										</div>
									</div>
								</div>


							</div>


						</div>

					</div>

				</div>
			</div>
		</div>
	)
}

export default EditCourse