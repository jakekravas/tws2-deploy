import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from "react-redux";
import '../../css/syncfusion.css';
import Scheduler from "./layout/Scheduler";
import { getWorkOrdersOfLocation, getWorkOrders, updateWorkOrderStatus, unscheduleWorkOrder } from "../../actions/workOrders";

const WashSchedule = ({ updateWorkOrderStatus, unscheduleWorkOrder, getWorkOrdersOfLocation, getWorkOrders, location: { selectedLocation }, workOrders, washTypes, user: { terminals, hours } }) => {
  const [displayCal, setDisplayCal] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateZeroed, setDateZeroed] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);
  const [bayOneOpen, setbayOneOpen] = useState(true);
  const [bayTwoOpen, setbayTwoOpen] = useState(true);
  const [yearVal, setYearVal] = useState();
  const [dayVal, setDayVal] = useState();
  const [monthDisplay, setMonthDisplay] = useState();
  const [weekdayDisplay, setWeekdayDisplay] = useState();
  const [dateStr, setDateStr] = useState();

  const [events, setEvents] = useState();
  const [neededDateAlert, setNeededDateAlert] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  const [disableMove, setDisableMove] = useState(false);
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [woResources, setWoResources] = useState();
  const [hoursArr, setHoursArr] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [errorText, setErrorText] = useState();

  const [unschedWorkOrders, setUnschedWorkOrders] = useState();
  const [sortBy, setSortBy] = useState("needed date");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSortChange = (targVal) => {
    setSortBy(targVal);
  }

  const toggleAsc = () => {
    // setSortAsc(!sortAsc);
    if (sortAsc) {
      setSortAsc(false);
    } else {
      setSortAsc(true);
    }
  }

  const configureOpen = date => {
    setDayVal(date.toString().split(" ")[2]);
    setYearVal(date.toString().split(" ")[3]);
    if (date.toString().split(" ")[1] === "Jan") {
      setMonthDisplay("January");
      setDateStr(`${date.toString().split(" ")[3]}-01-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Feb") {
      setMonthDisplay("February");
      setDateStr(`${date.toString().split(" ")[3]}-02-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Mar") {
      setMonthDisplay("March");
      setDateStr(`${date.toString().split(" ")[3]}-03-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Apr") {
      setMonthDisplay("April");
      setDateStr(`${date.toString().split(" ")[3]}-04-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "May") {
      setMonthDisplay("May");
      setDateStr(`${date.toString().split(" ")[3]}-05-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Jun") {
      setMonthDisplay("June");
      setDateStr(`${date.toString().split(" ")[3]}-06-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Jul") {
      setMonthDisplay("July");
      setDateStr(`${date.toString().split(" ")[3]}-07-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Aug") {
      setMonthDisplay("August");
      setDateStr(`${date.toString().split(" ")[3]}-08-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Sep") {
      setMonthDisplay("September");
      setDateStr(`${date.toString().split(" ")[3]}-09-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Oct") {
      setMonthDisplay("October");
      setDateStr(`${date.toString().split(" ")[3]}-10-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Nov") {
      setMonthDisplay("November");
      setDateStr(`${date.toString().split(" ")[3]}-11-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Dec") {
      setMonthDisplay("December");
      setDateStr(`${date.toString().split(" ")[3]}-12-${date.toString().split(" ")[2]}`);
    }

    if (date.toString().split(" ")[0] === "Mon") {
      getStartAndEndTimes("Monday");
    } else if (date.toString().split(" ")[0] === "Tue") {
      getStartAndEndTimes("Tuesday");
    } else if (date.toString().split(" ")[0] === "Wed") {
      getStartAndEndTimes("Wednesday");
    } else if (date.toString().split(" ")[0] === "Thu") {
      getStartAndEndTimes("Thursday");
    } else if (date.toString().split(" ")[0] === "Fri") {
      getStartAndEndTimes("Friday");
    } else if (date.toString().split(" ")[0] === "Sat") {
      getStartAndEndTimes("Saturday");
    } else if (date.toString().split(" ")[0] === "Sun") {
      getStartAndEndTimes("Sunday");
    }
  }

  const getStuff = async () => {
    // if (selectedLocation) {
    if (terminals) {
      await getWorkOrders(terminals);
      configureOpen(date);
    }
  }

  useEffect(() => {
    // if (terminals) {
      
    //   let resources = [];

    //   for (let i = 0; i < terminals.length; i++) {
    //     if (terminals[i].wash_bays === 2) {
    //       resources.push( {name: `${terminals[i].city}, ${terminals[i].state} - ${terminals[i].location_id}`, id: terminals[i].id, expanded: true, children: [
    //         { name: "Bay 1", id: `${terminals[i].location_id}1` },
    //         { name: "Bay 2", id: `${terminals[i].location_id}2` }
    //       ]});
    //     } else {
    //       resources.push( {name: `${terminals[i].city}, ${terminals[i].state} - ${terminals[i].location_id}`, id: terminals[i].id, expanded: true, children: [
    //         { name: "Bay 1", id: `${terminals[i].location_id}1` }
    //       ]});
    //     }
    //   }
    //   // setting resources
    //   setWoResources(resources);
    // }

    resetResources();
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    setTodaysDate(today);
    // if (selectedLocation) {
    if (terminals) {
      getStuff();
    }
  }, [terminals, washTypes.washTypes]);

  // Set date to whatever date the user selects on the calendar
  const onDateChange = date => {
    setDate(date);
    let dz = new Date(date);
    dz.setHours(0, 0, 0, 0);
    setDateZeroed(dz);
    // if (selectedLocation) configureOpen(date);
    if (terminals) configureOpen(date);
  }

  const onDateConfirm = () => {
    // If you're viewing a day prior to today, disable editing of that day's schedule
    if (todaysDate > dateZeroed) {
      setDisableMove(true);
    } else {
      setDisableMove(false);
    }
    setDisplayCal(false);
  }

  const onUnschedule = id => unscheduleWorkOrder(id, terminals);

  const preventSave = (neededDateStr) => {
    // getWorkOrdersOfLocation(selectedLocation.location_id);
    getWorkOrders(terminals);
    
    // Display alert to let user know that order can't be scheduled at this time
    setNeededDateAlert(neededDateStr);
    setAlertDisplay("block");
    setTimeout(() => {
      setAlertDisplay("none");
    }, 5000);
  }
  
  const preventTimeExceed = (type) => {
    if (type === "loc") {
      // alert("Work orders must be scheduled be scheduled on their correct terminal");
      setErrorText("Work orders must be scheduled be scheduled on their correct terminal");
    } else if (type === "end") {
      // alert("The end of a work order cannot exceed the end of a shift");
      setErrorText("The end of a work order cannot exceed the end of a shift");
    } else if (type === "start") {
      // alert("The start of a work order cannot be before the start of a shift");
      setErrorText("The start of a work order cannot be before the start of a shift");
    } else if (type === "late") {
      // alert("The end of a work order cannot exceed its needed by date");
      setErrorText("The end of a work order cannot exceed its needed by date");
    }
    // getWorkOrdersOfLocation(selectedLocation.location_id);
    getWorkOrders(terminals);
    
    // setNeededDateAlert(neededDateStr);
    setAlertDisplay("block");
    setTimeout(() => {
      setAlertDisplay("none");
    }, 5000);
  }

  const displayWarning = type => {
    if (type === "late") {
      setErrorText("Warning: This work order is scheduled to end beyond its needed by date");
    }

    setAlertDisplay("block");
    setTimeout(() => {
      setAlertDisplay("none");
    }, 5000);
  }

  const loadWorkOrders = () => {
    if (terminals) {
      getWorkOrders(terminals);
    }
  }

  const resetResources = () => {
    if (terminals) {
      const resources = [];
  
      for (let i = 0; i < terminals.length; i++) {
        if (terminals[i].wash_bays === 2) {
          resources.push( {name: `${terminals[i].city}, ${terminals[i].state} - ${terminals[i].location_id}`, id: terminals[i].id, expanded: true, children: [
            { name: "Bay 1", id: `${terminals[i].location_id}1` },
            { name: "Bay 2", id: `${terminals[i].location_id}2` }
          ]});
        } else {
          resources.push( {name: `${terminals[i].city}, ${terminals[i].state} - ${terminals[i].location_id}`, id: terminals[i].id, expanded: true, children: [
            { name: "Bay 1", id: `${terminals[i].location_id}1` }
          ]});
        }
      }
      // setting resources
      setWoResources(resources); 
    }
  }
  
  const changeResources = washLocationId => {
    const resources = [];

    for (let i = 0; i < terminals.length; i++) {
      if (terminals[i].wash_bays === 2 && terminals[i].location_id === washLocationId) {
        resources.push( {name: `${terminals[i].city}, ${terminals[i].state} - ${terminals[i].location_id}`, id: terminals[i].id, expanded: true, children: [
          { name: "Bay 1", id: `${terminals[i].location_id}1` },
          { name: "Bay 2", id: `${terminals[i].location_id}2` }
        ]});
      } else if (terminals[i].wash_bays === 1 && terminals[i].location_id === washLocationId) {
        resources.push( {name: `${terminals[i].city}, ${terminals[i].state} - ${terminals[i].location_id}`, id: terminals[i].id, expanded: true, children: [
          { name: "Bay 1", id: `${terminals[i].location_id}1` }
        ]});
      }
    }
    // setting resources
    setWoResources(resources);
  }

  const test = (id, resource, start, end) => {
    updateWorkOrderStatus(id, resource, start, end, terminals);
  }

  const getPreviousDay = () => {
    let prevDate = date;
    prevDate.setDate(prevDate.getDate() - 1);
    configureOpen(prevDate);
    setDate(prevDate);
  }
  
  const getNextDay = () => {
    let nextDate = date;
    nextDate.setDate(nextDate.getDate() + 1);
    configureOpen(nextDate);
    setDate(nextDate);
  }

  const getStartAndEndTimes = (day) => {
    
    let hrsArr = hours.filter(h => h.day === day);

    let s1HrsArr = hours.filter(h => h.is_open && !h.shift_two_open && h.day === day);

    let s2HrsArr = hours.filter(h => h.is_open && h.shift_two_open && h.day === day);
    
    let minStart;
    let maxEndS1;
    let maxEndS2;
    let maxEnd;
    
    if (s1HrsArr.length > 0) {

      // Get earliest shift one start time
      minStart = hrsArr.sort((a, b) => (a.shift_one_start > b.shift_one_start) ? 1 : -1)[0].shift_one_start;

      // Get latest shift one end time
      maxEndS1 = s1HrsArr.sort((a, b) => (a.shift_one_end < b.shift_one_end) ? 1 : -1)[0];

      // If there are any shift 2s
      if (s2HrsArr.length > 0) {

        // Get latest shift two end time
        maxEndS2 = s2HrsArr.sort((a, b) => (a.shift_two_end < b.shift_two_end) ? 1 : -1)[0];

        // Set maxEnd to the later of the two max end times
        if (maxEndS2.shift_two_end > maxEndS1.shift_one_end) {
          maxEnd = maxEndS2.shift_two_end
        } else {
          maxEnd = maxEndS1.shift_one_end
        }

      // If there are no shift 2s
      } else {
        maxEnd = maxEndS1.shift_one_end;
      }

      setStartTime(minStart);
      setEndTime(maxEnd);
    }
    
    setHoursArr(hrsArr);
    setWeekdayDisplay(day);
  }

  return (
    <div>
      {
        displayCal ?
        <section>
          <Calendar
            onChange={onDateChange}
            value={date}
            className="mx-auto"
          />
          <div className="text-center">
            {/* <button disabled={ !terminals || workOrders.workOrders.length === 0 ? true : false } id="date-confirm-btn" className="btn" onClick={onDateConfirm}> */}
            <button disabled={ !terminals || !workOrders.workOrders ? true : false } id="date-confirm-btn" className="btn" onClick={onDateConfirm}>
            {/* <button disabled={ !terminals ? true : false } id="date-confirm-btn" className="btn" onClick={onDateConfirm}> */}
              <span>
                View Schedule For {date && date.toString().split(" ").splice(0, 4).join(" ")}
              </span>
            {/* <button disabled={!isOpen || !selectedLocation ? true : false} id="date-confirm-btn" className="btn" onClick={onDateConfirm}>
              {!selectedLocation ? (
                <span>
                  Select a location to view schedule
                </span>
              ) : selectedLocation && isOpen ? (
                <span>
                  View Schedule For {date && date.toString().split(" ").splice(0, 4).join(" ")}
                </span>
              ) : (
                <span>
                  Closed on {date && date.toString().split(" ").splice(0, 4).join(" ")}
                </span>
              )} */}
            </button>
          </div>
        </section>
        :
        <section>
          <div className="date-header">
            <i className="fas fa-arrow-circle-left back-icon" onClick={() => setDisplayCal(true)}/>

            <div className="date-header-middle">
              <i className="fas fa-chevron-left chevron-icon" onClick={getPreviousDay}/>
              <div className="date-title">
                {`${weekdayDisplay}, ${monthDisplay} ${dayVal}, ${yearVal}`}
              </div>
              <i className="fas fa-chevron-right chevron-icon" onClick={getNextDay}/>
            </div>

            {/* Ghost element used for spacing purposes */}
            <span></span>
          </div>
          {/* <div style={{display: alertDisplay}} className="alert alert-danger my-0 rounded-0 text-center">
            {errorText}
          </div> */}
          {/* 2 BAYS AND BOTH OPEN */}
            {/* {selectedLocation.wash_bays === 2 && bayOneOpen && bayTwoOpen ? */}
            {bayOneOpen || bayTwoOpen ?
            <div>
              <div>
                <div className="col-12 px-0 aa">
                  <Scheduler
                    dateStr={dateStr}
                    terminals={terminals}
                    bay={1}
                    disableMove={disableMove}
                    test={test}
                    preventSave={preventSave}
                    preventTimeExceed={preventTimeExceed}
                    displayWarning={displayWarning}
                    loadWorkOrders={loadWorkOrders}
                    onUnschedule={onUnschedule}
                    changeResources={changeResources}
                    resetResources={resetResources}
                    workOrders={workOrders.workOrders}
                    unscheduledWorkOrders={
                      workOrders.workOrders.filter(wo =>
                        (!wo.is_scheduled
                          // && wo.wash_location_id === selectedLocation.location_id
                          // && new Date(wo.needed_date.split("T")[0]) >= new Date(dateStr)
                        )
                      )
                      // workOrders.workOrders.filter(wo =>
                      //   (!wo.is_scheduled
                      //     // && wo.wash_location_id === selectedLocation.location_id
                      //     // && new Date(wo.needed_date.split("T")[0]) >= new Date(dateStr)
                      //   )
                      // ).sort((a, b) => (new Date(a.needed_date) > new Date(b.needed_date)) ? 1 : -1)
                    }
                    resources={ woResources }
                    events={
                      workOrders.workOrders.filter(wo =>
                      (wo.is_scheduled)
                    )}
                    day={weekdayDisplay}
                    hoursArr={hoursArr}
                    startTime={new Date(`${dateStr}T${startTime}`)}
                    endTime={new Date(`${dateStr}T${endTime}`)}
                    // handleSort={handleSort}
                    handleSortChange={handleSortChange}
                    toggleAsc={toggleAsc}
                    sortBy={sortBy}
                    sortAsc={sortAsc}
                    alertDisplay={alertDisplay}
                    errorText={errorText}
                  />
                </div>
              </div>
            </div>
            :
            <span></span>
            }
            {!bayOneOpen && !bayTwoOpen &&
            <div>
              <h6 className="text-center text-dark my-5">
                Closed on this date
              </h6>
            </div>
            }
        </section>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  location: state.location,
  workOrders: state.workOrders,
  washTypes: state.washTypes,
  user: state.user
})

export default connect(mapStateToProps, { getWorkOrdersOfLocation, getWorkOrders, updateWorkOrderStatus, unscheduleWorkOrder })(WashSchedule)
