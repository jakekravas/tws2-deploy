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
      onBeforeEventRender: args => {
        args.data.moveDisabled = this.props.disableMove;
      },
      // prevents box resizing
      onEventResizing: () => this.forceUpdate(),
      // When order is dragged and released in the scheduler
      onEventMoved: args => {

        // Find order to update
        let orderToUpdate = this.props.workOrders.filter(wo => wo.id === args.e.data.id)[0];
        let endTime = new Date(args.e.data.start.value);
        let duration;

        // if args starts in bay 1 shift 1
        if (args.e.data.resource === this.props.resource1 && new Date(args.e.data.start.value) >= this.props.startHrStrB1S1 && new Date(args.e.data.start.value) < this.props.endHrStrB1S1) {

          if (this.props.bayOneS1Type === "team") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
          } else if (this.props.bayOneS1Type === "solo") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
          }

          // Set duration
          endTime.setMinutes(endTime.getMinutes() + duration);

          // If end time is within bay 1 shift 1
          if (endTime <= this.props.endHrStrB1S1) {
            this.props.test(
              args.e.data.id,
              args.e.data.resource,
              args.e.data.start.value,
              new Date(endTime.toString().split('GMT')[0]+' UTC').toISOString().split(".")[0]
            );
          } else {
            this.props.preventTimeExceed();
          }
        }
        // if args starts in bay 1 shift 2
        else if (args.e.data.resource === this.props.resource1 && new Date(args.e.data.start.value) >= this.props.startHrStrB1S2 && new Date(args.e.data.start.value) < this.props.endHrStrB1S2) {
          if (this.props.bayOneS2Type === "team") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
          } else if (this.props.bayOneS2Type === "solo") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
          }

          // Set duration
          endTime.setMinutes(endTime.getMinutes() + duration);

          // If end time is within bay 1 shift 2
          if (endTime <= this.props.endHrStrB1S2) {
            this.props.test(
              args.e.data.id,
              args.e.data.resource,
              args.e.data.start.value,
              new Date(endTime.toString().split('GMT')[0]+' UTC').toISOString().split(".")[0]
            );
          } else {
            this.props.preventTimeExceed();
          }
        }
        // if args starts in bay 2 shift 1
        else if (args.e.data.resource === this.props.resource2 && new Date(args.e.data.start.value) >= this.props.startHrStrB2S1 && new Date(args.e.data.start.value) < this.props.endHrStrB2S1) {
          if (this.props.bayTwoS1Type === "team") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
          } else if (this.props.bayTwoS1Type === "solo") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
          }

          // Set duration
          endTime.setMinutes(endTime.getMinutes() + duration);

          // If end time is within bay 1 shift 2
          if (endTime <= this.props.endHrStrB2S1) {
            this.props.test(
              args.e.data.id,
              args.e.data.resource,
              args.e.data.start.value,
              new Date(endTime.toString().split('GMT')[0]+' UTC').toISOString().split(".")[0]
            );
          } else {
            this.props.preventTimeExceed();
          }
        }
        // if args starts in bay 2 shift 2
        else if (args.e.data.resource === this.props.resource2 && new Date(args.e.data.start.value) >= this.props.startHrStrB2S2 && new Date(args.e.data.start.value) < this.props.endHrStrB2S2) {
          if (this.props.bayTwoS2Type === "team") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
          } else if (this.props.bayTwoS2Type === "solo") {
            // Calculate duration
            duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
          }

          // Set duration
          endTime.setMinutes(endTime.getMinutes() + duration);

          // If end time is within bay 1 shift 2
          if (endTime <= this.props.endHrStrB2S2) {
            this.props.test(
              args.e.data.id,
              args.e.data.resource,
              args.e.data.start.value,
              new Date(endTime.toString().split('GMT')[0]+' UTC').toISOString().split(".")[0]
            );
          } else {
            this.props.preventTimeExceed();
          }
        }
      },
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: () => this.calendar.clearSelection(),
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

        // If cell is before the start of shift one for either bay
        if ((args.cell.resource === this.props.resource1 && new Date(args.cell.start.value) < this.props.startHrStrB1S1) || (args.cell.resource === this.props.resource2 && new Date(args.cell.start.value) < this.props.startHrStrB2S1)) {
          args.cell.disabled = true;
          args.cell.backColor = "#eee";
        }
        
        // If B1S2 is open
        if (this.props.bayOneS2Open) {
          // If cell is in bay 1 row and is after the end of B1S2
          if (args.cell.resource === this.props.resource1 && new Date(args.cell.end.value) > this.props.endHrStrB1S2) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
          }
        } else {
          // If cell is in bay 1 row and is after the end of B1S1
          if (args.cell.resource === this.props.resource1 && new Date(args.cell.end.value) > this.props.endHrStrB1S1) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
          }
        }

        // If B2S2 is open
        if (this.props.bayTwoS2Open) {
          // If cell is in bay 2 row and is after the end of B2S2
          if (args.cell.resource === this.props.resource2 && new Date(args.cell.end.value) > this.props.endHrStrB2S2) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
          }
        } else {
          // If cell is in bay 2 row and is after the end of B2S1
          if (args.cell.resource === this.props.resource2 && new Date(args.cell.end.value) > this.props.endHrStrB2S1) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
          }
        }

        // If bay one is open and has a second shift
        if (this.props.bayOneOpen && this.props.bayOneS2Open && this.props.startHrStrB1S2) {
          // Disable cells if they start after shift one and before shift 2
          // if (new Date(args.cell.start.value) >= this.props.endHrStrB1S1 && new Date(args.cell.start.value) !== this.props.endHrStrB1S2 && new Date(args.cell.start.value) < this.props.startHrStrB1S2 && args.cell.resource === this.props.resource1) {
          if (new Date(args.cell.start.value) >= this.props.endHrStrB1S1 && new Date(args.cell.start.value) < this.props.startHrStrB1S2 && args.cell.resource === this.props.resource1) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
            // args.cell.backColor = "rgb(225, 225, 225)";
          }
        }

        // If bay 1 shift 1 is a solo shift, make the cell color grey
        if (this.props.bayOneS1Type === "solo") {
          if (new Date(args.cell.start.value) >= this.props.startHrStrB1S1 && new Date(args.cell.end.value) <= this.props.endHrStrB1S1 && args.cell.resource === this.props.resource1) {
            args.cell.backColor = "rgb(225, 225, 225)";
          }
        }
        // If bay 1 shift 2 is a solo shift, make the cell color grey
        if (this.props.bayOneS2Type === "solo") {
          if (new Date(args.cell.start.value) >= this.props.startHrStrB1S2 && new Date(args.cell.end.value) <= this.props.endHrStrB1S2 && args.cell.resource === this.props.resource1) {
            args.cell.backColor = "rgb(225, 225, 225)";
          }
        }

        // If bay 2 shift 1 is a solo shift, make the cell color grey
        if (this.props.bayTwoS1Type === "solo") {
          if (new Date(args.cell.start.value) >= this.props.startHrStrB2S1 && new Date(args.cell.end.value) <= this.props.endHrStrB2S1 && args.cell.resource === this.props.resource2) {
            args.cell.backColor = "rgb(225, 225, 225)";
          }
        }

        // If bay 2 shift 2 is a solo shift, make the cell color grey
        if (this.props.bayTwoS2Type === "solo") {
          if (new Date(args.cell.start.value) >= this.props.startHrStrB2S2 && new Date(args.cell.end.value) <= this.props.endHrStrB2S2 && args.cell.resource === this.props.resource2) {
            args.cell.backColor = "rgb(225, 225, 225)";
          }
        }

        // If bay two is open and has a second shift
        if (this.props.bayTwoOpen && this.props.bayTwoS2Open && this.props.startHrStrB2S2) {
          // Disable cells if they start after shift one and before shift 2
          // if (new Date(args.cell.start.value) >= this.props.endHrStrB2S1 && new Date(args.cell.start.value) !== this.props.endHrStrB2S2 && new Date(args.cell.start.value) < this.props.startHrStrB2S2 && args.cell.resource === this.props.resource2) {
          if (new Date(args.cell.start.value) >= this.props.endHrStrB2S1 && new Date(args.cell.start.value) < this.props.startHrStrB2S2 && args.cell.resource === this.props.resource2) {
            args.cell.disabled = true;
            args.cell.backColor = "#eee";
          }
        }
      },
    };
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
    // if (e.target.value === 60) {
    //   this.setState({ timeHeaders: [{"groupBy": "Day"}], cellDuration: parseInt(e.target.value) });
    // } else {
    //   this.setState({ timeHeaders: [{"groupBy": "Day"}, {"groupBy": "Day"}], cellDuration: parseInt(e.target.value) });
    // }
    this.setState({ cellDuration: parseInt(e.target.value) });
  }

  render() {
    var {...config} = this.state;

    return (
      <div className="row mx-auto">
        <div className="col-sm-3 px-0">
          <div id="work-orders-header">
            <h6 style={{margin: "11.4px 0"}} className="text-center text-dark">Work Orders</h6>
          </div>
          <div className="work-orders-container">
            {this.props.unscheduledWorkOrders.length > 0 && this.props.unscheduledWorkOrders.map(wo => (
              <DraggableOrder
                wo={wo}
                id={wo.id}
                name={`Trailer ${wo.trailer_id}`}
                cityState={`${this.props.city}, ${this.props.state}`}
                text={wo.text}
                duration={ this.props.bayOneS1Type === "team" ? (wo.int_duration_mins_team + wo.ext_duration_mins_team) * 60 : (wo.int_duration_mins_solo + wo.ext_duration_mins_solo) * 60 }
                teamDuration={1}
                soloDuration={2}
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
