import React from 'react'
import Base from '../../components/base/Base';
import "./careers.css";
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';


const Careers = () => {
	return (
		<Base noFooter={true}>
			<div className='carrers3'>
				<div className='containvicky'>

					<div className='wrapppper'>
						<div className='apployjob'>
							<h1>APPLY-JOBS</h1>
						</div>
						<div className='candiate'>
							<div className='candiatefor'>
								<div className='resiyters'>
									<h1>For Registered Candidate</h1>
								</div>
								<div className='hetere'>
									<Link to="/logincarrers" className='loginhere'>Login Here</Link>

								</div>
								<div className='alwerdy'>
									<p>(Those who already submitted their registration details/resume earlier)</p>
								</div>

							</div>
							<div className='candiatefor'>
								<div className='resiyters'>
									<h1>For New Candidate Registration</h1>
								</div>
								<div className='hetere'>
									<Link to="/registercarrers" className='loginhere registerdt'>Register Here</Link>

								</div>
								<div className='alwerdy'>
									<p>(Those who never submitted their registration details)</p>
								</div>

							</div>
						</div>
						<div className='headerr'>
							<h1>Search for jobs</h1>

						</div>
						<div className='jobcontainer'>
							<div>
								<h1>Enter Job Title</h1>
								<input type="text" placeholder='Searh by job title' className='containerinput' />

							</div>
							<div>
								<h1>Select Department </h1>
								<select name="" id="" placeholder='please select' className='containerinput'>
									<option value="">please select</option>
									<option value="">Academics</option>
									<option value="">Academics</option>
									<option value="">Academics</option>
									<option value="">Academics</option>
								</select>


							</div>
							<div>
								<h1>Select Location
								</h1>
								<select name="" id="" placeholder='please select' className='containerinput'>
									<option value="">please select</option>
									<option value="">Academics</option>
									<option value="">Academics</option>
									<option value="">Academics</option>
									<option value="">Academics</option>
								</select>

							</div>
							<div>
								<h1>Select Experience Range (Years)
								</h1>
								<div className='fromto'>
									<div>

										<select name="" id="" placeholder='please select' className='containerinput'>
											<option value="">From</option>
											<option value="">1</option>
											<option value="">2</option>
											<option value="">3</option>
											<option value="">4</option>
										</select>

									</div>
									<div>

										<select name="" id="" placeholder='please select' className='containerinput'>
											<option value="">To</option>
											<option value="">1</option>
											<option value="">2</option>
											<option value="">3</option>
											<option value="">4</option>
										</select>

									</div>


								</div>


							</div>
						</div>
						<div className='serachh'>
							<div className='searchh1'>
								<h1>Select Employee Type</h1>
								<div className='search3'>
									<div>
										<select name="" id="" placeholder='please select' className='containerinput'>
											<option value="">please select</option>
											<option value="">member</option>

										</select>

									</div>
									<div className='iconss'>
										<BiSearch />
									</div>
								</div>


							</div>

						</div>
						<div>
							<div className='current'>
								<h1>Current Openings</h1>
								<p>Thanks for checking out our job openings. If you don’t see any open positions, please submit your resume & we will get back to you if there are any suitable openings that match your profile apply here
								</p>
								<div className='current1'>
									<p>42 results</p>
									<p>
										<span>Show:</span>
									</p>

								</div>
							</div>
						</div>
					</div>
					<table className='tabaledata'>
						<thead>

							<tr>
								<th className='brder'>Job title</th>
								<th className='brder'>Department</th>
								<th className='brder'>Location	</th>
								<th className='brder'>Employee Type	</th>
								<th className='brder'>Job posted on	</th>
							</tr>
						</thead>
						<tbody>

							<tr >
								<td className='datatable'>English Teacher</td>
								<td className='datatable'>Edtech Name Academy - English</td>
								<td className='datatable'>Delhi</td>
								<td className='datatable'>Member</td>
								<td className='datatable'>May 2, 2023</td>
							</tr>
							<tr >
								<td className='datatable'>Math's Teacher</td>
								<td className='datatable'>Edtech Name Academy - Mathematics</td>
								<td className='datatable'>Multiple locations</td>
								<td className='datatable'>New Delhi</td>
								<td className='datatable'>May 2, 2023</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='application'>
					<Link to="/application">Application</Link>
					<Link to="/profile">Profile</Link>
				</div>
			</div>

		</Base>
	)
}

export default Careers