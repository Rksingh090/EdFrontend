import React, { useEffect, useState } from 'react';

import TeacherSidebar from '../../components/base/TeacherSidebar'
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/utils/ModalForm';
import { addNewEvent, getAllMonthEvents } from '../../reducers/CalendarReducers';

import '../styles/teacher.css';

const CalendarEvents = () => {

    const dispatch = useDispatch();
    const { events } = useSelector(state => state.calendar);
    const [eventList, setEventsLists] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [newEventData, setNewEventData] = useState({
        event_name: "",
        event_type: "assignment",
        event_date: new Date().toISOString().substring(0, 16),
        event_description: ""
    });

    const [addEventAction, setAddEventAction] = useState(false);


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

    useEffect(() => {
        setEventsLists(events);
    }, [events])

    const handleShowEventForm = () => {
        setAddEventAction(true)
    }

    const handleEventInput = (e) => {
        const { name, value } = e.target;
        let t = {}
        t[name] = value;
        setNewEventData({
            ...newEventData,
            ...t
        })
    }



    const isValidDate = (date) => {
        const now = new Date().getTime();
        const ev_date = new Date(date).getTime()
        if (ev_date < now) {
            return false;
        }
        return true;

    }

    const handleDateTimeChange = (e) => {
        const { value } = e.target;
        if (!isValidDate(value)) {
            alert("Invalid date time: select future date")
        } else {
            handleEventInput(e);
        }
    }

    const handleAddEvent = () => {
        if (!isValidDate(newEventData.event_date)) {
            alert("Please select valid date.")
            return;
        }
        dispatch(addNewEvent(newEventData))
        setNewEventData({
            ...newEventData,
            event_name: "",
            event_type: "assignment",
            event_description: ""
        })
        setAddEventAction(false);
    }

    useEffect(() => {
        const date = new Date();
        dispatch(getAllMonthEvents({ year: date.getFullYear(), month: date.getMonth() }))
    }, [dispatch])

    return (
        <TeacherSidebar>
            <div className='allEventsWithDate'>

                {/* add event form  */}
                <ModalForm visible={addEventAction}>
                    <div className='addEventContainer'>
                        <div className='inputDivs'>
                            <label htmlFor="event_name">Event Name</label>
                            <input value={newEventData.event_name} onChange={handleEventInput} type="text" id="event_name" placeholder='eg. Conferences' name="event_name" />
                        </div>
                        <div className='inputDivs'>
                            <label htmlFor="event_date">Event Date</label>
                            <input
                                onChange={handleDateTimeChange}
                                type="datetime-local"
                                value={newEventData.event_date}
                                id="event_date" name="event_date" />
                        </div>
                        <div className='inputDivs'>
                            <label htmlFor="event_type">Event Type</label>
                            <select id="event_type" defaultValue={newEventData.event_type || "assignment"} name="event_type" onChange={handleEventInput}>
                                <option value="assignment">Assignment</option>
                                <option value="quiz">Quiz</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='inputDivs'>
                            <label htmlFor="event_description">Event Description</label>
                            <textarea value={newEventData.event_description} id="event_description" onChange={handleEventInput} name="event_description" rows={5} placeholder='Event description goes here..'>

                            </textarea>
                        </div>
                        <div className='addeventActionBTNs'>
                            <button className='cancle' onClick={() => setAddEventAction(false)}>cancel</button>
                            <button className='submit' onClick={handleAddEvent}>submit</button>
                        </div>
                    </div>
                </ModalForm>
                <div className='calendar searchBar'>
                    <div className='searchDiv'>
                        <input type="text" placeholder='search....' value={searchInput} onChange={({ target }) => handleEventSearch(target.value)} />
                    </div>
                    <div className='addEventsBTN'>
                        <button onClick={handleShowEventForm}>Add Event</button>
                    </div>
                </div>
                {eventList.length > 0 &&
                    eventList.filter(date => date.day !== "_" && date.events?.length > 0)
                        .sort((a, b) => {
                            const dateA = new Date(a._id).getTime()
                            const dateB = new Date(b._id).getTime()
                            return dateA - dateB
                        })
                        .map((date) => {
                            return (
                                <div className='dateEvents' key={date._id}>
                                    <h2>Date: {date._id}</h2>
                                    <div className='eventData'>
                                        {
                                            date.events.map((ev, ev_idx) => (
                                                <div key={ev_idx}>
                                                    <p>{ev.event_name}</p>
                                                    <p>{ev.event_type}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </TeacherSidebar>
    )
}

export default CalendarEvents