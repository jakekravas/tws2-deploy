import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from "react-redux";
import '../../css/syncfusion.css';
import Scheduler from "./layout/Scheduler";
import { getWorkOrders, updateWorkOrderStatus, unscheduleWorkOrder, getLogsOfOrder, clearOrderLogs } from "../../actions/workOrders";

const WashSchedule = ({ updateWorkOrderStatus, unscheduleWorkOrder, getWorkOrders, getLogsOfOrder, clearOrderLogs, workOrders, washTypes, user: { terminals, hours, user } }) => {
  const [displayCal, setDisplayCal] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateZeroed, setDateZeroed] = useState(new Date());
  const [bayOneOpen, setbayOneOpen] = useState(true);
  const [bayTwoOpen, setbayTwoOpen] = useState(true);
  const [yearVal, setYearVal] = useState();
  const [dayVal, setDayVal] = useState();
  const [monthDisplay, setMonthDisplay] = useState();
  const [weekdayDisplay, setWeekdayDisplay] = useState();
  const [dateStr, setDateStr] = useState();
  const [leakDateStr, setLeakDateStr] = useState();
  const [useLeakDate, setUseLeakDate] = useState(false);

  const [neededDateAlert, setNeededDateAlert] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  const [disableMove, setDisableMove] = useState(false);
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [woResources, setWoResources] = useState();
  const [hoursArr, setHoursArr] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [errorText, setErrorText] = useState();
  const [schedulerLocation, setSchedulerLocation] = useState("All locations");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterWashId, setFilterWashId] = useState("");
  const [filterTrailerId, setFilterTrailerId] = useState("");
  const [filterIntWashType, setFilterIntWashType] = useState("");
  const [filterText, setFilterText] = useState("");

  const [sortBy, setSortBy] = useState("needed date");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSortChange = targVal => {
    setSortBy(targVal);
  }

  const toggleAsc = () => setSortAsc(!sortAsc)

  const configureOpen = date => {

    let leakDate = new Date(date);
    leakDate.setDate(leakDate.getDate() + 1)

    setDayVal(date.toString().split(" ")[2]);
    setYearVal(date.toString().split(" ")[3]);
    if (date.toString().split(" ")[1] === "Jan") {
      setMonthDisplay("January");
      setDateStr(`${date.toString().split(" ")[3]}-01-${date.toString().split(" ")[2]}`);
      
      if (date.toString().split(" ")[2] !== "31") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-01-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-02-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Feb") {
      setMonthDisplay("February");
      setDateStr(`${date.toString().split(" ")[3]}-02-${date.toString().split(" ")[2]}`);

      if (date.toString().split(" ")[2] !== "28") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-02-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-03-01`);
      }
    }
    if (date.toString().split(" ")[1] === "Mar") {
      setMonthDisplay("March");
      setDateStr(`${date.toString().split(" ")[3]}-03-${date.toString().split(" ")[2]}`);
      
      if (date.toString().split(" ")[2] !== "31") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-03-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-04-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Apr") {
      setMonthDisplay("April");
      setDateStr(`${date.toString().split(" ")[3]}-04-${date.toString().split(" ")[2]}`);

      if (date.toString().split(" ")[2] !== "30") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-04-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-05-01`);
      }

    }
    if (date.toString().split(" ")[1] === "May") {
      setMonthDisplay("May");
      setDateStr(`${date.toString().split(" ")[3]}-05-${date.toString().split(" ")[2]}`);
      
      if (date.toString().split(" ")[2] !== "31") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-05-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-06-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Jun") {
      setMonthDisplay("June");
      setDateStr(`${date.toString().split(" ")[3]}-06-${date.toString().split(" ")[2]}`);

      if (date.toString().split(" ")[2] !== "30") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-06-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-07-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Jul") {
      setMonthDisplay("July");
      setDateStr(`${date.toString().split(" ")[3]}-07-${date.toString().split(" ")[2]}`);

      if (date.toString().split(" ")[2] !== "31") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-07-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-08-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Aug") {
      setMonthDisplay("August");
      setDateStr(`${date.toString().split(" ")[3]}-08-${date.toString().split(" ")[2]}`);

      if (date.toString().split(" ")[2] !== "31") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-08-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-09-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Sep") {
      setMonthDisplay("September");
      setDateStr(`${date.toString().split(" ")[3]}-09-${date.toString().split(" ")[2]}`);
      
      if (date.toString().split(" ")[2] !== "30") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-09-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-10-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Oct") {
      setMonthDisplay("October");
      setDateStr(`${date.toString().split(" ")[3]}-10-${date.toString().split(" ")[2]}`);
      
      if (date.toString().split(" ")[2] !== "31") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-10-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-11-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Nov") {
      setMonthDisplay("November");
      setDateStr(`${date.toString().split(" ")[3]}-11-${date.toString().split(" ")[2]}`);

      if (date.toString().split(" ")[2] !== "30") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-11-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-12-01`);
      }

    }
    if (date.toString().split(" ")[1] === "Dec") {
      setMonthDisplay("December");
      setDateStr(`${date.toString().split(" ")[3]}-12-${date.toString().split(" ")[2]}`);

      if (date.toString().split(" ")[2] !== "31") {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-12-${leakDate.toString().split(" ")[2]}`);
      } else {
        setLeakDateStr(`${leakDate.toString().split(" ")[3]}-01-01`);
      }
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
    if (terminals) {
      await getWorkOrders(terminals);
      configureOpen(date);
    }
  }

  useEffect(() => {
    resetResources();
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    setTodaysDate(today);
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

  const onUnschedule = id => unscheduleWorkOrder(id, workOrders.workOrders, user);

  const preventSave = (neededDateStr) => {
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
      setErrorText("Work orders must be scheduled on their correct terminal");
    } else if (type === "end") {
      setErrorText("The end of a work order cannot exceed the end of a work day");
    } else if (type === "shift-end") {
      setErrorText("The end of a work order cannot exceed the end of a shift unless it leads directly into another shift");
    } else if (type === "start") {
      setErrorText("The start of a work order cannot be before the start of a shift");
    } else if (type === "late") {
      setErrorText("The end of a work order cannot exceed its needed by date");
    }
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
      setSchedulerLocation("All locations");
      setFilterLocation("");
      // setFilterText();
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
    setSchedulerLocation(washLocationId);
    setFilterLocation(washLocationId);
  }

  const changeLocationFilter = val => {
    setFilterLocation(val);
  }

  const changeWashIdFilter = val => {
    setFilterWashId(val);
  }

  const changeTrailerIdFilter = val => {
    setFilterTrailerId(val);
  }

  const changeIntWashTypeFilter = val => {
    setFilterIntWashType(val);
  }

  const changeFilterText = val => {
    setFilterLocation(val);
    setFilterText(val);
  }

  const test = (id, resource, start, end) => {
    updateWorkOrderStatus(id, resource, start, end, workOrders.workOrders, user);
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

    // IF THERE ARE NO LEAK SHIFTS, TAKE THE LATEST END TIME OF ALL SHIFTS (WHAT WE'RE DOING NOW)
    // IF THERE ARE ANY LEAK SHIFTS, TAKE THE LATEST END TIME OF THOSE LEAK SHIFTS
    
    let hrsArr = hours.filter(h => h.day === day);

    let s1HrsArr = hours.filter(h => h.is_open && !h.shift_two_open && h.day === day);

    let s2HrsArr = hours.filter(h => h.is_open && h.shift_two_open && h.day === day);
    
    let minStart;
    let maxEndS1;
    let maxEndS2;
    let maxEnd;
    
    let leakedArrS1 = [];
    let leakedArrS2 = [];
    
    if (s1HrsArr.length > 0) {

      // Get earliest shift one start time
      minStart = hrsArr.sort((a, b) => (a.shift_one_start > b.shift_one_start) ? 1 : -1)[0].shift_one_start;
      
      // Check for shift one end times beyond midnight
      leakedArrS1 = s1HrsArr.filter(h => h.shift_one_end < h.shift_one_start);
      
      if (leakedArrS1.length > 0) {
        // Get latest shift one end time of leaked
        maxEndS1 = leakedArrS1.sort((a, b) => (a.shift_one_end < b.shift_one_end) ? 1 : -1)[0];
        // setUseLeakDate(true);
      } else {
        // Get latest shift one end time
        maxEndS1 = s1HrsArr.sort((a, b) => (a.shift_one_end < b.shift_one_end) ? 1 : -1)[0];
      }

      // If there are any shift 2s
      if (s2HrsArr.length > 0) {

        // Check for shift two end times beyond midnight
        leakedArrS2 = s2HrsArr.filter(h => h.shift_two_end < h.shift_two_start);
        
        if (leakedArrS2.length > 0) {
          console.log('s2 leak');
          // Get latest shift two end time of leaked
          maxEndS2 = leakedArrS2.sort((a, b) => (a.shift_two_end < b.shift_two_end) ? 1 : -1)[0];
          // setUseLeakDate(true);
        } else {
          // Get latest shift two end time
          maxEndS2 = s2HrsArr.sort((a, b) => (a.shift_two_end < b.shift_two_end) ? 1 : -1)[0];
        }

        if ((leakedArrS1.length === 0 && leakedArrS2.length === 0) || (leakedArrS1.length > 0 && leakedArrS2.length > 0)) {
          // Set maxEnd to the later of the two max end times
          if (maxEndS2.shift_two_end > maxEndS1.shift_one_end) {
            maxEnd = maxEndS2.shift_two_end
          } else {
            maxEnd = maxEndS1.shift_one_end
          }
        } else if (leakedArrS1.length > 0 && leakedArrS2.length === 0) {
          maxEnd = maxEndS1.shift_one_end;
        } else if (leakedArrS1.length === 0 && leakedArrS2.length > 0) {
          maxEnd = maxEndS2.shift_two_end;
        }

      // If there are no shift 2s
      } else {
        maxEnd = maxEndS1.shift_one_end;
      }
      if (leakedArrS1.length > 0 || leakedArrS2.length > 0) {
        setUseLeakDate(true);
      } else {
        setUseLeakDate(false);
      }
      console.log(maxEnd);
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
            <button disabled={ !terminals || !workOrders.workOrders ? true : false } id="date-confirm-btn" className="btn" onClick={onDateConfirm}>
              <span>
                View Schedule For {date && date.toString().split(" ").splice(0, 4).join(" ")}
              </span>
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
            {bayOneOpen || bayTwoOpen ?
            <div>
              <div>
                <div className="col-12 px-0 aa">
                  <Scheduler
                    dateStr={dateStr}
                    leakDateStr={leakDateStr}
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
                        (!wo.is_scheduled)
                      )
                    }
                    resources={ woResources }
                    events={
                      workOrders.workOrders.filter(wo =>
                      (wo.is_scheduled)
                    )}
                    day={weekdayDisplay}
                    hoursArr={hoursArr}
                    allHoursArr={hours}
                    startTime={new Date(`${dateStr}T${startTime}`)}
                    // endTime={new Date(`${dateStr}T${endTime}`)}
                    endTime={useLeakDate ? new Date(`${leakDateStr}T${endTime}`) : new Date(`${dateStr}T${endTime}`)}
                    // handleSort={handleSort}
                    handleSortChange={handleSortChange}
                    toggleAsc={toggleAsc}
                    sortBy={sortBy}
                    sortAsc={sortAsc}
                    alertDisplay={alertDisplay}
                    errorText={errorText}
                    selectedLocation={schedulerLocation}
                    filterLocation={filterLocation}
                    filterWashId={filterWashId}
                    filterTrailerId={filterTrailerId}
                    filterIntWashType={filterIntWashType}
                    workOrderLogs={workOrders.workOrderLogs}
                    getLogsOfOrder={getLogsOfOrder}
                    clearOrderLogs={clearOrderLogs}
                    changeLocationFilter={changeLocationFilter}
                    changeWashIdFilter={changeWashIdFilter}
                    changeTrailerIdFilter={changeTrailerIdFilter}
                    changeIntWashTypeFilter={changeIntWashTypeFilter}
                    changeFilterText={changeFilterText}
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
  workOrders: state.workOrders,
  washTypes: state.washTypes,
  user: state.user
})

export default connect(mapStateToProps, { getWorkOrders, updateWorkOrderStatus, unscheduleWorkOrder, getLogsOfOrder, clearOrderLogs })(WashSchedule)
