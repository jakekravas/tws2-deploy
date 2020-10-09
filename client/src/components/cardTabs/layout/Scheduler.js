import React, {Component} from 'react';
import Modal from "react-modal";
import {DayPilot, DayPilotCalendar, DayPilotScheduler, DayPilotNavigator} from "daypilot-pro-react";
import DraggableOrder from "../layout/DraggableOrder"

class Scheduler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // timeHeaders: [{"groupBy": "Day"}, {"groupBy": "Hour"}],
      timeHeaders: [{"groupBy": "Hour"}],
      treeEnabled: true,
      treeAnimation: false,
      cellDuration: 30,
      // cellDuration: this.props.cellDuration,
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
      // onmousedown: return DayPilotCalendar.dragStart(null, 60*30, "125", this.innerHTML),
      onBeforeEventRender: args => {
        args.data.moveDisabled = this.props.disableMove;
      },
      // prevents box resizing
      onEventResizing: () => this.forceUpdate(),
      // When order is dragged and released in the scheduler
      onEventMoved: args => {

        // If args starts within a shift range, schedule it
        if ((new Date(args.e.data.start.value) >= this.props.startHrStrB1S1 && new Date(args.e.data.end.value) <= this.props.endHrStrB1S1) || (new Date(args.e.data.start.value) >= this.props.startHrStrB1S2 && new Date(args.e.data.end.value) <= this.props.endHrStrB1S2)) {
          this.props.test(
            args.e.data.id,
            args.e.data.resource,
            args.e.data.start.value,
            args.e.data.end.value
          );
        } else {
          this.props.preventTimeExceed();
        }

      },
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: args => this.handleScheduleClick(this.calendar, args),
      eventDeleteHandling: "Update",
      onEventDelete: args => this.props.onUnschedule(args.e.data.id),

      // HIDING CELLS
      onIncludeTimeCell: args => {

        // If both bays are open
        if (this.props.bayOneOpen && this.props.bayTwoOpen) {
          if (this.props.startHrStrB1S1 < this.props.startHrStrB2S1) {
            if (new Date(args.cell.end.value) <= this.props.startHrStrB1S1) {
              args.cell.visible = false;
            }
          } else {
            if (new Date(args.cell.end.value) <= this.props.startHrStrB2S1) {
              args.cell.visible = false;
            }
          }

          // If both bays have 2nd shifts
          if (this.props.bayOneS2Open && this.props.bayTwoS2Open) {
            // If the 2nd shift of bay one ends after the second shift of bay 2
            if (this.props.endHrStrB1S2 > this.props.endHrStrB2S2) {
              if (new Date(args.cell.start.value) >= this.props.endHrStrB1S2) {
                args.cell.visible = false;
              }
            } else {
              if (new Date(args.cell.start.value) >= this.props.endHrStrB2S2) {
                args.cell.visible = false;
              }
            }
          // If bay 1 has a 2nd shift and bay 2 doesn't
          } else if (this.props.bayOneS2Open && !this.props.bayTwoS2Open) {
            if (new Date(args.cell.start.value) >= this.props.endHrStrB1S2) {
              args.cell.visible = false;
            }
          // If bay 2 has a 2nd shift and bay 1 doesn't
          } else if (!this.props.bayOneS2Open && this.props.bayTwoS2Open) {
            if (new Date(args.cell.start.value) >= this.props.endHrStrB2S2) {
              args.cell.visible = false;
            }
          // If neither bay has a 2nd shift
          } else {
            // If the first shift of bay 1 ends after the first shift of bay 2
            if (this.props.endHrStrB1S1 > this.props.endHrStrB2S1) {
              if (new Date(args.cell.start.value) >= this.props.endHrStrB1S1) {
                args.cell.visible = false;
              }
            } else {
              if (new Date(args.cell.start.value) >= this.props.endHrStrB2S1) {
                args.cell.visible = false;
              }
            }
          }

      // If bay 1 is open and bay 2 isn't
      } else if (this.props.bayOneOpen && !this.props.bayTwoOpen) {
        // Hide every cell with an end time <= to the start time
        if (new Date(args.cell.end.value) <= this.props.startHrStrB1S1) {
          args.cell.visible = false;
        }
        // If there is a second shift
        if (this.props.bayOneS2Open) {
          // Hide every cell with a start time >= to the end time
          if (new Date(args.cell.start.value) >= this.props.endHrStrB1S2) {
            args.cell.visible = false;
          }
        } else {
          if (new Date(args.cell.start.value) >= this.props.endHrStrB1S1) {
            args.cell.visible = false;
          }
        }
      // If bay 2 is open and bay 1 isn't
      } else if (!this.props.bayOneOpen && this.props.bayTwoOpen) {
        // Hide every cell with an end time <= to the start time
        if (new Date(args.cell.end.value) <= this.props.startHrStrB2S1) {
          args.cell.visible = false;
        }
        // If there is a second shift
        if (this.props.bayTwoS2Open) {
          // Hide every cell with a start time >= to the end time
          if (new Date(args.cell.start.value) >= this.props.endHrStrB2S2) {
            args.cell.visible = false;
          }
        } else {
          if (new Date(args.cell.start.value) >= this.props.endHrStrB2S1) {
            args.cell.visible = false;
          }
        }
      }
      },
      // DISABLING CELLS
      onBeforeCellRender: args => {
        // Disable cells of location title row
        if (typeof args.cell.resource === "number") {
          args.cell.disabled = true;
          args.cell.backColor = "#eee";
        }

        // If bay one is open and has a second shift
        if (this.props.bayOneOpen && this.props.bayOneS2Open && this.props.startHrStrB1S2) {
          // Disable cells if they start after shift one and before shift 2
          if (new Date(args.cell.start.value) >= this.props.endHrStrB1S1 && new Date(args.cell.start.value) !== this.props.endHrStrB1S2 && new Date(args.cell.start.value) < this.props.startHrStrB1S2 && args.cell.resource === this.props.resource1) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
            // args.cell.backColor = "rgb(212, 212, 212)";
          }
          // else {
          //   args.cell.backColor = "rgb(212, 212, 212)";

          // }
        }

        // If bay two is open and has a second shift
        if (this.props.bayTwoOpen && this.props.bayTwoS2Open && this.props.startHrStrB2S2) {
          // Disable cells if they start after shift one and before shift 2
          if (new Date(args.cell.start.value) >= this.props.endHrStrB2S1 && new Date(args.cell.start.value) !== this.props.endHrStrB2S2 && new Date(args.cell.start.value) < this.props.startHrStrB2S2 && args.cell.resource === this.props.resource2) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
          }
        }
      },
    };
    this.handleScheduleClick = this.handleScheduleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleCellDurationChange = this.handleCellDurationChange.bind(this);
  }

  componentDidMount() {
    // load event data
    this.setState({
      startDate: this.props.dateStr,
      resources: this.props.resources,
      events: this.props.events,
      // cellDuration: this.props.cellDuration
    });
  }
  
  componentDidUpdate() {
    console.log(this.props);
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
    if (this.state.resources !== this.props.resources) {
      this.setState({ resources: this.props.resources });
    }
    // if (this.state.cellDuration !== this.props.cellDuration) {
    //   this.setState({ cellDuration: this.props.cellDuration });
    // }
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
            (wo.int_duration_mins_team + wo.ext_duration_mins_team) <= nextSchedMinuteDifference
            && (wo.int_duration_mins_team + wo.ext_duration_mins_team) <= ((new Date(wo.needed_date) - selectedStartTime) / 60000)
            && wo.int_duration_mins_team + wo.ext_duration_mins_team <= closeHrMinuteDifference
            );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            (wo.int_duration_mins_team + wo.ext_duration_mins_team) > nextSchedMinuteDifference
            || (wo.int_duration_mins_team + wo.ext_duration_mins_team) > ((new Date(wo.needed_date) - selectedStartTime) / 60000)
            || wo.int_duration_mins_team + wo.ext_duration_mins_team > closeHrMinuteDifference
            );
          } else {
          // Schedulable orders
          ordersToShow = this.props.unscheduledWorkOrders.filter(wo =>
            (wo.int_duration_mins_solo + wo.ext_duration_mins_solo) <= nextSchedMinuteDifference
            && (wo.int_duration_mins_solo + wo.ext_duration_mins_solo) <= ((new Date(wo.needed_date) - selectedStartTime) / 60000)
            && wo.int_duration_mins_solo + wo.ext_duration_mins_solo <= closeHrMinuteDifference
          );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            (wo.int_duration_mins_solo + wo.ext_duration_mins_solo) > nextSchedMinuteDifference
            && (wo.int_duration_mins_solo + wo.ext_duration_mins_solo) > ((new Date(wo.needed_date) - selectedStartTime) / 60000)
            && wo.int_duration_mins_solo + wo.ext_duration_mins_solo > closeHrMinuteDifference
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
            wo.int_duration_mins_team + wo.ext_duration_mins_team <= (new Date(wo.needed_date) - selectedStartTime) / 60000 &&
            wo.int_duration_mins_team + wo.ext_duration_mins_team <= closeHrMinuteDifference
          );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            wo.int_duration_mins_team + wo.ext_duration_mins_team > (new Date(wo.needed_date) - selectedStartTime) / 60000 ||
            wo.int_duration_mins_team + wo.ext_duration_mins_team > closeHrMinuteDifference
          );
        } else {
          // Schedulable orders
          ordersToShow = this.props.unscheduledWorkOrders.filter(wo =>
            wo.int_duration_mins_solo + wo.ext_duration_mins_solo <= (new Date(wo.needed_date) - selectedStartTime) / 60000 &&
            wo.int_duration_mins_solo + wo.ext_duration_mins_solo <= closeHrMinuteDifference
          );
          // Unschedulable orders
          disabledOrders = this.props.unscheduledWorkOrders.filter(wo =>
            wo.int_duration_mins_solo + wo.ext_duration_mins_solo > (new Date(wo.needed_date) - selectedStartTime) / 60000 ||
            wo.int_duration_mins_solo + wo.ext_duration_mins_solo > closeHrMinuteDifference
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
        if (this.props.unscheduledWorkOrders[0].int_duration_mins_team !== this.state.inpDuration) {
          this.setState({ inpDuration: this.props.unscheduledWorkOrders[0].int_duration_mins_team });
        }
      }
      if (this.props.unscheduledWorkOrders.length > 0) {
        if (this.props.unscheduledWorkOrders[0].id !== this.state.inpId) {
          this.setState({ inpId: this.props.unscheduledWorkOrders[0].id });
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

  handleCellDurationChange(e) {
    this.setState({ cellDuration: parseInt(e.target.value) });
  }

  render() {
    var {...config} = this.state;

    return (
      <div className="row mx-auto">
        <div className="col-sm-3 px-0">
          <div id="work-orders-header">
            <h6 style={{margin: "10px 0"}} className="text-center text-dark">Work Orders</h6>
          </div>
          <div className="work-orders-container">
            {this.props.unscheduledWorkOrders.length > 0 && this.props.unscheduledWorkOrders.map(wo => (
              <DraggableOrder
                wo={wo}
                id={wo.id}
                name={`Trailer ${wo.trailer_id}`}
                cityState={`${this.props.city}, ${this.props.state}`}
                text={wo.text}
                duration={ this.props.shiftType === "team" ? (wo.int_duration_mins_team + wo.ext_duration_mins_team) * 60 : (wo.int_duration_mins_solo + wo.ext_duration_mins_solo) * 60 }
              />
            ))}
          </div>
        </div>
        <div className="col-sm-9 px-0">
          <div className="scheduler-view-interval-cont text-dark my-2 text-right pr-2">
            Interval:&nbsp;
            <button
              value={60}
              onClick={this.handleCellDurationChange}
              className={this.state.cellDuration === 60 ? "cd-btn-1 active-cd-btn" : "cd-btn-1"}>
                60 min</button>
            <button
              value={30}
              onClick={this.handleCellDurationChange}
              className={this.state.cellDuration === 30 ? "cd-btn-middle active-cd-btn" : "cd-btn-middle"}>
                30 min</button>
            <button
              value={15}
              onClick={this.handleCellDurationChange}
              className={this.state.cellDuration === 15 ? "cd-btn-2 active-cd-btn" : "cd-btn-2"}>
                15 min</button>
          </div>
          <DayPilotScheduler
            {...config}
            
            ref={component => {
              this.calendar = component && component.control;
            }}
          />
        </div>
      </div>
    );
  }
}

export default Scheduler;
