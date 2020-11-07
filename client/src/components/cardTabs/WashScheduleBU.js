import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from "react-redux";
import '../../css/syncfusion.css';
import Scheduler from "./layout/Scheduler";
import DraggableOrder from "./layout/DraggableOrder";
import { getWorkOrdersOfLocation, getWorkOrders, updateWorkOrderStatus, unscheduleWorkOrder } from "../../actions/workOrders";

const WashSchedule = ({ updateWorkOrderStatus, unscheduleWorkOrder, getWorkOrdersOfLocation, getWorkOrders, location: { selectedLocation }, workOrders, washTypes, user: { terminals } }) => {
  const [displayCal, setDisplayCal] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateZeroed, setDateZeroed] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);
  const [bayOneOpen, setbayOneOpen] = useState(true);
  const [bayTwoOpen, setbayTwoOpen] = useState(true);
  const [bayOneS2Open, setbayOneS2Open] = useState(true);
  const [bayTwoS2Open, setbayTwoS2Open] = useState(true);
  const [yearVal, setYearVal] = useState();
  const [monthVal, setMonthVal] = useState();
  const [dayVal, setDayVal] = useState();
  const [monthDisplay, setMonthDisplay] = useState();
  const [weekdayDisplay, setWeekdayDisplay] = useState();
  const [dateStr, setDateStr] = useState();

  const [bayOneStartHr, setBayOneStartHr] = useState();
  const [bayTwoStartHr, setBayTwoStartHr] = useState();
  const [bayOneS2StartHr, setBayOneS2StartHr] = useState();
  const [bayTwoS2StartHr, setBayTwoS2StartHr] = useState();
  const [startHrStr, setStartHrStr] = useState();
  const [endHrStr, setEndHrStr] = useState();
  const [startHrStrB1S1, setStartHrStrB1S1] = useState();
  const [endHrStrB1S1, setEndHrStrB1S1] = useState();
  const [startHrStrB1S2, setStartHrStrB1S2] = useState();
  const [endHrStrB1S2, setEndHrStrB1S2] = useState();
  const [startHrStrB2S1, setStartHrStrB2S1] = useState();
  const [endHrStrB2S1, setEndHrStrB2S1] = useState();
  const [startHrStrB2S2, setStartHrStrB2S2] = useState();
  const [endHrStrB2S2, setEndHrStrB2S2] = useState();
  const [bayOneEndHr, setBayOneEndHr] = useState();
  const [bayTwoEndHr, setBayTwoEndHr] = useState();
  const [bayOneS2EndHr, setBayOneS2EndHr] = useState();
  const [bayTwoS2EndHr, setBayTwoS2EndHr] = useState();

  const [bayOneS1Type, setBayOneS1Type] = useState();
  const [bayOneS2Type, setBayOneS2Type] = useState();
  const [bayTwoS1Type, setBayTwoS1Type] = useState();
  const [bayTwoS2Type, setBayTwoS2Type] = useState();

  const [scheduledWorkOrders, setScheduledWorkOrders] = useState();
  const [unscheduledWorkOrders, setUnscheduledWorkOrders] = useState();
  const [events, setEvents] = useState();
  const [neededDateAlert, setNeededDateAlert] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");
  const [bayOneEndHrStr, setBayOneEndHrStr] = useState();
  const [bayTwoEndHrStr, setBayTwoEndHrStr] = useState();

  const [disableMove, setDisableMove] = useState(false);
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [woResources, setWoResources] = useState();

  const configureOpen = date => {
    setDayVal(date.toString().split(" ")[2]);
    setYearVal(date.toString().split(" ")[3]);
    if (date.toString().split(" ")[1] === "Jan") {
      setMonthVal("01");
      setMonthDisplay("January");
      setDateStr(`${date.toString().split(" ")[3]}-01-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Feb") {
      setMonthVal("02");
      setMonthDisplay("February");
      setDateStr(`${date.toString().split(" ")[3]}-02-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Mar") {
      setMonthVal("03");
      setMonthDisplay("March");
      setDateStr(`${date.toString().split(" ")[3]}-03-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Apr") {
      setMonthVal("04");
      setMonthDisplay("April");
      setDateStr(`${date.toString().split(" ")[3]}-04-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "May") {
      setMonthVal("05");
      setMonthDisplay("May");
      setDateStr(`${date.toString().split(" ")[3]}-05-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Jun") {
      setMonthVal("06");
      setMonthDisplay("June");
      setDateStr(`${date.toString().split(" ")[3]}-06-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Jul") {
      setMonthVal("07");
      setMonthDisplay("July");
      setDateStr(`${date.toString().split(" ")[3]}-07-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Aug") {
      setMonthVal("08");
      setMonthDisplay("August");
      setDateStr(`${date.toString().split(" ")[3]}-08-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Sep") {
      setMonthVal("09");
      setMonthDisplay("September");
      setDateStr(`${date.toString().split(" ")[3]}-09-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Oct") {
      setMonthVal("10");
      setMonthDisplay("October");
      setDateStr(`${date.toString().split(" ")[3]}-10-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Nov") {
      setMonthVal("11");
      setMonthDisplay("November");
      setDateStr(`${date.toString().split(" ")[3]}-11-${date.toString().split(" ")[2]}`);
    }
    if (date.toString().split(" ")[1] === "Dec") {
      setMonthVal("12");
      setMonthDisplay("December");
      setDateStr(`${date.toString().split(" ")[3]}-12-${date.toString().split(" ")[2]}`);
    }

    let bayOne;
    let bayTwo;

    if (date.toString().split(" ")[0] === "Mon") {
      bayOne = selectedLocation.bayOneHours.monday;
      bayTwo = selectedLocation.bayTwoHours.monday;
      setWeekdayDisplay("Monday");
    } else if (date.toString().split(" ")[0] === "Tue") {
      bayOne = selectedLocation.bayOneHours.tuesday;
      bayTwo = selectedLocation.bayTwoHours.tuesday;
      setWeekdayDisplay("Tuesday");
    } else if (date.toString().split(" ")[0] === "Wed") {
      bayOne = selectedLocation.bayOneHours.wednesday;
      bayTwo = selectedLocation.bayTwoHours.wednesday;
      setWeekdayDisplay("Wednesday");
    } else if (date.toString().split(" ")[0] === "Thu") {
      bayOne = selectedLocation.bayOneHours.thursday;
      bayTwo = selectedLocation.bayTwoHours.thursday;
      setWeekdayDisplay("Thursday");
    } else if (date.toString().split(" ")[0] === "Fri") {
      bayOne = selectedLocation.bayOneHours.friday;
      bayTwo = selectedLocation.bayTwoHours.friday;
      setWeekdayDisplay("Friday");
    } else if (date.toString().split(" ")[0] === "Sat") {
      bayOne = selectedLocation.bayOneHours.saturday;
      bayTwo = selectedLocation.bayTwoHours.saturday;
      setWeekdayDisplay("Saturday");
    } else if (date.toString().split(" ")[0] === "Sun") {
      bayOne = selectedLocation.bayOneHours.sunday;
      bayTwo = selectedLocation.bayTwoHours.sunday;
      setWeekdayDisplay("Sunday");
    }

    let startStr;
    let endStr;
    
    // If there's one bay and it's closed, or if there are two bays and they're both closed, set isOpen to false
    if ((selectedLocation.wash_bays === 1 && !bayOne.is_open) || (selectedLocation.wash_bays === 2 && !bayOne.is_open && !bayTwo.is_open)) { 
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    // // Set bay one start and end hrs
    // setStartHrStrB1S1(bayOne.shift_one_start);
    // setEndHrStrB1S1(bayOne.shift_one_end);

    // if (bayOne.shift_two_open) {
    //   setStartHrStrB1S2(bayOne.shift_two_start);
    //   setEndHrStrB1S2(bayOne.shift_two_end);
    // }

    // // Set bay two start and end hrs
    // setStartHrStrB2S1(bayOne.shift_one_start);
    // setEndHrStrB2S1(bayOne.shift_one_end);

    // if (bayTwo.shift_two_open) {
    //   setStartHrStrB2S2(bayTwo.shift_two_start);
    //   setEndHrStrB2S2(bayTwo.shift_two_end);
    // }

    if (bayOne.is_open) {
      setbayOneOpen(true);
      setStartHrStrB1S1(bayOne.shift_one_start);
      setEndHrStrB1S1(bayOne.shift_one_end);
    } else {
      setbayOneOpen(false)
    }
    if (bayOne.shift_two_open) {
      setbayOneS2Open(true);
      setStartHrStrB1S2(bayOne.shift_two_start);
      setEndHrStrB1S2(bayOne.shift_two_end);
    } else {
      setbayOneS2Open(false);
    }
    if (bayTwo.is_open) {
      setbayTwoOpen(true);
      setStartHrStrB2S1(bayTwo.shift_one_start);
      setEndHrStrB2S1(bayTwo.shift_one_end);
    } else {
      setbayTwoOpen(false)
    }
    if (bayTwo.shift_two_open) {
      setbayTwoS2Open(true);
      setStartHrStrB2S2(bayTwo.shift_two_start);
      setEndHrStrB2S2(bayTwo.shift_two_end);
    } else {
      setbayTwoS2Open(false);
    }

    // Set types
    setBayOneS1Type(bayOne.shift_one_type);
    setBayTwoS1Type(bayTwo.shift_one_type);
    setBayOneS2Type(bayOne.shift_two_type);
    setBayTwoS2Type(bayTwo.shift_two_type);

    // Set start hours for both shifts
    setBayOneStartHr(parseInt(bayOne.shift_one_start.split(":")[0]));
    setBayTwoStartHr(parseInt(bayTwo.shift_one_start.split(":")[0]));
    setBayOneS2StartHr(parseInt(bayOne.shift_two_start.split(":")[0]));
    setBayTwoS2StartHr(parseInt(bayTwo.shift_two_start.split(":")[0]));
    
    // Set end hours for both shifts
    // if it ends beyond the hour on the dot, set it to the next hour

    if (parseInt(bayOne.shift_one_end.split(":")[1]) > 0) {
      setBayOneEndHr(parseInt(bayOne.shift_one_end.split(":")[0]) + 1);
    } else {
      setBayOneEndHr(parseInt(bayOne.shift_one_end.split(":")[0]));
    }

    if (parseInt(bayTwo.shift_one_end.split(":")[1]) > 0) {
      setBayTwoEndHr(parseInt(bayTwo.shift_one_end.split(":")[0]) + 1);
    } else {
      setBayTwoEndHr(parseInt(bayTwo.shift_one_end.split(":")[0]));
    }

    if (parseInt(bayOne.shift_two_end.split(":")[1]) > 0) {
      setBayOneS2EndHr(parseInt(bayOne.shift_two_end.split(":")[0]) + 1);
    } else {
      setBayOneS2EndHr(parseInt(bayOne.shift_two_end.split(":")[0]));
    }

    if (parseInt(bayTwo.shift_two_end.split(":")[1]) > 0) {
      setBayTwoS2EndHr(parseInt(bayTwo.shift_two_end.split(":")[0]) + 1);
    } else {
      setBayTwoS2EndHr(parseInt(bayTwo.shift_two_end.split(":")[0]));
    }

    if (selectedLocation.wash_bays === 1) {
      setbayTwoOpen(false);
    }
  }

  const getStuff = async () => {
    if (selectedLocation) {
      // await getWorkOrdersOfLocation(selectedLocation.location_id);
      await getWorkOrders(terminals);
      configureOpen(date);
    }
  }

  useEffect(() => {
    
    if (terminals) {
      let resources = [];
      for (let i = 0; i < terminals.length; i++) {
        if (terminals[i].wash_bays === 2) {
          resources.push( {name: `${terminals[i].city}, ${terminals[i].state} - ${terminals[i].location_id}`, id: terminals[i].id, expanded: true, children: [
            { name: "Bay 1", id: `${terminals[i].location_id}1` },
            { name: "Bay 2", id: `${terminals[i].location_id}2` }
          ]});
        } else {
          resources.push( {name: `${terminals[i].city}, ${terminals[i].state}`, id: `${terminals[i].location_id}1`, expanded: true, children: [
            { name: "Bay 1", id: `${terminals[i].location_id}1` }
          ]});
        }
      }
      setWoResources(resources);
    }


    // resources={ selectedLocation.wash_bays === 2 ? [
    //   {name: `${selectedLocation.city}, ${selectedLocation.state}`, id: selectedLocation.id, expanded: true, children: [
    //     { name: "Bay 1", id: `${selectedLocation.location_id}1` },
    //     { name: "Bay 2", id: `${selectedLocation.location_id}2` }
    //   ]}
    // ] : [
    //   {name: `${selectedLocation.city}, ${selectedLocation.state}`, id: selectedLocation.id, expanded: true, children: [
    //     { name: "Bay 1", id: `${selectedLocation.location_id}1` },
    //   ]}
    // ]}
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    setTodaysDate(today);
    if (selectedLocation) {
      getStuff();
    }
  }, [selectedLocation, washTypes.washTypes]);

  // Set date to whatever date the user selects on the calendar
  const onDateChange = date => {
    setDate(date);
    let dz = new Date(date);
    dz.setHours(0, 0, 0, 0);
    setDateZeroed(dz);
    if (selectedLocation) configureOpen(date);
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

  const onUnschedule = id => unscheduleWorkOrder(id, selectedLocation.location_id, terminals);

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
  
  const preventTimeExceed = () => {
    // getWorkOrdersOfLocation(selectedLocation.location_id);
    getWorkOrders(terminals);
    
    // setNeededDateAlert(neededDateStr);
    setAlertDisplay("block");
    setTimeout(() => {
      setAlertDisplay("none");
    }, 5000);
  }

  const test = (id, resource, start, end) => {
    updateWorkOrderStatus(id, resource, start, end, selectedLocation.location_id, terminals);
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
            <button disabled={!isOpen || !selectedLocation ? true : false} id="date-confirm-btn" className="btn" onClick={onDateConfirm}>
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
              )}
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
          <div style={{display: alertDisplay}} className="alert alert-danger my-0 rounded-0 text-center">
            {/* This wash must be completed no later than {neededDateAlert} */}
          The end of a wash cannot exceed the end of a shift
          </div>
          {/* 2 BAYS AND BOTH OPEN */}
            {/* {selectedLocation.wash_bays === 2 && bayOneOpen && bayTwoOpen ? */}
            {bayOneOpen || bayTwoOpen ?
            <div>
              <div>
                <div className="col-12 px-0 aa">
                  <Scheduler
                    key={1}
                    bayOneS1Type={bayOneS1Type}
                    bayOneS2Type={bayOneS2Type}
                    bayTwoS1Type={bayTwoS1Type}
                    bayTwoS2Type={bayTwoS2Type}
                    dateStr={dateStr}
                    bay={1}
                    disableMove={disableMove}
                    startHr={bayOneStartHr}
                    endHr={bayOneEndHr}
                    endHrStr={
                      bayOneEndHr.toString().length === 1 ?
                      `${dateStr}T0${bayOneEndHr}:00:00` :
                      `${dateStr}T${bayOneEndHr}:00:00`
                    }
                    test={test}
                    preventSave={preventSave}
                    preventTimeExceed={preventTimeExceed}
                    onUnschedule={onUnschedule}
                    workOrders={workOrders.workOrders}
                    unscheduledWorkOrders={
                      workOrders.workOrders.filter(wo =>
                        // (!wo.is_scheduled
                        (!wo.is_scheduled
                          // && wo.wash_location_id === selectedLocation.location_id
                          // && new Date(wo.needed_date.split("T")[0]) >= new Date(dateStr)
                        )
                      )
                    }
                    resources={ woResources }
                    // resources={ selectedLocation.wash_bays === 2 ? [
                    //   {name: `${selectedLocation.city}, ${selectedLocation.state}`, id: selectedLocation.id, expanded: true, children: [
                    //     { name: "Bay 1", id: `${selectedLocation.location_id}1` },
                    //     { name: "Bay 2", id: `${selectedLocation.location_id}2` }
                    //   ]}
                    // ] : [
                    //   {name: `${selectedLocation.city}, ${selectedLocation.state}`, id: selectedLocation.id, expanded: true, children: [
                    //     { name: "Bay 1", id: `${selectedLocation.location_id}1` },
                    //   ]}
                    // ]}
                    events={
                      workOrders.workOrders.filter(wo =>
                      (wo.is_scheduled)
                    )}
                    city={selectedLocation.city}
                    state={selectedLocation.state}
                    resource1={`${selectedLocation.location_id}1`}
                    resource2={`${selectedLocation.location_id}2`}
                    bays={selectedLocation.wash_bays}
                    bayOneOpen={bayOneOpen}
                    bayTwoOpen={bayTwoOpen}
                    bayOneS2Open={bayOneS2Open}
                    bayTwoS2Open={bayTwoS2Open}
                    startHrStrB1S1 = {new Date(`${dateStr}T${startHrStrB1S1}`)}
                    startHrStrB1S2 = {startHrStrB1S2 && new Date(`${dateStr}T${startHrStrB1S2}`)}
                    startHrStrB2S1 = {new Date(`${dateStr}T${startHrStrB2S1}`)}
                    startHrStrB2S2 = {startHrStrB2S2 && new Date(`${dateStr}T${startHrStrB2S2}`)}
                    endHrStrB1S1 = {new Date(`${dateStr}T${endHrStrB1S1}`)}
                    endHrStrB1S2 = {endHrStrB1S2 && new Date(`${dateStr}T${endHrStrB1S2}`)}
                    endHrStrB2S1 = {new Date(`${dateStr}T${endHrStrB2S1}`)}
                    endHrStrB2S2 = {endHrStrB2S2 && new Date(`${dateStr}T${endHrStrB2S2}`)}
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
