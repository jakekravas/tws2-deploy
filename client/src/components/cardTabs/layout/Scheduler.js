import React, {Component} from 'react';
import Modal from "react-modal";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";

class Scheduler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: "Day",
      dayBeginsHour: this.props.startHr,
      dayEndsHour: this.props.endHr,
      allowEventOverlap: false,
      currentDP: null,
      cellHeight: 20,
      hourWidth: 50,
      currentArgs: null,
      inpDisable: true,
      inpDuration: null,
      inpVal: "",
      inpId: null,
      unscheduledWorkOrders: null,
      modalOpen: false,
      moveDisabled: true,
      durationBarVisible: true,
      unscheduledOrders: [],
      unscheduledOrdersDisabled: [],
      selectedStartTime: null,
      alertDisplay: "none",
      onBeforeEventRender: args => {
        args.data.moveDisabled = this.props.disableMove;
      },
      // prevents box resizing
      onEventResizing: () => this.forceUpdate(),
      onEventMoved: args => {

        // If the difference in minutes between the needed by date/time and the new end date/time is greater than 0, don't update and show alert
        if (
          ((new Date(args.e.data.neededDate) - new Date(args.e.data.end.value)) / 60000) < 0
        ) {
          this.props.preventSave(args.e.data.neededDateDisplayStr);
        } else if (this.props.shiftType === "team") {
          this.props.test(
            args.e.data._id,
            args.e.data.bay,
            args.e.data.start.value,
            args.e.data.start.value,
            parseInt(args.e.data.intDurationMins + args.e.data.extDurationMins)
          );
        } else if (this.props.shiftType === "solo") {
          this.props.test(
            args.e.data._id,
            args.e.data.bay,
            args.e.data.start.value,
            args.e.data.start.value,
            parseInt(args.e.data.intDurationMinsSolo + args.e.data.extDurationMinsSolo)
          );
        }
      },
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: args => this.handleScheduleClick(this.calendar, args),
      eventDeleteHandling: "Update",
      onEventDelete: args => this.props.onUnschedule(args.e.data._id)

    };
    this.handleScheduleClick = this.handleScheduleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  componentDidMount() {
    // load event data
    this.setState({
      startDate: this.props.dateStr,
      events: this.props.events
    });
  }

  componentDidUpdate() {
    if (this.state.startDate !== this.props.dateStr) {
      this.setState({ startDate: this.props.dateStr });
    }
    if (this.state.dayBeginsHour !== this.props.startHr) {
      this.setState({ dayBeginsHour: this.props.startHr });
    }
    if (this.state.dayEndsHour !== this.props.endHr) {
      this.setState({ dayEndsHour: this.props.endHr });
    }
    if (this.state.events !== this.props.events) {
      this.setState({ events: this.props.events });
    }
  }

  handleScheduleClick(dp, args) {
    // If you're viewing a date in the past, disable ability to schedule work orders
    if (this.props.disableMove) {
      this.setState({ currentDP: dp, currentArgs: args, inpDisable: false });
      this.state.currentDP.clearSelection();
    } else {
      // Get start time of clicked timeslot
      let selectedStartTime = new Date(args.start.value);
      // Get scheduled work orders that take place after the clicked time slot
      let scheduledOrders = this.state.events.filter(ev => new Date(ev.start.value) > new Date(args.start.value));
      let ordersToShow;
      let disabledOrders;
      let nextScheduledStartTime;  
  
      let closeHrMinuteDifference = (new Date(this.props.endHrStr) - selectedStartTime) / 60000;
      
      if (scheduledOrders.length > 0) {
        // Sort scheduled work orders by start date
        scheduledOrders.sort((a,b) => (new Date(a.start.value) > new Date(b.start.value)) ? 1 : ((new Date(b.start.value) > new Date(a.start.value)) ? -1 : 0))
  
        // Get start time of next scheduled work order
        nextScheduledStartTime = new Date(scheduledOrders[0].start.value);
        // Get # of minutes between clicked start time and next scheduled start time
        let nextSchedMinuteDifference = (nextScheduledStartTime - selectedStartTime) / 60000;
        
        // Filter out unscheduled work orders that have a duration exceeding nextSchedMinuteDifference, their needed by date, or closeHrMinuteDifference
        if (this.props.shiftType === "team") {
          // Schedulable orders
          ordersToShow = this.props.unscheduledWorkOrders.filter(wo =>
            (wo.intDurationMins + wo.extDurationMins) <= nextSchedMinuteDifference
            && (wo.intDurationMins + wo.extDurationMins) <= ((new Date(wo.neededDate) - selectedStartTime) / 60000)
            && wo.intDurationMins + wo.extDurationMins <= closeHrMinuteDifference
            );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            (wo.intDurationMins + wo.extDurationMins) > nextSchedMinuteDifference
            || (wo.intDurationMins + wo.extDurationMins) > ((new Date(wo.neededDate) - selectedStartTime) / 60000)
            || wo.intDurationMins + wo.extDurationMins > closeHrMinuteDifference
            );
          } else {
          // Schedulable orders
          ordersToShow = this.props.unscheduledWorkOrders.filter(wo =>
            (wo.intDurationMinsSolo + wo.extDurationMinsSolo) <= nextSchedMinuteDifference
            && (wo.intDurationMinsSolo + wo.extDurationMinsSolo) <= ((new Date(wo.neededDate) - selectedStartTime) / 60000)
            && wo.intDurationMinsSolo + wo.extDurationMinsSolo <= closeHrMinuteDifference
          );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            (wo.intDurationMinsSolo + wo.extDurationMinsSolo) > nextSchedMinuteDifference
            && (wo.intDurationMinsSolo + wo.extDurationMinsSolo) > ((new Date(wo.neededDate) - selectedStartTime) / 60000)
            && wo.intDurationMinsSolo + wo.extDurationMinsSolo > closeHrMinuteDifference
          );
        }
        
        // Set state of unscheduledOrders to ordersToShow
        this.setState({
          unscheduledOrders: ordersToShow,
          unscheduledOrdersDisabled: disabledOrders
        });

      } else {
        // Set state of unscheduledOrders to passed in unscheduled orders
  
        if (this.props.shiftType === "team") {
          // Schedulable orders
          ordersToShow = this.props.unscheduledWorkOrders.filter(wo =>
            wo.intDurationMins + wo.extDurationMins <= (new Date(wo.neededDate) - selectedStartTime) / 60000 &&
            wo.intDurationMins + wo.extDurationMins <= closeHrMinuteDifference
          );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            wo.intDurationMins + wo.extDurationMins > (new Date(wo.neededDate) - selectedStartTime) / 60000 ||
            wo.intDurationMins + wo.extDurationMins > closeHrMinuteDifference
          );
        } else {
          // Schedulable orders
          ordersToShow = this.props.unscheduledWorkOrders.filter(wo =>
            wo.intDurationMinsSolo + wo.extDurationMinsSolo <= (new Date(wo.neededDate) - selectedStartTime) / 60000 &&
            wo.intDurationMinsSolo + wo.extDurationMinsSolo <= closeHrMinuteDifference
          );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            wo.intDurationMinsSolo + wo.extDurationMinsSolo > (new Date(wo.neededDate) - selectedStartTime) / 60000 ||
            wo.intDurationMinsSolo + wo.extDurationMinsSolo > closeHrMinuteDifference
          );
        }
  
        this.setState({
          unscheduledOrders: ordersToShow,
          unscheduledOrdersDisabled: disabledOrders
        });
      }
  
      this.setState({ currentDP: dp, currentArgs: args, inpDisable: false });
      this.state.currentDP.clearSelection();
      this.setState({ modalOpen: true });
      if (this.props.unscheduledWorkOrders.length > 0) {
        if (this.props.unscheduledWorkOrders[0].intDurationMins !== this.state.inpDuration) {
          this.setState({ inpDuration: this.props.unscheduledWorkOrders[0].intDurationMins });
        }
      }
      if (this.props.unscheduledWorkOrders.length > 0) {
        if (this.props.unscheduledWorkOrders[0]._id !== this.state.inpId) {
          this.setState({ inpId: this.props.unscheduledWorkOrders[0]._id });
        }
      }
    }
  }
  
  handleAdd() {
    this.props.test(
      this.state.inpId,
      this.props.bay,
      this.state.currentArgs.start.value,
      this.state.currentArgs.start.value,
      parseInt(this.state.inpDuration)
    );

    this.setState({ modalOpen: false });
  }

  handleAlert() {
    this.setState({ alertDisplay: "block" });
    setTimeout(() => {
      this.setState({ alertDisplay: "none" });
    }, 8000);
  }
  
  handleChange(e) {
    this.setState({ inpId: e.target.value, inpDuration: e.target.id });
  }

  closeModal() {
    this.setState({ modalOpen: false, inpId: null, inpDuration: null });
  }

  render() {
    var {...config} = this.state;

    return (
      <div>
        <div>
        <DayPilotCalendar
          {...config}
          
          ref={component => {
            this.calendar = component && component.control;
          }}
        />
        <Modal
          isOpen={this.state.modalOpen}
          className="modall"
          style = {
            {
              content: {
                width: "300px",
              }
            }
          }
        >
          <div className="card wo-card">
            <div className="card text-center">
              <div className="card-body">
                {this.state.unscheduledOrders.length > 0 || this.state.unscheduledOrdersDisabled.length > 0 ?
                <div>
                  <h5 className="card-title">Select Work Order</h5>
                  <div style={{display: this.state.alertDisplay, fontSize: "14px"}} className="alert alert-danger p-1 my-0 text-center">
                    Work orders cannot overlap with other work orders, exceed their needed by date, or exceed the closing time
                  </div>
                  <div className="work-orders-container">
                    {this.props.shiftType === "team" && this.state.unscheduledOrders.length > 0 &&
                      <div>
                        {this.state.unscheduledOrders.map(wo => (
                          <div key={wo._id} className="work-order">
                            <input onChange={this.handleChange} type="radio" value={wo._id} name="selectedWorkOrder" id={wo.intDurationMins + wo.extDurationMins}/>
                            <span className="work-order-title-section">
                              Trailer {wo.trailerId}
                              <br/>
                              <span className="work-order-duration">
                                <i class="far fa-clock"></i> {
                                  Math.floor((wo.intDurationMins + wo.extDurationMins) / 60)
                                  } hrs&nbsp;
                                  {
                                  ((wo.intDurationMins + wo.extDurationMins) % 60) > 0 && <span>{(wo.intDurationMins + wo.extDurationMins) % 60} mins</span>
                                  }
                              </span>
                            </span>
                            <span className="work-order-dates">
                              Needed by:
                              <br/>
                              {wo.neededDateDisplayStr}
                            </span>
                          </div>
                        ))}
                      </div>
                    }
                    {this.props.shiftType === "team" && this.state.unscheduledOrdersDisabled.length > 0 &&
                      <div>
                        {this.state.unscheduledOrdersDisabled.map(wo => (
                          <div onClick={this.handleAlert} key={wo._id} className="work-order">
                            <input onChange={this.handleChange} disabled={true} type="radio" value={wo._id} name="selectedWorkOrder" id={wo.intDurationMins + wo.extDurationMins}/>
                            <span className="work-order-title-section">
                              Trailer {wo.trailerId}
                              <br/>
                              <span className="work-order-duration">
                                <i class="far fa-clock"></i> {
                                  Math.floor((wo.intDurationMins + wo.extDurationMins) / 60)
                                  } hrs&nbsp;
                                  {
                                  ((wo.intDurationMins + wo.extDurationMins) % 60) > 0 && <span>{(wo.intDurationMins + wo.extDurationMins) % 60} mins</span>
                                  }
                              </span>
                            </span>
                            <span className="work-order-dates">
                              Needed by:
                              <br/>
                              {wo.neededDateDisplayStr}
                            </span>
                          </div>
                        ))}
                      </div>
                    }
                    {this.props.shiftType === "solo" && this.state.unscheduledOrders.length > 0 &&
                      <div>
                        {this.state.unscheduledOrders.map(wo => (
                          <div key={wo._id} className="work-order">
                            <input onChange={this.handleChange} type="radio" value={wo._id} name="selectedWorkOrder" id={wo.intDurationMins + wo.extDurationMins}/>
                            <span className="work-order-title-section">
                              Trailer {wo.trailerId}
                              <br/>
                              <span className="work-order-duration">
                                <i class="far fa-clock"></i> {
                                  Math.floor((wo.intDurationMins + wo.extDurationMins) / 60)
                                  } hrs&nbsp;
                                  {
                                  ((wo.intDurationMins + wo.extDurationMins) % 60) > 0 && <span>{(wo.intDurationMins + wo.extDurationMins) % 60} mins</span>
                                  }
                              </span>
                            </span>
                            <span className="work-order-dates">
                              Needed by:
                              <br/>
                              {wo.neededDateDisplayStr}
                            </span>
                          </div>
                        ))}
                      </div>
                    }
                    {this.props.shiftType === "solo" && this.state.unscheduledOrdersDisabled.length > 0 &&
                      <div>
                        {this.state.unscheduledOrdersDisabled.map(wo => (
                          <div onClick={this.handleAlert} key={wo._id} className="work-order">
                            <input onChange={this.handleChange} disabled={true} type="radio" value={wo._id} name="selectedWorkOrder" id={wo.intDurationMins + wo.extDurationMins}/>
                            <span className="work-order-title-section">
                              Trailer {wo.trailerId}
                              <br/>
                              <span className="work-order-duration">
                                <i class="far fa-clock"></i> {
                                  Math.floor((wo.intDurationMins + wo.extDurationMins) / 60)
                                  } hrs&nbsp;
                                  {
                                  ((wo.intDurationMins + wo.extDurationMins) % 60) > 0 && <span>{(wo.intDurationMins + wo.extDurationMins) % 60} mins</span>
                                  }
                              </span>
                            </span>
                            <span className="work-order-dates">
                              Needed by:
                              <br/>
                              {wo.neededDateDisplayStr}
                            </span>
                          </div>
                        ))}
                      </div>
                    }
                  </div>
                  <div className="mt-3">
                    <button className="btn cancel-add-btn mr-1" onClick={this.closeModal}>Cancel</button>
                    <button className="btn submit-btn ml-1" disabled={this.state.inpDisable} onClick={this.handleAdd}>Add</button>
                  </div>
                </div>
                :
                <div>
                  <h6 className="card-title">No unscheduled work orders to display for this timeslot</h6>
                  <button className="btn cancel-add-btn" onClick={this.closeModal}>Close</button>
                </div>
                }
              </div>
            </div>
          </div>
        </Modal>
        </div>
      </div>
    );
  }
}

export default Scheduler;
