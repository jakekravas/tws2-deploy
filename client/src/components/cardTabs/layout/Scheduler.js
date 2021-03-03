import React, { Component } from 'react';
import { DayPilotScheduler } from "daypilot-pro-react";
import Modal from "react-modal";
import DraggableTOrder from "../layout/DraggableTOrder";
import WorkOrderDetails from "../layout/WorkOrderDetails";
import { getDateStr } from "../../../actions/misc";

Modal.setAppElement("#root");

class Scheduler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // timeHeaders: [{"groupBy": "Day"}, {"groupBy": "Hour"}, {"groupBy": "Week"}],
      timeHeaders: [{"groupBy": "Hour"}],
      days: 2,
      treeEnabled: true,
      treeAnimation: false,
      cellDuration: 30,
      height: 315,
      allowEventOverlap: false,
      currentDP: null,
      cellHeight: 20,
      hourWidth: 50,
      eventDoubleClickHandling: "Enabled",
      currentArgs: null,
      inpDisable: true,
      inpDuration: null,
      inpVal: "",
      inpId: null,
      unscheduledWorkOrders: [],
      modalOpen: false,
      modalOpenn: false,
      moveDisabled: true,
      durationBarVisible: true,
      selectedStartTime: null,
      alertDisplay: "none",
      editOpen: false,
      sortBy: "needed date",
      sortByy: null,
      sortAsc: true,
      sortAscc: null,
      dataId: null,
      dataResource: null,
      dataStartVal: null,
      dataEndVal: null,
      filterText: "",
      currentWoDetails: null,
      onEventClick: args => {
        this.openWoModal(args.e.data.wash_id, true);
      },
      onBeforeEventRender: args => {
        args.data.moveDisabled = false;
      },
      // prevents box resizing
      eventResizeHandling: "Disabled",
      // onEventResizing: () => this.forceUpdate(),
      // When order is dragged and released in the scheduler
      onEventMoved: args => {
        console.log(args.e.data);
        // Location code
        const loc = args.e.data.resource.slice(0, -1);

        // Bay
        const bay = parseInt(args.e.data.resource[args.e.data.resource.length-1]);

        // Find order to update
        const orderToUpdate = this.props.workOrders.filter(wo => wo.wash_id === args.e.data.id)[0];
        const endTime = new Date(args.e.data.start.value);
        let duration;

        // browsers add 7 hrs to this data object because it ends in "0Z", so we remove that here
        orderToUpdate.needed_date = orderToUpdate.needed_date.replace("0Z", "");

        // So we know what start and end times to look at
        const timesToLookAt = this.props.hoursArr.filter(h => h.location_id === loc && h.bay === bay)[0];
        console.log(timesToLookAt);
        const argStart = new Date(args.e.data.start.value);

        const s1Start = new Date(`${this.props.dateStr}T${timesToLookAt.shift_one_start}`);
        const s1Type = timesToLookAt.shift_one_type;
        let s1End;

        if (timesToLookAt.shift_one_end > timesToLookAt.shift_one_start) {
          s1End = new Date(`${this.props.dateStr}T${timesToLookAt.shift_one_end}`);
        } else {
          s1End = new Date(`${this.props.leakDateStr}T${timesToLookAt.shift_one_end}`);
        }

        const s2Open = timesToLookAt.shift_two_open;
        const s2Start = new Date(`${this.props.dateStr}T${timesToLookAt.shift_two_start}`);
        const s2Type = timesToLookAt.shift_two_type;
        let s2End;

        if (timesToLookAt.shift_two_end > timesToLookAt.shift_two_start) {
          s2End = new Date(`${this.props.dateStr}T${timesToLookAt.shift_two_end}`);
        } else {
          s2End = new Date(`${this.props.leakDateStr}T${timesToLookAt.shift_two_end}`);
        }

        // If a work order is dragged into the wrong location
        if (loc !== orderToUpdate.wash_location_id.trim()) {
          this.props.preventTimeExceed("loc");
        } else {
          
          if (argStart < s1Start) {
            this.props.preventTimeExceed("start");
          } else if (argStart >= s1Start && argStart < s1End) {
  
            if (s1Type === "team") {
              duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
            } else {
              duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
            }
  
            // Set duration
            endTime.setMinutes(endTime.getMinutes() + duration);
            
            // If order exceeds end of shift 1 ends and there either isn't a shift 2
            if (endTime > s1End && !timesToLookAt.shift_two_open) {
              let difference = endTime - s1End;

              // Get all open hour objects for this location and bay
              let allHrs = this.props.allHoursArr.filter(
                h => h.location_id === timesToLookAt.location_id
                && h.bay === timesToLookAt.bay
                && h.is_open
              );

              // sort the array by day of the week
              allHrs.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);

              // find index to look at
              let indexToLookAt = allHrs.findIndex(i => i.id === timesToLookAt.id)+1;
              let nextHrs = allHrs[indexToLookAt];
              if (nextHrs === undefined) nextHrs = allHrs[0];

              // subract current sort_order from nextHrs sort_order
              let diff1 = nextHrs.sort_order - timesToLookAt.sort_order;
              let diff2 = timesToLookAt.sort_order - nextHrs.sort_order;

              if (diff1 > diff2) {
                let selectedDate = new Date(args.e.data.start.value);
                // Get date of next shift
                selectedDate.setHours(selectedDate.getHours() + (diff1*24));
                // Get start time of next shift and append it to the date
                let dateToLeakInto = new Date(`${getDateStr(selectedDate)}T${nextHrs.shift_one_start}:00`);
                
                // Add the remainder of the order the start of the shift
                dateToLeakInto.setMilliseconds(dateToLeakInto.getMilliseconds() + difference);

                if (dateToLeakInto > new Date(orderToUpdate.needed_date)) {
                  this.setState({
                    modalOpen: true,
                    dataId: args.e.data.id,
                    dataResource: args.e.data.resource,
                    dataStartVal: args.e.data.start.value,
                    dataEndVal: new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  });
                } else {
                  this.props.test(
                    args.e.data.id,
                    args.e.data.resource,
                    args.e.data.start.value,
                    new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  );
                }
                
              } else {
                let inv = [7, 6, 5, 4, 3, 2, 1];

                // get absolute value of diff2, add inv[absolute] to date of timesToLookAt
                let diff = inv[Math.abs(diff2)];

                let selectedDate = new Date(args.e.data.start.value);
                // Get date of next shift
                selectedDate.setHours(selectedDate.getHours() + (diff*24));
                // Get start time of next shift and append it to the date
                let dateToLeakInto = new Date(`${getDateStr(selectedDate)}T${nextHrs.shift_one_start}:00`);
                
                // Add the remainder of the order the start of the shift
                dateToLeakInto.setMilliseconds(dateToLeakInto.getMilliseconds() + difference);

                if (dateToLeakInto > new Date(orderToUpdate.needed_date)) {
                  this.setState({
                    modalOpen: true,
                    dataId: args.e.data.id,
                    dataResource: args.e.data.resource,
                    dataStartVal: args.e.data.start.value,
                    dataEndVal: new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  });
                } else {
                  this.props.test(
                    args.e.data.id,
                    args.e.data.resource,
                    args.e.data.start.value,
                    new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  );
                }
              }

              // this.props.preventTimeExceed("end");

            // If order exceeds end of shift 1 and there is a shift 2 but its start time isn't equal to shift 1's end time
            } else if (endTime > s1End && (s1End.toString() !== s2Start.toString())) {

              let difference = endTime - s1End;
              let selectedDate = new Date(args.e.data.start.value);
              // Get start time of next shift and append it to the date
              let dateToLeakInto = new Date(`${getDateStr(selectedDate)}T${timesToLookAt.shift_two_start}:00`);
              
              // Add the remainder of the order the start of the shift
              dateToLeakInto.setMilliseconds(dateToLeakInto.getMilliseconds() + difference);

              if (dateToLeakInto > new Date(orderToUpdate.needed_date)) {
                this.setState({
                  modalOpen: true,
                  dataId: args.e.data.id,
                  dataResource: args.e.data.resource,
                  dataStartVal: args.e.data.start.value,
                  dataEndVal: new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                });
              } else {
                this.props.test(
                  args.e.data.id,
                  args.e.data.resource,
                  args.e.data.start.value,
                  new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                );
              }

              // this.props.preventTimeExceed("shift-end");
            } else if (endTime > new Date(orderToUpdate.needed_date)) {
              this.setState({
                modalOpen: true,
                dataId: args.e.data.id,
                dataResource: args.e.data.resource,
                dataStartVal: args.e.data.start.value,
                dataEndVal: new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              });

            } else {
              this.props.test(
                args.e.data.id,
                args.e.data.resource,
                args.e.data.start.value,
                new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              );
            }

          // If shift 2 is open and the start of args is within shift 2 range
          } else if (s2Open === true && argStart >= s2Start && argStart < s2End) {

            if (s2Type === "team") {
              duration = orderToUpdate.int_duration_mins_team + orderToUpdate.ext_duration_mins_team;
            } else {
              duration = orderToUpdate.int_duration_mins_solo + orderToUpdate.ext_duration_mins_solo;
            }
  
            // Set duration
            endTime.setMinutes(endTime.getMinutes() + duration);

            if (endTime > s2End) {

              let difference = endTime - s2End;

              // Get all open hour objects for this location and bay
              let allHrs = this.props.allHoursArr.filter(
                h => h.location_id === timesToLookAt.location_id
                && h.bay === timesToLookAt.bay
                && h.is_open
              );

              // sort the array by day of the week
              allHrs.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1);

              // find index to look at
              let indexToLookAt = allHrs.findIndex(i => i.id === timesToLookAt.id)+1;
              let nextHrs = allHrs[indexToLookAt];
              if (nextHrs === undefined) nextHrs = allHrs[0];

              // subract current sort_order from nextHrs sort_order
              let diff1 = nextHrs.sort_order - timesToLookAt.sort_order;
              let diff2 = timesToLookAt.sort_order - nextHrs.sort_order;

              if (diff1 > diff2) {
                let selectedDate = new Date(args.e.data.start.value);
                // Get date of next shift
                selectedDate.setHours(selectedDate.getHours() + (diff1*24));
                // Get start time of next shift and append it to the date
                let dateToLeakInto = new Date(`${getDateStr(selectedDate)}T${nextHrs.shift_one_start}:00`);
                
                // Add the remainder of the order the start of the shift
                dateToLeakInto.setMilliseconds(dateToLeakInto.getMilliseconds() + difference);

                if (dateToLeakInto > new Date(orderToUpdate.needed_date)) {
                  this.setState({
                    modalOpen: true,
                    dataId: args.e.data.id,
                    dataResource: args.e.data.resource,
                    dataStartVal: args.e.data.start.value,
                    dataEndVal: new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  });
                } else {
                  this.props.test(
                    args.e.data.id,
                    args.e.data.resource,
                    args.e.data.start.value,
                    new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  );
                }
                
              } else {
                let inv = [7, 6, 5, 4, 3, 2, 1];

                // get absolute value of diff2, add inv[absolute] to date of timesToLookAt
                let diff = inv[Math.abs(diff2)];

                let selectedDate = new Date(args.e.data.start.value);
                // Get date of next shift
                selectedDate.setHours(selectedDate.getHours() + (diff*24));
                // Get start time of next shift and append it to the date
                let dateToLeakInto = new Date(`${getDateStr(selectedDate)}T${nextHrs.shift_one_start}:00`);
                
                // Add the remainder of the order the start of the shift
                dateToLeakInto.setMilliseconds(dateToLeakInto.getMilliseconds() + difference);

                if (dateToLeakInto > new Date(orderToUpdate.needed_date)) {
                  this.setState({
                    modalOpen: true,
                    dataId: args.e.data.id,
                    dataResource: args.e.data.resource,
                    dataStartVal: args.e.data.start.value,
                    dataEndVal: new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  });
                } else {
                  this.props.test(
                    args.e.data.id,
                    args.e.data.resource,
                    args.e.data.start.value,
                    new Date(dateToLeakInto.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
                  );
                }
              }

              // this.props.preventTimeExceed("end");
            // } else if (endTime < new Date(orderToUpdate.needed_date)) {
            } else if (endTime > new Date(orderToUpdate.needed_date)) {
              // this.props.preventTimeExceed("late");

              // Show warning
              // this.props.displayWarning("late");
              this.setState({
                modalOpen: true,
                dataId: args.e.data.id,
                dataResource: args.e.data.resource,
                dataStartVal: args.e.data.start.value,
                dataEndVal: new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              });

              } else {
              // Schedule order
              this.props.test(
                args.e.data.id,
                args.e.data.resource,
                args.e.data.start.value,
                new Date(endTime.toString().split("GMT")[0]+" UTC").toISOString().split(".")[0]
              );
            }
          }
        }
      },
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: () => this.calendar.clearSelection(),
      eventDeleteHandling: "Update",
      onEventDelete: args => this.props.onUnschedule(args.e.data.id),

      // HIDING CELLS
      onIncludeTimeCell: args => {

        // If cell is before start time
        if (new Date(args.cell.end.value) <= this.props.startTime) {
          args.cell.visible = false;
        }
        
        // If cell is after end time
        if (new Date(args.cell.start.value) >= this.props.endTime) {
          args.cell.visible = false;
        }
      },

      // DISABLING CELLS
      onBeforeCellRender: args => {
        
        // Disable cells of location title row
        if (typeof args.cell.resource === "number") {
          args.cell.disabled = true;
          args.cell.backColor = "#eee";
        }
        if (this.props.hoursArr) {
          for (let i = 0; i < this.props.hoursArr.length; i++) {
            
            if (args.cell.resource === `${this.props.hoursArr[i].location_id}${this.props.hoursArr[i].bay}`) {
              if (!this.props.hoursArr[i].is_open) {
                args.cell.disabled = true;
                args.cell.backColor = "#eee";
              }

              // Disable cells that start before the start of shift 1
              if (new Date(args.cell.start.value) < new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_start}`)) {
                args.cell.disabled = true;
                args.cell.backColor = "#eee";
  
              // Color code shift 1 if it's a solo shift
              } else if (new Date(args.cell.start.value) >= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_start}`) && new Date(args.cell.start.value) <= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_end}`) && this.props.hoursArr[i].shift_one_type === "solo") {
                args.cell.backColor = "rgb(225, 225, 225)";
              }
  
              // If there's a shift 2
              if (this.props.hoursArr[i].shift_two_open) {
                
                // Disable cells that start after the end of shift 1 and before the start of shift 2
                if (new Date(args.cell.start.value) >= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_one_end}`) && new Date(args.cell.start.value) < new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_two_start}`)) {
                  // args.cell.disabled = true;
                  args.cell.backColor = "#eee";
                }
                
                // If we DONT need to use leak date
                if (this.props.hoursArr[i].shift_two_end > this.props.hoursArr[i].shift_two_start) {
    
                  // Color code shift 2 if it's a solo shift
                  if (new Date(args.cell.start.value) >= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_two_start}`) && new Date(args.cell.start.value) <= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_two_end}`) && this.props.hoursArr[i].shift_two_type === "solo") {
                    args.cell.backColor = "rgb(225, 225, 225)";
                  }
                  
                  if (new Date(args.cell.start.value) >= new Date( `${this.props.dateStr}T${this.props.hoursArr[i].shift_two_end}`)) {
                    args.cell.disabled = true;
                    args.cell.backColor = "#eee";
                  }
                  
                // If we DO need to use the leak date
                } else if (this.props.hoursArr[i].shift_two_end < this.props.hoursArr[i].shift_two_start) {
                  
                  // Color code shift 2 if it's a solo shift
                  if (new Date(args.cell.start.value) >= new Date(`${this.props.dateStr}T${this.props.hoursArr[i].shift_two_start}`) && new Date(args.cell.start.value) <= new Date(`${this.props.leakDateStr}T${this.props.hoursArr[i].shift_two_end}`) && this.props.hoursArr[i].shift_two_type === "solo") {
                    args.cell.backColor = "rgb(225, 225, 225)";
                  }
                  
                  if (new Date(args.cell.start.value) >= new Date( `${this.props.leakDateStr}T${this.props.hoursArr[i].shift_two_end}`)) {
                    args.cell.disabled = true;
                    args.cell.backColor = "#eee";
                  }
                }

  
              // IF THERE'S ONLY A SHIFT 1
              } else {

                // Disable cells that start after the end of shift 1

                // If we DONT need to use leak date
                if (this.props.hoursArr[i].shift_one_end > this.props.hoursArr[i].shift_one_start) {
                  if (new Date(args.cell.start.value) >= new Date( `${this.props.dateStr}T${this.props.hoursArr[i].shift_one_end}`)) {
                    args.cell.disabled = true;
                    args.cell.backColor = "#eee";
                  }
                  
                // If we DO need to use leak date
                } else {
                  if (new Date(args.cell.start.value) >= new Date( `${this.props.leakDateStr}T${this.props.hoursArr[i].shift_one_end}`)) {
                    args.cell.disabled = true;
                    args.cell.backColor = "#eee";

                  // If it's a solo shift, color code it
                  } else if (this.props.hoursArr[i].shift_one_type === 'solo') {
                    if (new Date(args.cell.start.value) >= new Date( `${this.props.dateStr}T${this.props.hoursArr[i].shift_one_start}`) && new Date(args.cell.end.value) <= new Date( `${this.props.leakDateStr}T${this.props.hoursArr[i].shift_one_end}`)) {
                      args.cell.backColor = "rgb(225, 225, 225)";
                    }
                  }
                }
              }
            }
          }
        }
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalAndAdd = this.closeModalAndAdd.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleCellDurationChange = this.handleCellDurationChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.toggleAsc = this.toggleAsc.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.setFilterText = this.setFilterText.bind(this);
    this.setEditOpen = this.setEditOpen.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.changeLocationFilter = this.changeLocationFilter.bind(this);
    this.changeWashIdFilter = this.changeWashIdFilter.bind(this);
    this.changeTrailerIdFilter = this.changeTrailerIdFilter.bind(this);
    this.changeIntWashTypeFilter = this.changeIntWashTypeFilter.bind(this);
    this.openWoModal = this.openWoModal.bind(this);
    this.closeWoModal = this.closeWoModal.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    // load event data
    this.setState({
      startDate: this.props.dateStr,
      resources: this.props.resources,
      events: this.props.events
    });
    this.handleSort("needed date", true);
  }
  
  componentDidUpdate() {
    if (this.state.startDate !== this.props.dateStr) {
      this.setState({ startDate: this.props.dateStr });
    }
    if (this.state.events !== this.props.events) {
      this.setState({ events: this.props.events });
    }
    if (this.state.resources !== this.props.resources) {
      this.setState({ resources: this.props.resources });
    }

    if (this.state.unscheduledWorkOrders !== this.props.unscheduledWorkOrders) {

      // this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders });
      
      // sort by needed date in ascending order
      if (this.props.sortBy === "needed date" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) > new Date(b.needed_date)) ? 1 : -1) });
        // sort by needed date in descending order
      } else if (this.props.sortBy === "needed date" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) < new Date(b.needed_date)) ? 1 : -1) });
      }

      // sort by team duration in ascending order
      if (this.props.sortBy === "team duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team > b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      // sort by team duration in descending order
      } else if (this.props.sortBy === "team duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team < b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      }

      // sort by solo duration in ascending order
      if (this.props.sortBy === "solo duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo > b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      // sort by solo duration in descending order
      } else if (this.props.sortBy === "solo duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo < b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      }

    }

    if (this.props.sortBy !== this.state.sortByy || this.props.sortAsc !== this.state.sortAscc) {
      
      this.setState({ sortByy: this.props.sortBy, sortAscc: this.props.sortAsc });
      
      // sort by needed date in ascending order
      if (this.props.sortBy === "needed date" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) > new Date(b.needed_date)) ? 1 : -1) });
        // sort by needed date in descending order
      } else if (this.props.sortBy === "needed date" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) < new Date(b.needed_date)) ? 1 : -1) });
      }

      // sort by location in ascending order
      if (this.props.sortBy === "location" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() > b.wash_location_id.trim()) ? 1 : -1) });
        // sort by location in descending order
      } else if (this.props.sortBy === "location" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() < b.wash_location_id.trim()) ? 1 : -1) });
      }

      // sort by team duration in ascending order
      if (this.props.sortBy === "team duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team > b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      // sort by team duration in descending order
      } else if (this.props.sortBy === "team duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team < b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
      }

      // sort by solo duration in ascending order
      if (this.props.sortBy === "solo duration" && this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo > b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      // sort by solo duration in descending order
      } else if (this.props.sortBy === "solo duration" && !this.props.sortAsc) {
        this.setState({ unscheduledWorkOrders: this.props.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo < b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
      }

    }
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

  handleLocationSelect(e) {
        
    const val = e.target.value;

    if (val === "") {
      // this.setState({ selectedLocation: "", filterLocation: "" });
      // this.setState({ filterLocation: "" });
      this.props.resetResources();
    } else {
      // this.setState({ selectedLocation: val, filterLocation: val });
      // this.setState({ filterLocation: val });
      this.props.changeResources(val);
    }
  }

  closeModal() {
    // this.setState({ modalOpen: false, inpId: null, inpDuration: null });
    this.setState({ modalOpen: false });
    this.props.loadWorkOrders();
  }
  
  closeModalAndAdd() {
    this.setState({ modalOpen: false });
    this.props.test(
      this.state.dataId,
      this.state.dataResource,
      this.state.dataStartVal,
      this.state.dataEndVal
    );
  }

  handleCellDurationChange(e) {
    this.setState({ cellDuration: parseInt(e.target.value) });
  }

  handleSort(sortBy, asc) {

    // sort by needed date in ascending order
    if (sortBy === "needed date" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) > new Date(b.needed_date)) ? 1 : -1) });
    // sort by needed date in descending order
    } else if (sortBy === "needed date" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (new Date(a.needed_date) < new Date(b.needed_date)) ? 1 : -1) });
    }

    // // sort by location in ascending order
    if (sortBy === "location" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() > b.wash_location_id.trim()) ? 1 : -1) });
      // sort by location in descending order
    } else if (sortBy === "location" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.wash_location_id.trim() < b.wash_location_id.trim()) ? 1 : -1) });
    }

    // sort by needed date in ascending order
    if (sortBy === "team duration" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team > b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
    // sort by needed date in descending order
    } else if (sortBy === "team duration" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_team + a.ext_duration_mins_team < b.int_duration_mins_team + b.ext_duration_mins_team) ? 1 : -1) });
    }

    // sort by needed date in ascending order
    if (sortBy === "solo duration" && asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo > b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
    // sort by needed date in descending order
    } else if (sortBy === "solo duration" && !asc) {
      this.setState({ unscheduledWorkOrders: this.state.unscheduledWorkOrders.sort((a, b) => (a.int_duration_mins_solo + a.ext_duration_mins_solo < b.int_duration_mins_solo + b.ext_duration_mins_solo) ? 1 : -1) });
    }
  }

  handleSortChange(e) {
    this.props.handleSortChange(e.target.value);
  }

  toggleAsc() {
    this.props.toggleAsc();
  }

  setFilterText(e){
    this.props.changeFilterText(e.target.value);
  }

  setEditOpen() {
    this.setState({ editOpen: !this.state.editOpen });
  }

  changeLocationFilter(e) {
    this.props.changeLocationFilter(e.target.value);
  }
  
  changeWashIdFilter(e) {
    this.props.changeWashIdFilter(e.target.value);
  }
  
  changeTrailerIdFilter(e) {
    this.props.changeTrailerIdFilter(e.target.value);
  }
  
  changeIntWashTypeFilter(e) {
    this.props.changeIntWashTypeFilter(e.target.value);
  }

  openWoModal(wash_id, scheduled) {
    if (scheduled) {
      this.setState({
        modalOpenn: true,
        currentWoDetails: this.state.events.filter(wo => wo.wash_id === wash_id)[0]
      });
    } else {
      this.setState({
        modalOpenn: true,
        currentWoDetails: this.state.unscheduledWorkOrders.filter(wo => wo.wash_id === wash_id)[0]
      });
    }
  }

  closeWoModal() {
    this.setState({ modalOpenn: false });
  }

  render() {
    var {...config} = this.state;

    return (
      <div>
        <div className="col-sm-3 px-0 wo-md">
          <div className="work-orders-header">
            <div className="work-orders-header-top">
              <i className="fas fa-bars bars-menu" onClick={this.setEditOpen}/>
              <h6 style={{margin: "11.4px 0"}} className="text-center text-dark">Work Orders</h6>
              <i className="fas fa-bars bars-hidden"/>
            </div>
            {this.state.editOpen &&
              <div>
                <div className="wo-filter-container">
                  <input onChange={this.setFilterText} value={this.props.filterText} className="wo-filter" type="text" placeholder="filter by trailer #"/>
                </div>
                <div className="sort-container">
                  <p className="sort-by-text">Sort by: </p>
                  <select onChange={this.handleSortChange} className="sort-menu">
                    <option className="sort-menu" value="needed date">Needed date</option>
                    <option className="sort-menu" value="location">Location</option>
                    <option className="sort-menu" value="team duration">Team duration</option>
                    <option className="sort-menu" value="solo duration">Solo duration</option>
                  </select>
                  {
                    this.state.sortAsc ?
                    <i className="fas fa-sort-up sort-asc" onClick={this.toggleAsc}/>
                    :
                    <i className="fas fa-sort-down sort-desc" onClick={this.toggleAsc}/>
                  }
                </div>
              </div>
            }
          </div>
          <div className="work-orders-container">
          </div>
        </div>
        {/* <div className="col-sm-9 px-0"> */}
        <div className="col-12 px-0">
          {/* <div className="scheduler-view-interval-cont text-dark my-2 text-right pr-2"> */}
          <div className="d-flex justify-content-between text-dark my-2 px-2">
            <div className="d-flex">
              <div className="white-key"></div>&nbsp;<p className="key-text mr-3">- team shift</p>
              <div className="grey-key"></div>&nbsp;<p className="key-text">- solo shift</p>
            </div>
            <div className="location-dropdown">
              View:&nbsp;
              {/* <select onChange={this.handleLocationSelect} value={this.state.selectedLocation}> */}
              <select onChange={this.handleLocationSelect} value={this.props.selectedLocation}>
                {/* <option value="All locations">All locations</option> */}
                <option value="">All locations</option>
                {this.props.terminals.map(loc => (
                  <option
                    key={loc.location_id}
                    id={`${loc.city}, ${loc.state} - ${loc.location_id}`} className="location-dropdown-text"
                    value={loc.location_id}>{loc.city}, {loc.state} - {loc.location_id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="scale-text">Scale:</span>&nbsp;
              <button
                value={60}
                onClick={this.handleCellDurationChange}
                className={this.state.cellDuration === 60 ? "cd-btn-1 active-cd-btn" : "cd-btn-1"}>
                  {/* 60 min</button> */}
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
          </div>
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
                  <div className="alert alert-danger p-1 my-0 text-center">
                  Warning: This work order is scheduled to end beyond its needed by date
                  </div>
                  <div className="mt-3">
                    <button onClick={this.closeModal} className="btn cancel-add-btn mr-1">Cancel</button>
                    <button onClick={this.closeModalAndAdd} className="btn submit-btn ml-1">Add to scheduler</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal isOpen={this.state.modalOpenn}>
            <WorkOrderDetails
              className="wo-modal"
              wo={this.state.currentWoDetails}
              workOrderLogs={this.props.workOrderLogs}
              getLogsOfOrder={this.props.getLogsOfOrder}
              clearOrderLogs={this.props.clearOrderLogs}
              closeWoModal={this.closeWoModal}
            />
          </Modal>
          <DayPilotScheduler
            {...config}
            
            ref={component => {
              this.calendar = component && component.control;
            }}
          />
        </div>
        <div style={{display: this.props.alertDisplay}} className="alert alert-danger my-0 rounded-0 text-center">
          {this.props.errorText}
        </div>
        {/* <div className="col-sm-3 px-0 wo-sm"> */}
        <div className="col-12 px-0 wo-sm">
          <div className="work-orders-header">
            <div className="work-orders-header-top">
              {/* <h6 style={{margin: "11.4px 0"}} className="text-center text-dark">Work Orders</h6> */}
              <h6 className="text-center text-dark">Work Orders</h6>
            </div>
            {this.state.editOpen &&
              <div>
                <div className="wo-filter-container">
                </div>
              </div>
            }
            <div id="wash-types-container">
              <div id="wt-table">
                <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="unscheduled-order-th">Location</th>
                    {/* <th className="unscheduled-order-th">Order ID</th> */}
                    <th className="unscheduled-order-th">Wash ID</th>
                    <th className="text-center unscheduled-order-th">Trailer</th>
                    <th className="text-center unscheduled-order-th">Int Wash Type</th>
                    <th className="text-center unscheduled-order-th">Team Duration</th>
                    <th className="text-center unscheduled-order-th">Solo Duration</th>
                    <th className="text-center unscheduled-order-th">Needed By</th>
                    <th className="unscheduled-order-th"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <input
                        type="radio"
                        name="sort"
                        value="team duration"
                        checked={this.props.sortBy === "team duration"}
                        onChange={this.handleSortChange}
                        />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="sort"
                        value="solo duration"
                        checked={this.props.sortBy === "solo duration"}
                        onChange={this.handleSortChange}
                        />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name="sort"
                        value="needed date"
                        checked={this.props.sortBy === "needed date"}
                        onChange={this.handleSortChange}
                      />
                    </td>
                    <td>
                      {
                        this.props.sortAsc
                        ?
                        <i className="fas fa-sort-up sort-asc" onClick={this.toggleAsc}/>
                        :
                        <i className="fas fa-sort-down sort-asc" onClick={this.toggleAsc}/>
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.props.filterLocation}
                        onChange={this.changeLocationFilter}
                      />
                    </td>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.props.filterWashId}
                        onChange={this.changeWashIdFilter}
                      />
                    </td>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.props.filterTrailerId}
                        onChange={this.changeTrailerIdFilter}
                      />
                    </td>
                    <td>
                      <input
                        className="unscheduled-order-filter"
                        type="text"
                        placeholder="Filter"
                        value={this.props.filterIntWashType}
                        onChange={this.changeIntWashTypeFilter}
                      />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {this.state.unscheduledWorkOrders.length > 0 && this.state.unscheduledWorkOrders.filter(
                    wo =>
                    wo.wash_location_id.includes(this.props.filterLocation.toUpperCase()) &&
                    wo.wash_id.toString().includes(this.props.filterWashId) &&
                    wo.trailer_id.includes(this.props.filterTrailerId) &&
                    (wo.int_wash_code === null || wo.int_wash_code.includes(this.props.filterIntWashType.toUpperCase()))
                  ).map(wo => (
                    <DraggableTOrder
                      key={wo.wash_id}
                      openWoModal={this.openWoModal}
                      wo={wo}
                      id={wo.wash_id}
                      // name={`Order ${wo.order_id.trim()}`}
                      name={`Wash ID: ${wo.wash_id}`}
                      selectedLocation={this.props.selectedLocation}
                      // cityState={wo.wash_location_id}
                      text={wo.text}
                      duration={(wo.int_duration_mins_team + wo.ext_duration_mins_team) * 60}
                      teamDuration={1}
                      soloDuration={2}
                    />
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;
