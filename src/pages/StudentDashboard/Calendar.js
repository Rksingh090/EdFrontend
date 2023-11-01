import React, { useEffect, useState } from 'react'
import TeacherSidebar from '../../components/base/TeacherSidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMonthEvents } from '../../reducers/CalendarReducers';
import '../styles/student.css';
import SelectOption from '../../components/utils/SelectOption';
import IconByItemType from '../../components/utils/IconByItemType';

const Calendar = () => {
	const dispatch = useDispatch();
	const { events } = useSelector(state => state.calendar);

	const [searchInput, setSearchInput] = useState("")

	const [monthDays, setMonthDays] = useState([]);
	const [eventList, setEventsLists] = useState([]);

	const [currentMonth, setCurrentMonth] = useState()
	const [currentYear, setCurrentYear] = useState()

	const [selectedDate, setSelectedDate] = useState({});

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


	const getYears = () => {
		let years = [];
		for (let i = 1950; i <= 2050; i++) {
			years.push(i);
		}
		return years;
	}

	useEffect(() => {
		setCurrentMonth(new Date().getMonth())
		setCurrentYear(new Date().getFullYear())
	}, [])


	useEffect(() => {
		setSelectedDate({});
		const yearMonthDates = new Date(currentYear, Number(currentMonth) + 1, 0);
		const dates = yearMonthDates.getDate();

		const firstDay = new Date(currentYear, currentMonth, 1);
		const dayOfDate = firstDay.getDay();


		let dateArray = [];
		if (dayOfDate === 0) {
			dateArray = [{ day: "_" }, { day: "_" }, { day: "_" }, { day: "_" }, { day: "_" }, { day: "_" }]
		} else {
			for (let i = 1; i < dayOfDate; i++) {
				dateArray.push({ day: "_" })
			}
		}

		for (let i = 1; i <= dates; i++) {
			let dayDigit = i + "";
			if (Number(i) < 10) {
				dayDigit = "0" + i;
			}
			let monthDigit = (Number(currentMonth) + 1);
			if (Number(currentMonth) < 9) {
				monthDigit = "0" + String(monthDigit);
			}
			dateArray.push({
				day: i,
				_id: currentYear + "-" + monthDigit + "-" + dayDigit
			});
		}
		setMonthDays(dateArray)
	}, [currentYear, currentMonth])



	useEffect(() => {
		if (currentYear !== undefined && currentMonth !== undefined) {
			dispatch(getAllMonthEvents({ year: currentYear, month: currentMonth }))
		}
	}, [currentYear, currentMonth, dispatch])

	useEffect(() => {
		if (events.length <= 0) {
			setEventsLists([]);
			return;
		};
		let eventData = [];

		monthDays.forEach((dates) => {
			if (dates.day === "_") {
				eventData.push(dates);
			}
			else {
				let addData = {
					...dates,
				}
				let findEvent = events.filter((ev) => ev._id === dates._id)[0];
				addData.events = findEvent?.events || [];
				eventData.push(addData);
			}
		})
		setMonthDays([...eventData]);
		setEventsLists([...eventData]);
	}, [events])

	const handleDateSelect = (date) => {
		setSelectedDate(date);
		const findDateEvent = events.filter((event) => event._id === date._id)[0];
		if (!findDateEvent) {
			setEventsLists([]);
			return;
		}
		setEventsLists([findDateEvent]);
	}

	const handleEventSearch = (searchKey) => {
		setSearchInput(searchKey)
		let allEventData = [];
		for (let i = 0; i < events.length; i++) {
			const { events: eventArray, ...restData } = events[i];
			const findData = events[i].events.filter((ev) => String(ev.event_name).toLocaleLowerCase().includes(String(searchKey).toLocaleLowerCase()));
			if (findData.length > 0) {
				let buildData = {
					...restData,
					events: findData
				}
				allEventData.push(buildData);
			}
		}
		setEventsLists(allEventData);
	}

	const clearFilter = () => {
		setEventsLists(events);
		setSearchInput("")
		setSelectedDate({})
	}


	return (
		<TeacherSidebar>
			<div className="SCalendarPage">

				<div className='font-[600] text-[20px]'>Calendar</div>
				<div className='pt-2 flex gap-8'>
					<SelectOption
						value={currentYear || new Date().getFullYear()}
						onChange={year => setCurrentYear(year)}
						options={getYears()}
						textField={""}
						valueField={""}
						maxHeight={"400px"}
						selectStyle={{
							width: "200px",
						}}
						style={{
							padding: "15px 10px"
						}}
					/>
					<SelectOption
						value={months[currentMonth] || months[new Date().getMonth()]}
						onChange={month => setCurrentMonth(months.indexOf(month))}
						options={months}
						textField={""}
						valueField={""}
						maxHeight={"400px"}
						style={{
							padding: "15px 10px"
						}}
						selectStyle={{
							width: "200px"
						}}
					/>
					{/* <select
					defaultValue={new Date().getMonth()}
					onChange={(e) => setCurrentMonth(e.target.value)}
					className='outline-none border-[1px] px-[10px] py-[10px] border-blue-600 rounded-lg scroll-m-14'>
					{months.map((month, idx) => {
						return (
							<option key={idx} value={idx} >{month}</option>
						)
					})}
				</select> */}
				</div>

				<div className='calendarGrid'>
					<div className='calendarWeekAndDate flex flex-col'>
						<div className='grid grid-cols-7'>
							<p className='dayHeader'>Mon</p>
							<p className='dayHeader'>Tue</p>
							<p className='dayHeader'>Wed</p>
							<p className='dayHeader'>Thu</p>
							<p className='dayHeader'>Fri</p>
							<p className='dayHeader'>Sat</p>
							<p className='dayHeader'>Sun</p>
						</div>
						<div className='grid grid-cols-7'>
							{monthDays.map((date, idx) => {
								let currentDate = new Date(Date.now()).toISOString().slice(0, 10);

								return (
									<div key={idx} className={`calendarDate w-full  border border-gray-200 flex justify-center items-center`}>
										{date.day === "_" ? (
											<p className='dateDay'></p>
										) : (
											<p
												onClick={() => handleDateSelect(date)}
												className={`dateDay orginalDay ${selectedDate._id === date._id ? "selectedDate" : ""} ${date.events?.length > 0 ? "eventDay" : ""} ${date._id === currentDate ? "currentDate" : ""}`}
											>
												{date.day}
											</p>
										)}
									</div>
								)
							})}
						</div>
					</div>


					<div className='allEventsWithDate'>
						<div className='calendar searchBar'>
							<div className='searchDiv'>
								<input type="text" placeholder='search....' value={searchInput} onChange={({ target }) => handleEventSearch(target.value)} />
							</div>
							<div className='filterResetBTN' onClick={clearFilter}>
								{Object.keys(selectedDate).includes("_id") || searchInput !== "" ? <button>Reset All</button> : ""}
							</div>
						</div>
						{eventList.length > 0 &&
							eventList
								.filter(date => date.day !== "_" && date.events?.length > 0)
								.map((date) => {
									return (
										<div className='dateEvents' key={date._id}>
											<h2>Date: {new Date(date._id).toLocaleDateString()}</h2>
											<div className='eventData'>
												{
													date.events.map((ev, ev_idx) => (
														<div key={ev_idx} title={ev.event_type} >
															<p>{ev.event_name}</p>
															<p><IconByItemType type={ev.event_type} /></p>
														</div>
													))
												}
											</div>
										</div>
									)
								})
						}
					</div>
				</div>
			</div>
		</TeacherSidebar>
	)
}

export default Calendar