import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from "react-redux";
import '../../css/syncfusion.css';
import Scheduler from "./layout/Scheduler";
import { getWorkOrdersOfLocation, updateWorkOrderStatus, unscheduleWorkOrder } from "../../actions/workOrders";

const CalendarSelect = ({ updateWorkOrderStatus, unscheduleWorkOrder, getWorkOrdersOfLocation, location: { selectedLocation, loading }, workOrders, washTypes }) => {
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

    // If there's one bay and it's closed, or if there are two bays and they're both closed, set isOpen to false
    if ((selectedLocation.washBays === 1 && !bayOne.isOpen) || (selectedLocation.washBays === 2 && !bayOne.isOpen && !bayTwo.isOpen)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    if (bayOne.isOpen) {
      setbayOneOpen(true)
    } else {
      setbayOneOpen(false)
    }
    if (bayOne.shift2) {
      setbayOneS2Open(true);
    } else {
      setbayOneS2Open(false);
    }
    if (bayTwo.isOpen) {
      setbayTwoOpen(true)
    } else {
      setbayTwoOpen(false)
    }
    if (bayTwo.shift2) {
      setbayTwoS2Open(true);
    } else {
      setbayTwoS2Open(false);
    }

    // Setting types
    setBayOneS1Type(bayOne.type);
    setBayTwoS1Type(bayTwo.type);
    setBayOneS2Type(bayOne.shift2Type);
    setBayTwoS2Type(bayTwo.shift2Type);

    // Setting start hours for both shifts
    setBayOneStartHr(parseInt(bayOne.start.split(":")[0]));
    setBayTwoStartHr(parseInt(bayTwo.start.split(":")[0]));
    setBayOneS2StartHr(parseInt(bayOne.shift2Start.split(":")[0]));
    setBayTwoS2StartHr(parseInt(bayTwo.shift2Start.split(":")[0]));
    
    // Setting end hours for both shifts
    // if it ends beyond the hour on the dot, set it to the next hour
    if (parseInt(bayOne.end.split(":")[1]) > 0) {
      setBayOneEndHr(parseInt(bayOne.end.split(":")[0]) + 1);
    } else {
      setBayOneEndHr(parseInt(bayOne.end.split(":")[0]));
    }

    if (parseInt(bayTwo.end.split(":")[1]) > 0) {
      setBayTwoEndHr(parseInt(bayTwo.end.split(":")[0]) + 1);
    } else {
      setBayTwoEndHr(parseInt(bayTwo.end.split(":")[0]));
    }

    if (parseInt(bayOne.shift2End.split(":")[1]) > 0) {
      setBayOneS2EndHr(parseInt(bayOne.shift2End.split(":")[0]) + 1);
    } else {
      setBayOneS2EndHr(parseInt(bayOne.shift2End.split(":")[0]));
    }

    if (parseInt(bayTwo.shift2End.split(":")[1]) > 0) {
      setBayTwoS2EndHr(parseInt(bayTwo.shift2End.split(":")[0]) + 1);
    } else {
      setBayTwoS2EndHr(parseInt(bayTwo.shift2End.split(":")[0]));
    }
  }

  const getStuff = async () => {
    if (selectedLocation) {
      await getWorkOrdersOfLocation(selectedLocation.location_id);
      configureOpen(date);
    }
  }

  useEffect(() => {
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

  const onUnschedule = id => {
    let isScheduled = false;
    unscheduleWorkOrder(id, isScheduled, selectedLocation.location_id);
  }

  const preventSave = (neededDateStr) => {
    getWorkOrdersOfLocation(selectedLocation.location_id);

    // Display alert to let user know that order can't be scheduled at this time
    setNeededDateAlert(neededDateStr);
    setAlertDisplay("block");
    setTimeout(() => {
      setAlertDisplay("none");
    }, 5000);
  }

  const test = (id, bay, start, end, duration) => {
    let startDate = new Date(start);
    let endDate = new Date(end);

    endDate.setMinutes( endDate.getMinutes() + duration );

    let startDateArr = startDate.toString().split(" ");
    let endDateArr = endDate.toString().split(" ");
    let month;

    if (startDateArr[1] === "Jan") month = "01";
    if (startDateArr[1] === "Feb") month = "02";
    if (startDateArr[1] === "Mar") month = "03";
    if (startDateArr[1] === "Apr") month = "04";
    if (startDateArr[1] === "May") month = "05";
    if (startDateArr[1] === "Jun") month = "06";
    if (startDateArr[1] === "Jul") month = "07";
    if (startDateArr[1] === "Aug") month = "08";
    if (startDateArr[1] === "Sep") month = "09";
    if (startDateArr[1] === "Oct") month = "10";
    if (startDateArr[1] === "Nov") month = "11";
    if (startDateArr[1] === "Dec") month = "12";

    let startStr = `${startDateArr[3]}-${month}-${startDateArr[2]}T${startDateArr[4]}`;
    let endStr = `${endDateArr[3]}-${month}-${endDateArr[2]}T${endDateArr[4]}`;

    let isScheduled = true;

    updateWorkOrderStatus(id, bay, startStr, endStr, isScheduled, selectedLocation.location_id);
  }

  const getPreviousDay = () => {
    let prevDate = date;
    prevDate.setDate(prevDate.getDate() - 1);
    configureOpen(prevDate);
    setDate(prevDate);
    // getWorkOrdersOfLocation(selectedLocation._id);
  }
  
  const getNextDay = () => {
    let prevDate = date;
    prevDate.setDate(prevDate.getDate() + 1);
    configureOpen(prevDate);
    setDate(prevDate);
    // getWorkOrdersOfLocation(selectedLocation._id);
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
              {`${weekdayDisplay}, ${monthDisplay} ${dayVal}, ${yearVal}`}
              <i className="fas fa-chevron-right chevron-icon" onClick={getNextDay}/>
            </div>

            <span></span>
          </div>
          <div style={{display: alertDisplay}} className="alert alert-danger my-0 rounded-0 text-center">
            This wash must be completed no later than {neededDateAlert}
          </div>
          {/* 2 BAYS AND BOTH OPEN */}
            {selectedLocation.washBays === 2 && bayOneOpen && bayTwoOpen ?
            <div>
              <div className="row mx-auto">
                <div className="col-6 px-0 aa">
                  <h6 className="text-center my-1">Bay 1, Shift 1 - {bayOneS1Type}</h6>
                  <Scheduler
                    key={1}
                    shiftType={bayOneS1Type}
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
                    onUnschedule={onUnschedule}
                    unscheduledWorkOrders={
                      workOrders.workOrders.filter(wo =>
                        (!wo.isScheduled
                          && wo.washLocationId === selectedLocation.location_id
                          && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                        )
                      )
                    }
                    events={
                      workOrders.workOrders.filter(wo =>
                      (wo.isScheduled && wo.bay === 1)
                    )}
                  />
                  {bayOneS2Open &&
                  <div>
                    <h6 className="text-center my-1">Bay 1, Shift 2 - {bayOneS2Type}</h6>
                    <Scheduler
                      key={2}
                      shiftType={bayOneS2Type}
                      dateStr={dateStr}
                      bay={1}
                      disableMove={disableMove}
                      startHr={bayOneS2StartHr}
                      endHr={bayOneS2EndHr}
                      endHrStr={
                        bayOneEndHr.toString().length === 1 ?
                        `${dateStr}T0${bayOneS2EndHr}:00:00` :
                        `${dateStr}T${bayOneS2EndHr}:00:00`
                      }
                      test={test}
                      preventSave={preventSave}
                      onUnschedule={onUnschedule}
                      unscheduledWorkOrders={
                        workOrders.workOrders.filter(wo =>
                          (!wo.isScheduled
                            && wo.washLocationId === selectedLocation.location_id
                            && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                          )
                        )
                      }
                      events={
                        workOrders.workOrders.filter(wo =>
                        (wo.isScheduled && wo.bay === 1)
                      )}
                    />
                  </div>
                  }
                </div>
                <div className="col-6 px-0 aa">
                  <h6 className="text-center my-1">Bay 2, Shift 1 - {bayTwoS1Type}</h6>
                  <Scheduler
                    key={3}
                    shiftType={bayTwoS1Type}
                    dateStr={dateStr}
                    bay={2}
                    disableMove={disableMove}
                    startHr={bayTwoStartHr}
                    endHr={bayTwoEndHr}
                    endHrStr={
                      bayTwoEndHr.toString().length === 1 ?
                      `${dateStr}T0${bayTwoEndHr}:00:00` :
                      `${dateStr}T${bayTwoEndHr}:00:00`
                    }
                    test={test}
                    preventSave={preventSave}
                    onUnschedule={onUnschedule}
                    unscheduledWorkOrders={
                      workOrders.workOrders.filter(wo =>
                        (!wo.isScheduled
                          && wo.washLocationId === selectedLocation.location_id
                          && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                        )
                      )
                    }
                    events={
                      workOrders.workOrders.filter(wo =>
                        (wo.isScheduled && wo.bay == 2)
                      )
                    }
                  />
                  {bayTwoS2Open &&
                    <div>
                      <h6 className="text-center my-1">Bay 2, Shift 2 - {bayTwoS2Type}</h6>
                      <Scheduler
                        key={4}
                        shiftType={bayTwoS2Type}
                        dateStr={dateStr}
                        bay={2}
                        disableMove={disableMove}
                        startHr={bayTwoS2StartHr}
                        endHr={bayTwoS2EndHr}
                        endHrStr={
                          bayTwoS2EndHr.toString().length === 1 ?
                          `${dateStr}T0${bayTwoS2EndHr}:00:00` :
                          `${dateStr}T${bayTwoS2EndHr}:00:00`
                        }
                        test={test}
                        preventSave={preventSave}
                        onUnschedule={onUnschedule}
                        unscheduledWorkOrders={
                          workOrders.workOrders.filter(wo =>
                            (!wo.isScheduled
                              && wo.washLocationId === selectedLocation.location_id
                              && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                            )
                          )
                        }
                        events={
                          workOrders.workOrders.filter(wo =>
                            (wo.isScheduled && wo.bay == 2)
                          )
                        }
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
              :
            <span style={{display: "none"}}></span>
            }
            {/* 2 BAYS AND ONLY BAY 1 OPEN */}
            {selectedLocation.washBays === 2 && bayOneOpen && !bayTwoOpen &&
            <div className="aa">
              <h6 className="text-center my-1">Bay 1, Shift 1 - {bayOneS1Type}</h6>
              <Scheduler
                key={5}
                shiftType={bayOneS1Type}
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
                onUnschedule={onUnschedule}
                unscheduledWorkOrders={
                  workOrders.workOrders.filter(wo =>
                    (!wo.isScheduled
                      && wo.washLocationId === selectedLocation.location_id
                      && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                    )
                  )
                }
                events={
                  workOrders.workOrders.filter(wo =>
                  (wo.isScheduled && wo.bay === 1)
                )}
              />
              {bayOneS2Open &&
                <div>
                  <h6 className="text-center my-1">Bay 1, Shift 2 - {bayOneS2Type}</h6>
                  <Scheduler
                    key={6}
                    shiftType={bayOneS2Type}
                    dateStr={dateStr}
                    bay={1}
                    disableMove={disableMove}
                    startHr={bayOneS2StartHr}
                    endHr={bayOneS2EndHr}
                    endHrStr={
                      bayOneS2EndHr.toString().length === 1 ?
                      `${dateStr}T0${bayOneS2EndHr}:00:00` :
                      `${dateStr}T${bayOneS2EndHr}:00:00`
                    }
                    test={test}
                    preventSave={preventSave}
                    onUnschedule={onUnschedule}
                    unscheduledWorkOrders={
                      workOrders.workOrders.filter(wo =>
                        (!wo.isScheduled
                          && wo.washLocationId === selectedLocation.location_id
                          && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                        )
                      )
                    }
                    events={
                      workOrders.workOrders.filter(wo =>
                      (wo.isScheduled && wo.bay === 1)
                    )}
                  />
                </div>
              }
            </div>
            }
            {/* 2 BAYS AND ONLY BAY 2 OPEN */}
            {selectedLocation.washBays === 2 && !bayOneOpen && bayTwoOpen &&
            <div>
              <h6 className="text-center my-1">Bay 2, Shift 1 - {bayTwoS1Type}</h6>
              <Scheduler
                key={7}
                shiftType={bayTwoS1Type}
                dateStr={dateStr}
                bay={2}
                disableMove={disableMove}
                startHr={bayTwoStartHr}
                endHr={bayTwoEndHr}
                endHrStr={
                  bayTwoEndHr.toString().length === 1 ?
                  `${dateStr}T0${bayTwoEndHr}:00:00` :
                  `${dateStr}T${bayTwoEndHr}:00:00`
                }
                test={test}
                preventSave={preventSave}
                onUnschedule={onUnschedule}
                unscheduledWorkOrders={
                  workOrders.workOrders.filter(wo =>
                    (!wo.isScheduled
                      && wo.washLocationId === selectedLocation.location_id
                      && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                    )
                  )
                }
                events={
                  workOrders.workOrders.filter(wo =>
                    (wo.isScheduled && wo.bay == 2)
                  )
                }
              />
              {bayTwoS2Open &&
                <div>
                  <h6 className="text-center my-1">Bay 2, Shift 2 - {bayTwoS2Type}</h6>
                  <Scheduler
                    key={8}
                    shiftType={bayTwoS2Type}
                    dateStr={dateStr}
                    bay={2}
                    disableMove={disableMove}
                    startHr={bayTwoS2StartHr}
                    endHr={bayTwoS2EndHr}
                    endHrStr={
                      bayTwoS2EndHr.toString().length === 1 ?
                      `${dateStr}T0${bayTwoS2EndHr}:00:00` :
                      `${dateStr}T${bayTwoS2EndHr}:00:00`
                    }
                    test={test}
                    preventSave={preventSave}
                    onUnschedule={onUnschedule}
                    unscheduledWorkOrders={
                      workOrders.workOrders.filter(wo =>
                        (!wo.isScheduled
                          && wo.washLocationId === selectedLocation.location_id
                          && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                        )
                      )
                    }
                    events={
                      workOrders.workOrders.filter(wo =>
                        (wo.isScheduled && wo.bay == 2)
                      )
                    }
                  />
                </div>
              }
            </div>
            }
            {/* 1 BAY */}
            {selectedLocation.washBays === 1 && bayOneOpen &&
            <div>
              <h6 className="text-center my-1">Bay 1, Shift 1 - {bayOneS1Type}</h6>
              <Scheduler
                key={9}
                shiftType={bayOneS1Type}
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
                onUnschedule={onUnschedule}
                unscheduledWorkOrders={
                  workOrders.workOrders.filter(wo =>
                    (!wo.isScheduled
                      && wo.washLocationId === selectedLocation.location_id
                      && new Date(wo.neededDate.split("T")[0]) >= new Date(dateStr)
                    )
                  )
                }
                events={
                  workOrders.workOrders.filter(wo =>
                  (wo.isScheduled && wo.bay === 1)
                )}
              />
            </div>
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
  washTypes: state.washTypes
})

export default connect(mapStateToProps, { getWorkOrdersOfLocation, updateWorkOrderStatus, unscheduleWorkOrder })(CalendarSelect)
