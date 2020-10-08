import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarContainer = () => {
  const [date, setDate] = useState(new Date());

  // Set date to whatever date the user selects on the calendar
  const onChange = date => {
    setDate(date);
    console.log(date.toString().split(" ").splice(0, 4).join(" "));
  }

  return (
    <section id="schedule-container" className="col-sm-11 col-md-10 mx-auto py-4 px-0">
      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="location">Location:&nbsp;</label>
          <select name="location" id="location-select">
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
            <option value="Location 4">Location 4</option>
            <option value="Location 5">Location 5</option>
          </select>
          <label htmlFor="location" className="ml-4">Wash Type:&nbsp;</label>
          <select name="location" id="location-select">
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
            <option value="Type 4">Type 4</option>
            <option value="Type 5">Type 5</option>
          </select>
        </div>
      </div>
      <div className="row mx-auto">
        <div id="calendar-container" className="col-sm-6 mx-auto d-flex justify-content-center p-0">
          <Calendar
            onChange={onChange}
            value={date}
          />
          {/* Wash Schedule - {date.toString().split(" ").splice(0, 4).join(" ")} */}
        </div>
        <div className="col-sm-6 st">
          <h6>Wednesday, August 12th</h6>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
          <h1>a</h1>
        </div>
      </div>
    </section>
  )
}

export default CalendarContainer
